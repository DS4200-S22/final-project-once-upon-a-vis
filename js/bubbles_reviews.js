// set the dimensions and margins of the graph
const width_b = 600
const height_b = 600


const symbolGenerator = d3.symbol()
  .type(d3.symbolStar)
  .size(80);

  const stars_shape = symbolGenerator();


// append the svg object to the body of the page
const svg_b = d3.select("#my_dataviz")
                .append("svg")
                .attr('d', stars_shape)
                .attr("width", 450)
                .attr("height", 450)

// create dummy data -> just one element per circle
const data = d3.csv('https://raw.githubusercontent.com/DS4200-S22/final-project-once-upon-a-vis/main/Data/top100_ratings.csv').then((data) => {

  const stars = data.map(function(d) {
    return {
      book: d.Goodreads_ID,
      five_stars: d.five_stars,
      four_stars: d.four_stars,
      three_stars: d.three_stars,
      two_stars: d.two_stars,
      one_star: d.one_star

    }
  });

  stars_five = stars.filter(function(d){ return d.five_stars>100000})
  //find 4,3,2,1 data

  const size = d3.scaleLinear()
        .domain([0, 14000000])
        .range([7,55]) 




         // create a tooltip
  const Tooltip = d3.select("#my_dataviz")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    // .style("border", "dashed")
    // .style("border-width", "0px")
    // .style("border-radius", "0px")
    .style("padding", "5px")

// Three function that change the tooltip when user hover / move / leave a cell
const mouseover = function(event, d) {
  Tooltip
    .style("opacity", 1)
  console.log("hello! I am working")
}
const mousemove = function(event, d) {
  Tooltip
    .html('<u>' + d.book + '</u>' + "<br>" + d.five_stars + " reviews")
    .style("left", (event.x/2+20) + "px")
    .style("top", (event.y/2-30) + "px")
}
var mouseleave = function(event, d) {
  Tooltip
    .style("opacity", 0)
}






// Features of the forces applied to the nodes:
const simulation = d3.forceSimulation()
    .force("center", d3.forceCenter().x(width_b / 2).y(height_b / 2)) // Attraction to the center of the svg area
    .force("charge", d3.forceManyBody().strength(0.5)) // Nodes are attracted one each other of value is > 0
    .force("collide", d3.forceCollide().strength(.01).radius(30).iterations(1)) // Force that avoids circle overlapping

// Apply these forces to the nodes and update their positions.
// Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
// simulation
    .nodes(stars_five)
    .on("tick", function(d){
      node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y)
        })


    // What happens when a circle is dragged?
function dragstarted(event, d) {
  if (!event.active) simulation.alphaTarget(.03).restart();
  d.fx = d.x;
  d.fy = d.y;
}
function dragged(event, d) {
  d.fx = event.x;
  d.fy = event.y;
}
function dragended(event, d) {
  if (!event.active) simulation.alphaTarget(.03);
  d.fx = null;
  d.fy = null;
}



//Initialize the circle: all located at the center of the svg area
  const node = svg_b.append("g")
    .selectAll("circle")
    .data(stars_five)
    .join("circle")
      .attr("r", d => size(d.five_stars))
      .attr("cx", width_b / 2)
      .attr("cy", height_b / 2)
      .style("fill", "green")
      .style("fill-opacity", 0.7)
      .attr("stroke", "black")
      .style("stroke-width", 2)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .call(d3.drag() // call specific function when circle is dragged
         .on("start", dragstarted)
         .on("drag", dragged)
         .on("end", dragended));

    
});

