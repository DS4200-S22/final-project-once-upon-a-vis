const formatYear = d3.timeParse("%m/%d/%y");


d3.csv('https://raw.githubusercontent.com/DS4200-S22/final-project-once-upon-a-vis/main/Data/top100_goodreads_cleaned.csv').then((data) => {




 const date_and_value = data.map(function(d) {
  return {
  	name: d.Title,
  	date: formatYear(d.Publ_Date),
    value: parseFloat(d.Value.split("$")[1].replace(/,/g, ""))
  }
});





  	// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    const maxDate = d3.max(date_and_value,function(d){return d.date; });
    const minDate = d3.min(date_and_value,function(d){return d.date; });
    const maxValue = d3.max(date_and_value,function(d){return d.value; });
    console.log(maxDate);
    console.log(minDate);
    console.log(maxValue);


//   // append the svg object to the body of the page
let svg = d3.select("#line_graph")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append('g')
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis --> it is a date format
    const x = d3.scaleTime()
      .domain([minDate,maxDate])
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));
   

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, d3.max(date_and_value, function(d) { return d.value; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y))





        // Add the line
    svg.append("path")
      .datum(date_and_value)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
      	.curve(d3.curveBasis)
        .x(function(d) {return x(d.date)})
        .y(function(d) { return y(d.value) })
        )



    const yTooltipOffset = 1
    // create a tooltip
    const Tooltip = d3.select("#line_graph")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "dashed")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")

      // Three function that change the tooltip when user hover / move / leave a cell
      const mouseover = function(event,d) {
        Tooltip
          .style("opacity", 1)
      }
      const mousemove = function(event,d) {
        Tooltip
          .html("Book: " + d.name + "<br> Total Sales: " + d.value + " dollars ($)")
          .style("left", event.x + "px")
          .style("top", event.y + "px")
      }
      const mouseleave = function(event,d) {
        Tooltip
          .style("opacity", 0)
      }



    // Add the points
    svg
      .append("g")
      .selectAll("dot")
      .data(date_and_value)
      .join("circle")
        .attr("class", "myCircle")
        .attr("cx", d => x(d.date))
        .attr("cy", d => y(d.value))
        .attr("r", 3)
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 1)
        .attr("fill", "white")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)





});





