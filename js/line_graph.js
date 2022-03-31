const formatYear = d3.timeParse("%d/%m/%Y");



d3.csv('/Users/Vero/Documents/final-project-once-upon-a-vis/Data/top100_goodreads_cleaned_csv').then((data) => {

    console.log(data);



var date_and_value = data.map(function(d) {
  return {
  	name: d.Title,
  	date: formatYear(d.Publ_Date).getFullYear(),
    value: parseFloat(d.Value.replace('$', ''))
  }
});

console.log(date_and_value);



  	// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    var maxDate = d3.max(date_and_value,function(d){return d.date; });
    var minDate = d3.min(date_and_value,function(d){return d.date; });
    var maxValue = d3.max(date_and_value,function(d){return d.value; });
    console.log(maxDate);
    console.log(minDate);
    console.log(maxValue);


//   // append the svg object to the body of the page
const svg = d3.select("#line_graph")
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

var cont = d3.rollup(date_and_value, v => d3.sum(v, d => d.value), d => d.date)
console.log(cont)

console.log(cont.value);





        // Add the line
    svg.append("path")
      .datum(date_and_value)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) {return x(d.date)})
        .y(function(d) { return y(d.value) })
        )
});





