// set index of the book we're currently seeing in the chart
let current_index = 0;
// data for the bar chart
let bar_data;
// the graph standards
let rating_bars;
let ratings_y;
let ratings_x;

// Set margins and dimensions 
const margin = { top: 50, right: 50, bottom: 100, left: 200 };
const width = 1200;
const height = 800;

// make svg for the bar chart
const bar_svg = d3.select("#ratings")
  .append("svg")
  .attr("class", "holder")
  .attr("width", width - margin.left - margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);



d3.csv('https://raw.githubusercontent.com/DS4200-S22/final-project-once-upon-a-vis/main/Data/top100_goodreads_cleaned.csv').then((goodreads) => {
  d3.csv('https://raw.githubusercontent.com/DS4200-S22/final-project-once-upon-a-vis/main/Data/top100_ratings.csv').then((rates) => {

    // -------------------------< make a dropdown >--------------------------
    // dropdown creation
    d3.select("#book_dropdown")
      .append("select")
      .attr("class", "selection")
      .on('change', function () {
        let p = d3.select('#book_dropdown').select(".selection").node().value;
        update_global_index(p);
        book_selection();
      })
      .selectAll("option")
      .data(goodreads)
      .enter()
      .append("option")
      .sort((a, b) => d3.ascending(a.Title, b.Title)) // Alphabetical Sort
      .attr("value", function (d) { return d.Title; })
      .text(function (d) { return d.Title; });


    // -----------------< build original ratings bar graph >-----------------
    // Create X scale
    ratings_x = d3.scaleBand() // uses scaleBand rather than linearly scaling data
      .domain(d3.range(5))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    // Create labels
    let stars = ["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"];

    // Create a stand-in y-scale
    ratings_y = d3.scaleLinear()
      .domain([0, 50000]) // dummy max of 50,000
      .range([height - margin.bottom, margin.top]);

    // add x axis to svg 
    bar_svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(ratings_x) // gives the x axis scale
        .tickFormat(i => stars[i]))  // use .tickformat to add specific labels to each tick mark
      .attr("font-size", '20px');

    // add y axis to svg
    const y_axis = bar_svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(ratings_y));

    // new bars
    let new_bars = rates[0];
    const values = Object.keys(new_bars).map(function (key) {
      return new_bars[key];
    });
    bar_data = values.slice(1, values.length);

    // add the 5 dummy bars to the graph (a solid blue-gray color!)
    rating_bars = bar_svg.selectAll()
      .data(bar_data)
      .enter()
      .append('rect')
      .attr('x', (actual, index, array) => ratings_x(index))
      .attr('y', (actual, index, array) => ratings_y(actual))
      .attr('height', (actual, index, array) => height - margin.bottom - ratings_y(actual))
      .attr('width', ratings_x.bandwidth());


    // -----------< helper functions to dynamically change graph >-----------

    // get book index by the Goodreads ID
    function get_book_ind(ID) {
      for (let i in rates) {
        if (rates[i].Goodreads_ID == ID) {
          return i;
        }
      }
    }

    // get book Goodreads ID by title
    function get_book_ID(title) {
      for (let i in goodreads) {
        if (goodreads[i].Title == title) {
          return goodreads[i].Goodreads_ID;
        }
      }
    }

    // update_index
    function update_global_index(val) {
      let title = val;
      let ID = get_book_ID(title);
      let ind = get_book_ind(ID);
      current_index = ind;
    }

    // update the y axis
    function update_y(max) {

      ratings_y.domain([0, max]);

      y_axis.transition()
        .duration(1000)
        .call(d3.axisLeft(ratings_y));
    }

    // update the bars!!
    function update_bars() {
      // new bars
      let new_bars = rates[current_index];
      let values = Object.keys(new_bars).map(function (key) {
        return new_bars[key];
      });
      bar_data = values.slice(1, values.length);

      rating_bars.data(bar_data);

      rating_bars.transition()
        .duration(1000)
        .attr('y', (actual, index, array) => ratings_y(actual))
        .attr('height', (actual, index, array) => height - margin.bottom - ratings_y(actual));
    }

    // update the entire graph
    function book_selection() {
      let a = rates[current_index].five_stars;
      let b = rates[current_index].four_stars;
      let c = rates[current_index].three_stars;
      let d = rates[current_index].two_stars;
      let e = rates[current_index].one_star;

      let max = Math.max(a, b, c, d, e);
      update_y(max);
      update_bars();
    }

    // text label for the x axis
    bar_svg.append("text")
      .attr("transform",
        "translate(" + (width / 2) + " ," +
        (height + margin.top + 25) + ")")
      .style("text-anchor", "middle")
      .text("User Star Rating");

    // text label for the y axis
    bar_svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Count of Ratings");

    book_selection();

  });
});
