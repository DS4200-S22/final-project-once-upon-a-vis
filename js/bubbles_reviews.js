// set the dimensions and margins of the graph
const width_b = 1000;
const height_b = 750;

// append the svg object to the body of the page
const svg_b = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width_b)
  .attr("height", height_b);


d3.csv('https://raw.githubusercontent.com/DS4200-S22/final-project-once-upon-a-vis/main/Data/top100_ratings.csv').then((data) => {

  // get the number of stared ratins for each book
  const stars = data.map(function (d) {
    return {
      book: d.Goodreads_ID.replace(/_/g, " ")
        .replace(/-/g, " ")
        .replace(/1/g, "")
        .replace(/2/g, "")
        .replace(/3/g, "")
        .replace(/4/g, "")
        .replace(/5/g, "")
        .replace(/6/g, "")
        .replace(/7/g, "")
        .replace(/8/g, "")
        .replace(/9/g, "")
        .replace(/0/g, ""),
      five_stars: d.five_stars,
      four_stars: d.four_stars,
      three_stars: d.three_stars,
      two_stars: d.two_stars,
      one_star: d.one_star
    };
  });

  // Create a dropdown to view different bubble graphs
  //    filterd by the number star reviews
  d3.select("#my_dataviz_dropdown")
    .append("select")
    .attr("class", "selection")
    .on('change', function () {
      let p = d3.select('#my_dataviz_dropdown').select(".selection").node().value;
      changeStars(p);
    })
    .selectAll("option")
    .data(["Five Stars", "Four Stars", "Three Stars", "Two Stars", "One Star"])
    .enter()
    .append("option")
    .attr("value", function (d) { return d; })
    .text(function (d) { return d; });

  // create scale for the bubble chart
  const size = d3.scaleLinear()
    .domain([0, 1400000])
    .range([30, 100]);


  // create a tooltip
  let Tooltip = d3.select("#my_dataviz")
    .append("div")
    .style("opacity", 0)
    .attr("class", "reviews-tooltip")
    .style("background-color", "light blue")
    .style("padding", "5px")
    .attr("id", "reviews-tooltip");

  // Three function that change the tooltip when user hover / move / leave a cell
  let mouseover = function (event, d) {
    Tooltip
      .style("opacity", 1);
  };
  let mousemove1 = function (event, d) {

    Tooltip
      .html('<u>' + d.book + '</u>' + "<br>" + d.one_star + " reviews")
      .style("left", (event.x) + "px")
      .style("top", (event.y) + "px");
  };
  let mousemove2 = function (event, d) {
    Tooltip
      .html('<u>' + d.book + '</u>' + "<br>" + d.two_stars + " reviews")
      .style("left", (event.x) + "px")
      .style("top", (event.y) + "px");
  };
  let mousemove3 = function (event, d) {
    Tooltip
      .html('<u>' + d.book + '</u>' + "<br>" + d.three_stars + " reviews")
      .style("left", (event.x) + "px")
      .style("top", (event.y) + "px");
  };
  let mousemove5 = function (event, d) {
    Tooltip
      .html('<u>' + d.book + '</u>' + "<br>" + d.five_stars + " reviews")
      .style("left", (event.x) + "px")
      .style("top", (event.y) + "px");
  };
  let mouseleave = function (event, d) {
    Tooltip
      .style("opacity", 0);
  };


  //Initialize the circle: all located at the center of the svg area
  const node = svg_b.append("g")
    .selectAll("circle")
    .data(stars)
    .join("circle")
    .attr("r", d => size(d.five_stars)) //this is where we change 
    .attr("cx", width_b / 2)
    .attr("cy", height_b / 2)
    .style("fill", "green") //write dict for colors 
    .style("fill-opacity", 0.7)
    .attr("stroke", "black")
    .style("stroke-width", 2)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove5)
    .on("mouseleave", mouseleave)
    .call(d3.drag() // call specific function when circle is dragged
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  // Features of the forces applied to the nodes:
  const simulation = d3.forceSimulation()
    .force("center", d3.forceCenter().x(width_b / 2).y(height_b / 2)) // Attraction to the center of the svg area
    .force("charge", d3.forceManyBody().strength(0.1)) // Nodes are attracted one each other of value is > 0
    .force("collide", d3.forceCollide().strength(0.2).radius(30).iterations(1)) // Force that avoids circle overlapping
    // Apply these forces to the nodes and update their positions.
    // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
    // simulation
    .nodes(stars)
    .on("tick", function (d) {
      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    });


  // What happens when a circle is dragged?
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0.03);
    d.fx = null;
    d.fy = null;
  }

  // function for changing the bubbles based off of dropdown selection
  function changeStars(p) {
    if (p == 'One Star') {
      node.attr('r', d => size(d.one_star))
        .style('fill', 'red')
        .on("mousemove", mousemove1);
    }

    if (p == 'Two Stars') {
      node.attr('r', d => size(d.two_stars))
        .style('fill', 'brown')
        .on('mousemove', mousemove2);
    }

    if (p == 'Three Stars') {
      node.attr('r', d => size(d.three_stars))
        .style('fill', 'orange')
        .on('mousemove', mousemove3);
    }

    if (p == 'Four Stars') {
      node.attr('r', d => size(d.four_stars))
        .style('fill', 'gold');
    }

    if (p == 'Five Stars') {
      node.attr('r', d => size(d.five_stars))
        .style('fill', 'green');
    }

  }






});

