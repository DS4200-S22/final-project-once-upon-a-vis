
// Book Cover ------------------------------------------------------------------------------
const svg1 = d3.select("#book_cover").append("svg").attr("width", 520).attr("height", 600);

// ----- SVG Book -------
svg1.append('rect')
  .attr('x', 80)
  .attr('y', 20)
  .attr('width', 400)
  .attr('height', 478)
  .attr('stroke', 'black')
  .attr('stroke-width', '2px')
  .attr('fill', '#69a3b2');

svg1.append('rect')
  .attr('x', 40)
  .attr('y', 40)
  .attr('width', 40)
  .attr('height', 420)
  .attr('stroke', 'black')
  .attr('fill', 'black');

svg1.append('rect')
  .attr('x', 40)
  .attr('y', 20)
  .attr('width', 40)
  .attr('height', 40)
  .attr('stroke', 'black')
  .attr('fill', 'black');

let tri2 = d3.symbol().type(d3.symbolDiamond).size(1800);
svg1.append("path")
  .attr("d", tri2)
  .attr("fill", "black")
  .attr("stroke-width", "2px")
  .attr("transform", "translate(60, 465) rotate(150)");


// ----- Visualization Title -------
svg1.append('text')
  .attr('x', 110)
  .attr('y', 120)
  .attr('stroke', 'black')
  .style("font-size", 24)
  .text("Welcome to Our Visualization:");

svg1.append('text')
  .attr('x', 110)
  .attr('y', 200)
  .attr('class', 'heavy')
  .text("Once Upon");

svg1.append('text')
  .attr('x', 275)
  .attr('y', 240)
  .attr('class', 'small')
  .text("a");

svg1.append('text')
  .attr('x', 300)
  .attr('y', 260)
  .attr('class', 'Rrrrr')
  .text("Vis!");

// ----- Author Names -------
svg1.append('text')
  .attr('x', 120)
  .attr('y', 400)
  .attr('stroke', 'black')
  .style("font-size", 24)
  .text("By Abby Carr, Anika Das");

svg1.append('text')
  .attr('x', 150)
  .attr('y', 430)
  .attr('stroke', 'black')
  .style("font-size", 24)
  .text("Riya Gurnani, Veronica Aguiar");


// Open Book Page ------------------------------------------------------------------------------
const svg2 = d3.select("#book_open").append("svg").attr("width", 710).attr("height", 600);

// ----- SVG Open Pages -------
svg2.append('rect')
  .attr('x', 355)
  .attr('y', 10)
  .attr('width', 350)
  .attr('height', 500)
  .attr('stroke', 'black')
  .attr('stroke-width', '3px')
  .attr('fill', 'white');

svg2.append('rect')
  .attr('x', 5)
  .attr('y', 10)
  .attr('width', 350)
  .attr('height', 500)
  .attr('stroke', 'black')
  .attr('stroke-width', '3px')
  .attr('fill', 'white');

// ----- Abstract -------
svg2.append('text')
  .attr('x', 35)
  .attr('y', 80)
  .attr('class', 'heavy')
  .style("font-size", 34)
  .text("Abstract");

svg2.append('text')
  .attr('x', 20)
  .attr('y', 120)
  .attr('stroke', 'black')
  .style("font-size", 14)
  .text('As more of our time is spent in the digital world,');

svg2.append('text')
  .attr('x', 20)
  .attr('y', 140)
  .attr('stroke', 'black')
  .style("font-size", 14)
  .text('streaming services and social networking apps');

svg2.append('text')
  .attr('x', 20)
  .attr('y', 160)
  .attr('stroke', 'black')
  .style("font-size", 14)
  .text('have almost entirely replaced books. Despite the');

svg2.append('text')
  .attr('x', 20)
  .attr('y', 180)
  .attr('stroke', 'black')
  .style("font-size", 14)
  .text('availability of e-readers such as Kindles, reading');

