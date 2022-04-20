const parseTime = d3.timeParse("%m/%d/%y");
const formatYear = d3.timeFormat("%Y");
d3.csv('https://raw.githubusercontent.com/DS4200-S22/final-project-once-upon-a-vis/main/Data/genres_with_counts.csv').then((counts) => {
  d3.csv('https://raw.githubusercontent.com/DS4200-S22/final-project-once-upon-a-vis/main/Data/top100_genres.csv').then((genres) => {
    d3.csv('https://raw.githubusercontent.com/DS4200-S22/final-project-once-upon-a-vis/main/Data/top100_goodreads_cleaned.csv').then((cleaned_100) => {

      // ------------- preload the cleaned_data for use --------------------

      // Get data for the points on the graph
      const date_and_value = cleaned_100.map(function (d) {
        return {
          id: d.Goodreads_ID,
          name: d.Title,
          date: formatYear(parseTime(d.Publ_Date)),
          value: parseFloat(d.Value.split("$")[1].replace(/,/g, "")),
          visual_val: d.Value
        };
      });

      // Compile data for the line on the graph
      let year_and_total = {};
      function total() {
        date_and_value.forEach(element => {
          if (element.date in year_and_total) {
            year_and_total[element.date] += element.value;
          }
          else {
            year_and_total[element.date] = element.value;
          }
        });
      }
      total();

      // constant size of chart
      const margin = { top: 10, right: 30, bottom: 40, left: 100 },
        width = 800 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom;

      // max vals for X axis
      const maxDate = d3.max(date_and_value, function (d) { return d.date; });
      const minDate = d3.min(date_and_value, function (d) { return d.date; });

      // ----- Create the line graph structure -------

      // Create Line Graph svg
      const svg = d3.select("#line_graph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append('g')
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

      // Add X axis --> it is a date format
      const x = d3.scaleLinear()
        .domain([minDate, maxDate])
        .range([0, width]);
      svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

      // Add Y axis
      const y = d3.scaleLinear()
        .domain([0, d3.max(Object.entries(year_and_total), function (d) { return d[1]; })])
        .range([height, 0]);
      svg.append("g")
        .call(d3.axisLeft(y));

      // Add the line from given data
      svg.append("path")
        .datum(Object.entries(year_and_total))
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 3)
        .attr("d", d3.line()
          .curve(d3.curveBasis)
          .x(function (d) { return x(d[0]); })
          .y(function (d) { return y(d[1]); })
        );


      // -------- create Tooltip for the Hover effect on the line graph --------

      // create a tooltip
      const Tooltip = d3.select("#line_graph")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("padding", "5px");

      // Three function that change the tooltip when user hover / move / leave a cell
      const mouseover = function (event, d) {
        Tooltip
          .style("opacity", 1);
      };
      const mousemove = function (event, d) {
        Tooltip
          .html("Book: " + d.name + "<br> Total Sales: " + d.visual_val)
          .style("left", event.x + "px")
          .style("top", event.y + "px");
      };
      const mouseleave = function (event, d) {
        Tooltip
          .style("opacity", 0);
      };

      // ---------- genre bubbles ----------- (transfered for linking)

      // set the dimensions and margins of the graph
      const w = 750;
      const h = 750;


      // append the svg object to the body of the page
      const genre_svg = d3.select(".genre-bubbles")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      // Size scale for cošntries
      const size = d3.scaleLinear()
        .domain([0, 100])
        .range([7, 200]);  // circle will be between 7 and 55 px wide

      // NEW CODE creates tooltip
      const genre_tooltip = d3.select(".genre-bubbles")
        .append("div")
        .attr("id", "bubbles-tooltip")
        .style("opacity", 0)
        .attr("class", "bubbles-tooltip");

      // The three hover functions
      const genre_mouseover = function (event, d) {
        genre_tooltip.html("Genre: " + d.Genre + "<br> Count: " +
          d.Count + "<br>")
          .style("opacity", 1);
      };

      const genre_mousemove = function (event, d) {
        genre_tooltip.style("left", (event.x) + "px")
          .style("top", (event.y) + "px");
      };

      const genre_mouseleave = function (event, d) {
        genre_tooltip.style("opacity", 0);
      };


      // ----------- Brushing and Linking ------------

      // make brush
      let brush = d3.brush()
        .extent([[0, 0], [width, height]])
        .on("start", clear)
        .on("brush", updateGenres);

      // Add brush1 to svg1
      svg.call(brush);

      // clear function
      function clear() {
        svg.call(d3.brush().clear);
      }

      // helper from HW5
      // Finds dots within the brushed region
      function isBrushed(brush_coords, cx, cy) {
        if (brush_coords === null) return;

        let x0 = brush_coords[0][0],
          x1 = brush_coords[1][0],
          y0 = brush_coords[0][1],
          y1 = brush_coords[1][1];
        return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1; // This return TRUE or FALSE depending on if the points is in the selected area
      }

      // helper: get a list of genres from the list of Goodreads_IDs
      function list_genres(IDs) {
        let list_genre = [];
        genres.map(function (d) {
          if (IDs.indexOf(d.Goodreads_ID) === -1) {
          } else {
            for (const [key, value] of Object.entries(d)) {
              if (value == "True" && !list_genre.includes(key)) {
                list_genre.push(key);
              }
            }
          }
        });
        return list_genre;
      }

      // Process of lining the highleted points -> their ID -> Genres for that ID
      function updateGenres(brushEvent) {
        let extent = brushEvent.selection;
        let IDs = [];
        points.classed("brushed", (d) => {
          let yes = isBrushed(extent, x(d.date), y(d.value));
          item = d.id;
          // collect IDs of brushed Books
          if (yes && !IDs.includes(item)) {
            IDs.push(item);
          }
          return yes;
        });
        let lg = list_genres(IDs);
        bubbles.classed("brushed", (d) => {
          let o = d.Genre;
          let q = (lg.indexOf(o) === -1);
          if (!q) {
            return true;
          }
        });
      }

      // --------- Create bubble chart staticallly based on data --------

      // Initialize the circle: all located at the center of the svg area
      let bubbles = genre_svg
        .append("g")
        .selectAll("circle")
        .data(counts)
        .join("circle")
        .attr("class", "node")
        .attr("r", d => size(d.Count))
        .attr("cx", w / 2)
        .attr("cy", h / 2)
        .attr("fill", "purple")
        .attr("fill-opacity", 0.5)
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .on("mouseover", genre_mouseover)
        .on("mousemove", genre_mousemove)
        .on("mouseleave", genre_mouseleave);


      // Features of the forces applied to the nodes:
      const simulation = d3.forceSimulation()
        .force("center", d3.forceCenter().x(w / 2).y(h / 2)) // Attraction to the center of the svg area
        .force("charge", d3.forceManyBody().strength(0.1)) // Nodes are attracted one each other of value is > 0
        .force("collide", d3.forceCollide().strength(0.2).radius(function (d) { return (size(d.Count) + 3); }).iterations(1)); // Force that avoids circle overlapping

      // Apply these forces to the nodes and update their positions.
      // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
      simulation
        .nodes(counts)
        .on("tick", function (d) {
          bubbles
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
        });

      // --------- Create line graph statically based on data -------

      // Add the points
      let points = svg
        .append("g")
        .selectAll("dot")
        .data(date_and_value)
        .join("circle")
        .attr("class", "myCircle")
        .attr("cx", d => x(d.date))
        .attr("cy", d => y(d.value))
        .attr("r", 3)
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 2)
        .attr("fill", "white")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);


      // text label for the x axis
      svg.append("text")
        .attr("transform",
          "translate(" + (width / 2) + " ," +
          (height + margin.top + 25) + ")")
        .style("text-anchor", "middle")
        .text("Year");

      // Add the y Axis
      svg.append("g")
        .call(d3.axisLeft(y));

      // text label for the y axis
      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Total Sales ($)");
    });
  });
});





