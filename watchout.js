// start slingin' some d3 here.

// Create a board
// d3.select('body').append('svg').attr({width: window.innerWidth, height: window.innerHeight});
// var circle = {cx:"10"; cy:"10"; r:"10"; fill:"black"}
var svg = d3.select('body').append('svg');
var w = window.innerWidth, h = window.innerHeight;
svg.attr({width: w, height: h});

// Create Circle Constructor
var Circle = function(){
  this.r = 10;
  this.cx = Math.random() * w;
  this.cy = Math.random() * h;
}

// Create circles
var appendCircle = function(array){
  svg.selectAll('circle')
  .data(array)
  .enter()
  .append('circle')
  .attr('r', function(d){return d.r})
  .attr('cx', function(d){return d.cx})
  .attr('cy', function(d){return d.cy})
};

var nCircles = function(n){
  var arrayCircle = [];
  for(var i = 0; i < n; i++){
    arrayCircle.push(new Circle());
    appendCircle(arrayCircle);
  }
};

nCircles(30);

// setInterval(callback, wait);
setInterval(function(){
  var circles = d3.selectAll('circle');
  circles.transition()
    .duration(1000)
    .attr('cx', function(d){return Math.random()* w})
    .attr('cy', function(d){return Math.random()* h})
}, 1000);