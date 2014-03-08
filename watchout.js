var svg = d3.select('body').append('svg');
var w = window.innerWidth/1.2, h = window.innerHeight/1.1;
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

var makePlayer = function(){
  var oneCircle = d3.select('circle');
  oneCircle.attr('class','player')
  .attr('cx', w/2)
  .attr('cy', h/2)
  .call(d3.behavior.drag().on("drag", move));
}

nCircles(5);
makePlayer();

// setInterval(callback, wait);
setInterval(function(){
  var circles = d3.selectAll('.enemy');
  circles
    .transition()
    .duration(1000)
    .attr('cx', function(d){return Math.random()* w})
    .attr('cy', function(d){return Math.random()* h});
    circles.each(function(d){
      checkCollision(d);
    });
}, 1000);

function move(){
    this.parentNode.appendChild(this);
    var player = d3.select(this);
    player
        .attr("cx", function(){return d3.event.dx + parseInt(player.attr("cx"))})
        .attr("cy", function(){return d3.event.dy + parseInt(player.attr("cy"))});
};

var getCoords = function(className){
  var element = d3.select('.' + className);
  var coords = [parseFloat(element.attr("cx")), parseFloat(element.attr("cy"))];
  return coords;
}

var checkCollision = function(currentEnemy){
  
  var player = {
    x: getCoords('player')[0],
    y: getCoords('player')[1]
  };

  var r = d3.select('.player').attr('r');
  var enemies = d3.selectAll('.enemy').each(function(d){
    
    var enemyX = d3.select(this).attr('cx');
    var enemyY = d3.select(this).attr('cy');

    var distance = Math.sqrt(Math.pow(player.x - enemyX, 2) + Math.pow(player.y - enemyY, 2));

    if(distance < 2 * r){
      console.log('collision');
    }
  })

}

setInterval(function(){
  checkCollision();
}, 20);