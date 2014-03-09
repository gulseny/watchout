// Window width and height
var w = window.innerWidth;
var h = window.innerHeight;
var collisionCount = 0;
var currentScore = 0;
var count = 0;
// var highScore = 0;
// var currentScoreEl = d3.select('.current span').text();
// var highScoreEl = d3.select('.high span').text();

// Make a Board function
var makeBoard = function(width, heigth){
  var svg = d3.select('body').append('svg');
  svg.attr({width: w, height: h});
  return svg;
}

var board = makeBoard(w,h);

var appendCircle = function(svgEl){
  svgEl.selectAll('circle')
  .data(d3.range(10))
  .enter()
  .append('circle')
  .attr('class', 'enemy')
  .attr('r', 10)
  .attr('cx', function(){ return Math.random() * svgEl.attr('width')})
  .attr('cy', function(){ return Math.random() * svgEl.attr('height')})
};

appendCircle(board);

var makePlayer = function(){
  var oneCircle = d3.select('circle');
  oneCircle.attr('class','player')
  .attr('cx', w/2)
  .attr('cy', h/2)
  .call(d3.behavior.drag().on("drag", move));
}
makePlayer();

setInterval(function(){
  var circles = d3.selectAll('.enemy');
  circles.transition()
    .duration(1000)
    .attr('cx', function(d){return Math.random()* w})
    .attr('cy', function(d){return Math.random()* h});
    circles.each(function(d){
      checkCollision(d);
    });
},1000);

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
    
    currentScore++;
    d3.select('.current span').text(currentScore);

    if(distance < 2 * r){
      count++;

      console.log('collision');

      d3.select('.collisions span').text(count);

      // console.log('Current score:', currentScore);
      // console.log('high score:', highScore);
      
      // d3.select('.current span').text();

      if(parseInt(d3.select('.high span').text()) < currentScore){
        d3.select('.high span').text(currentScore);
      }
      currentScore = 0;
    }
  })
}

setInterval(function(){
  checkCollision();
}, 20);