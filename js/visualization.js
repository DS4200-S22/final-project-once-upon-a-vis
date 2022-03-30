// set the dimensions and margins of the graph
const w = 500
const h = 500

//title



// append the svg object to the body of the page
const svg = d3.select(".vis-holder")
  .append("svg")
    .attr("width", w)
    .attr("height", h)


    data = [
    {"Genre":"Fiction", "Count": 58},
    {"Genre":"Mystery", "Count": 16},
     {"Genre":"Thriller", "Count": 13},
     {"Genre":"Suspense", "Count": 11},
     {"Genre":"Historical", "Count": 21},
     {"Genre":"Novels", "Count": 31},
     {"Genre":"Fantasy", "Count": 23},
       ];


//Read data
//d3.csv("js/genres_with_counts.csv").then( function(data) {

  // Size scale for countries
  const size = d3.scaleLinear()
    .domain([0, 100])
    .range([7,200])  // circle will be between 7 and 55 px wide


    // Initialize the circle: all located at the center of the svg area
  var node = svg.append("g")
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr("class", "node")
      .attr("r", d => size(d.Count))
      .attr("cx", w/2)
      .attr("cy", h/2)
      .style("fill", "purple")
      .style("fill-opacity", 0.8)
      .attr("stroke", "black")
      .style("stroke-width", 1)

 // Features of the forces applied to the nodes:
  const simulation = d3.forceSimulation()
      .force("center", d3.forceCenter().x(w / 2).y(h / 2)) // Attraction to the center of the svg area
      .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
      .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (size(d.Count)+3) }).iterations(1)) // Force that avoids circle overlapping

  // Apply these forces to the nodes and update their positions.
  // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
  simulation
      .nodes(data)
      .on("tick", function(d){
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
      });
  

node.append("text")
            .attr("dy", ".2em")
            .text(function(d){ 
              d.Genre
            })
            .attr("font-size", (d) => {
                return d.r/3;
            })
            .attr("fill", "black");
          


