var svg = d3.select('body').append('svg');
var w = window.innerWidth/2, h = window.innerHeight/2;
svg.attr({width: w, height: h});

// Create Circle Constructor
var Circle = function(){
  this.class = 'enemy';
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
  .attr('class', function(d){return d.class})
  .attr('r', function(d){return d.r})
  .attr('cx', function(d){return d.cx})
  .attr('cy', function(d){return d.cy})
};

var nCircles = function(n){
  var arrayCircle = [];
  for(var i = 0; i < n; i++){
    arrayCircle.push(new Circle());
  }
  appendCircle(arrayCircle);
};

nCircles(10);
var oneCircle = d3.select('circle');
oneCircle.attr('class','player')
.attr('cx', w/2)
.attr('cy', h/2)
.call(d3.behavior.drag().on("drag", move));
// .call(d3.behavior.drag()
// .on("player", move));

// setInterval(callback, wait);
setInterval(function(){
  var circles = d3.selectAll('.enemy');
  circles
    .transition()
    .duration(1000)
    .attr('cx', function(d){return Math.random()* w})
    .attr('cy', function(d){return Math.random()* h})
}, 1000);

function move(){
    this.parentNode.appendChild(this);
    var player = d3.select(this);
    player
        .attr("cx", function(){return d3.event.dx + parseInt(player.attr("cx"))})
        .attr("cy", function(){return d3.event.dy + parseInt(player.attr("cy"))});
};

var getCoords = function(className){
  var player = d3.selectAll('circle')
    .attr("cx", function(d){ console.log('cx', d.cx) })
    .attr("cy", function(d){ console.log('cy', d.cy) });

  // console.log('cx:' , player.attr('cx'));
  // console.log('cy:' , player.attr('cy'));
  // .event.dx;
  // .event.dx
}
setInterval(function(){
  getCoords();
}, 1000);