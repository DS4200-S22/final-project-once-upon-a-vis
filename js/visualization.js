// set the dimensions and margins of the graph
const w = 750
const h = 750


// append the svg object to the body of the page
const svg = d3.select(".genre-bubbles")
  .append("svg")
    .attr("width", w)
    .attr("height", h)


//Read data
d3.csv("js/genres_with_counts.csv").then((data) => {

  // Size scale for cošntries
  const size = d3.scaleLinear()
    .domain([0, 100])
    .range([7,200])  // circle will be between 7 and 55 px wide

    // NEW CODE creates tooltip
        const tooltip = d3.select(".genre-bubbles")
                            .append("div")
                            .attr("id", "bubbles-tooltip")
                            .style("opacity", 0)
                            .attr("class", "bubbles-tooltip"); 

        const mouseover = function(event, d) {
            tooltip.html("Genre: " + d.Genre + "<br> Count: " + 
                d.Count + "<br>") 
          .style("opacity", 1);  
        }

        const mousemove = function(event, d) {
          tooltip.style("left", (event.x) +"px") 
          .style("top", (event.y)+"px"); 
        }

        const mouseleave = function(event, d) { 
           tooltip.style("opacity", 0); 
        }


    // Initialize the circle: all located at the center of the svg area
  const node = svg.append("g")
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
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)

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
              return d.Genre;
            })
            .attr("font-size", (d) => {
                return d.r/3;
            })
            .attr("fill", "black");
    });
          




