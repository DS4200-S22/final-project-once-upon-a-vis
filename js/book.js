
const svg1 = d3.select("#rect").append("svg").attr("width", 800).attr("height", 600)

// Add the path using this helper function
svg1.append('rect')
  .attr('x', 80)
  .attr('y', 120)
  .attr('width', 400)
  .attr('height', 600)
  .attr('stroke', 'black')
  .attr('stroke-width', '2px')
  .attr('fill', '#69a3b2');


const svg2 = d3.select("#rect").append("svg").attr("width", 800).attr("height", 600)

// Add the path using this helper function
svg1.append('rect')
  .attr('x', 40)
  .attr('y', 160)
  .attr('width', 40)
  .attr('height', 400)
  .attr('stroke', 'black')
  .attr('fill', 'black');


  var svg3 = d3.select("#rect").append("svg").attr("width", 800).attr("height", 600)

// Add the path using this helper function
svg1.append('rect')
  .attr('x', 40)
  .attr('y', 120)
  .attr('width', 40)
  .attr('height', 40)
  .attr('stroke', 'black')
  .attr('fill', 'black');

svg1.append('text')
  .attr('x', 120)
  .attr('y', 250)
  .attr('stroke', 'black')
  .style("font-size", 25)
  .text("Example Title")

svg1.append('text')
  .attr('x', 120)
  .attr('y', 450)
  .attr('stroke', 'black')
  .style("font-size", 25)
  .text("Example Author")

  var tri2 =  d3.symbol().type(d3.symbolDiamond).size(1800);
    svg1.append("path")
         .attr("d", tri2)
         .attr("fill", "black")
         .attr("stroke-width", "2px")
         .attr("transform", "translate(60, 570) rotate(150)");



