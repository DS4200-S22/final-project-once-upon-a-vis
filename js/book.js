
const svg1 = d3.select("#book_cover").append("svg").attr("width", 800).attr("height", 600)

// Add the path using this helper function
svg1.append('rect')
  .attr('x', 80)
  .attr('y', 120)
  .attr('width', 400)
  .attr('height', 600)
  .attr('stroke', 'black')
  .attr('stroke-width', '2px')
  .attr('fill', '#69a3b2');



// Add the path using this helper function
svg1.append('rect')
  .attr('x', 40)
  .attr('y', 160)
  .attr('width', 40)
  .attr('height', 400)
  .attr('stroke', 'black')
  .attr('fill', 'black');


// Add the path using this helper function
svg1.append('rect')
  .attr('x', 40)
  .attr('y', 120)
  .attr('width', 40)
  .attr('height', 40)
  .attr('stroke', 'black')
  .attr('fill', 'black');

svg1.append('text')
  .attr('x', 100)
  .attr('y', 220)
  .attr('stroke', 'black')
  .style("font-size", 24)
  .text("Welcome to Our Visualization:")

svg1.append('text')
  .attr('x', 150)
  .attr('y', 270)
  .attr('stroke', 'black')
  .style("font-size", 24)
  .text("Once Upon A Vis!")

svg1.append('text')
  .attr('x', 120)
  .attr('y', 450)
  .attr('stroke', 'black')
  .style("font-size", 24)
  .text("By Abby Carr, Anika Das")

  svg1.append('text')
  .attr('x', 120)
  .attr('y', 474)
  .attr('stroke', 'black')
  .style("font-size", 24)
  .text("Riya Gurnani, Veronica Aguiar")

  var tri2 =  d3.symbol().type(d3.symbolDiamond).size(1800);
    svg1.append("path")
         .attr("d", tri2)
         .attr("fill", "black")
         .attr("stroke-width", "2px")
         .attr("transform", "translate(60, 570) rotate(150)"); 



//////////OPEN BOOK 


const svg2 = d3.select("#book_open").append("svg").attr("width", 800).attr("height", 600)

// Add the path using this helper function
svg2.append('rect')
  .attr('x', 350)
  .attr('y', 10)
  .attr('width', 350)
  .attr('height', 500)
  .attr('stroke', 'black')
  .attr('stroke-width', '3px')
  .attr('fill', 'white');


// Add the path using this helper function
svg2.append('rect')
  .attr('x', 0)
  .attr('y', 10)
  .attr('width', 350)
  .attr('height', 500)
  .attr('stroke', 'black')
  .attr('stroke-width', '3px')
  .attr('fill', 'white');


const svg23 = d3.select("#book_open").append("svg").attr("width", 40).attr("height", 60)


svg2.append('text')
  .attr('x', 40)
  .attr('y', 40)
  .attr('stroke', 'black')
  .style("font-size", 30)
  .text("Abstract")

svg2.append('text')
  .attr('x', 10)
  .attr('y', 80)
  .attr('stroke', 'black')
  .style("font-size", 14)
  .html('As more of our time is spent in the digital world, streaming services and social networking apps have')



  svg2.append('text')
  .attr('x', 10)
  .attr('y', 108)
  .attr('stroke', 'black')
  .style("font-size", 14)
  .text('almost entirely replaced books. Despite the availability of e-readers such as Kindles, reading has become')



  svg2.append('text')
  .attr('x', 10)
  .attr('y', 122)
  .attr('stroke', 'black')
  .style("font-size", 14)
  .text('less and less common. One way this shift can be reversed is by giving people resources to find new books')


  svg2.append('text')
  .attr('x', 10)
  .attr('y', 140)
  .attr('stroke', 'black')
  .style("font-size", 14)
  .text('The general area of interest for our project is the ratings and rankings of books, and how they compare')

  svg2.append('text')
  .attr('x', 10)
  .attr('y', 170)
  .attr('stroke', 'black')
  .style("font-size", 14)
  .text('to one another. We intend to address the comparison of popular books and allow book readers to get a')


  svg2.append('text')
  .attr('x', 10)
  .attr('y', 200)
  .attr('stroke', 'black')
  .style("font-size", 14)
  .text('sense of similarities and differences between books.This will potentially give them new books to read') 


   svg2.append('text')
  .attr('x', 10)
  .attr('y', 230)
  .attr('stroke', 'black')
  .style("font-size", 14)
  .text('based on ones they have enjoyed in the past. We believe this visualization will address an important')


  svg2.append('text')
  .attr('x', 10)
  .attr('y', 260)
  .attr('stroke', 'black')
  .style("font-size", 14)
  .text("topic as reading improves one's focus, memory, empathy, and communication skills.")