svg2.append('text')
  .attr('x', 20)
  .attr('y', 200)
  .attr('stroke', 'black')
  .style("font-size", 14)
  .text('has become less and less common. One way this');

svg2.append('text')
  .attr('x', 20)
  .attr('y', 220)
  .attr('stroke', 'black')
  .style("font-size", 14)
  .text('shift can be reversed is by giving people resources');

svg2.append('text')
  .attr('x', 20)
  .attr('y', 240)
  .attr('stroke', 'black')
  .style("font-size", 14)
  .text('to find new books.The general area of interest for');

svg2.append('text')
  .attr('x', 20)
  .attr('y', 260)
  .attr('stroke', 'black')
  .style("font-size", 14)
  .text('our project is the ratings and rankings of books,');

svg2.append('text')
  .attr('x', 20)
  .attr('y', 280)
  .attr('stroke', 'black')
  .style("font-size", 14)
  .text('and how they compare to one another. We intend');

svg2.append('text')
  .attr('x', 20)
  .attr('y', 300)
  .attr('stroke', 'black')
  .style("font-size", 14)
  .text('to address the comparison of popular books');

svg2.append('text')
  .attr('x', 20)
  .attr('y', 320)
  .attr('stroke', 'black')
  .style("font-size", 14)
  .text('and allow book readers to get a sense of ');

svg2.append('text')
  .attr('x', 20)
  .attr('y', 340)
  .attr('stroke', 'black')
  .style("font-size", 14)
  .text('similarities and differences between books. This');

svg2.append('text')
  .attr('x', 20)
  .attr('y', 360)
  .attr('stroke', 'black')
  .style("font-size", 14)
  .text('will potentially give them new books to read');

svg2.append('text')
  .attr('x', 20)
  .attr('y', 380)
  .attr('stroke', 'black')
  .style("font-size", 14)
  .text(' based on ones they have enjoyed in the past.');

svg2.append('text')
  .attr('x', 20)
  .attr('y', 400)
  .attr('stroke', 'black')
  .style("font-size", 14)
  .text('We believe this visualization will address an');

svg2.append('text')
  .attr('x', 20)
  .attr('y', 420)
  .attr('stroke', 'black')
  .style("font-size", 14)
  .text('important topic as reading improves one\'s focus,');

svg2.append('text')
  .attr('x', 20)
  .attr('y', 440)
  .attr('stroke', 'black')
  .style("font-size", 14)
  .text('memory, empathy, and communication skills.');

// ----- Text Crediting the University -------
svg2.append('text')
  .attr('x', 440)
  .attr('y', 200)
  .attr('class', 'foreword')
  .text('Course Project as part of');

let a1 = svg2.append('a')
  .attr("xlink:href", "https://northeastern.instructure.com/courses/18721");

a1.append("text")
  .attr('x', 390)
  .attr('y', 220)
  .attr('class', 'foreword_link')
  .text('DS4200 S22: Information Visualization');

svg2.append('text')
  .attr('x', 490)
  .attr('y', 240)
  .attr('class', 'foreword')
  .text('taught by');

let a2 = svg2.append('a')
  .attr("xlink:href", "https://www.khoury.northeastern.edu/home/amosca/");

a2.append("text")
  .attr('x', 470)
  .attr('y', 260)
  .attr('class', 'foreword_link')
  .text('Prof. Ab Mosca');

let a3 = svg2.append('a')
  .attr("xlink:href", "https://visualization.khoury.northeastern.edu/");

a3.append("text")
  .attr('x', 435)
  .attr('y', 300)
  .attr('class', 'foreword_link')
  .text('Data Visualization @ Khoury');

let a4 = svg2.append('a')
  .attr("xlink:href", "https://www.khoury.northeastern.edu/");

a4.append("text")
  .attr('x', 450)
  .attr('y', 320)
  .attr('class', 'foreword_link')
  .text('Northeastern University');