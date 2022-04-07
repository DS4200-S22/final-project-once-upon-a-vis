
const svg1 = d3.select("#rect").append("svg").attr("width", 800).attr("height", 600)

// Add the path using this helper function
svg1.append('rect')
  .attr('x', 80)
  .attr('y', 120)
  .attr('width', 400)
  .attr('height', 600)
  .attr('stroke', 'black')
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

