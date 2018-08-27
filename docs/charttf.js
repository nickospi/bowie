(function () {


    var decades = [   
      {
        name: '60s',
        songs: 48,
        tfidf: '<br> baby 1.72 <br> dream 1.58 <br> yeah 1.53 <br> want 1.45 <br> little 1.41 <br> live 1.34 <br> london 1.33 <br> girl 1.25 <br> know 1.18 <br> friend 1.13 <br> blue 1.04 <br> away 1.03 <br> time 1.02 <br> anything 0.99 <br> sleep 0.95 <br> good 0.89 <br> hand 0.88 <br> made 0.88 <br> play 0.86 <br> well 0.85 <br>'
 
      },
      {
        name: '70s',
        songs: 89,
        tfidf: '<br> come 2.88 <br> could 2.49 <br> time 2.12 <br> never 2.11 <br> back 1.77 <br> take 1.73 <br>stay 1.73 <br> baby 1.70 <br>someone 1.68 <br> want 1.64 <br> face  1.53<br> rock  1.50 <br>cause 1.47<br> life  1.46<br> waiting 1.44 <br> look 1.37 <br> yeah 1.35 <br> young 1.34 <br> away 1.31<br> roll 1.29<br>'
       


      },
      {
        name: '80s',
        songs: 39,
        tfidf: '<br> dance 1.72 <br> long 1.45 <br> time 1.29 <br> girl 1.23 <br> nothing 1.12 <br> tonight 1.11 <br>never 1.05 <br> today 1.02<br> beat 0.97<br> little 0.95 <br> modern 0.92<br> shake 0.90 <br> come  0.89<br> million 0.86<br> fire 0.86 <br> yeah 0.86 <br> dancing 0.84 <br> york 0.83 <br> baby 0.81 <br> well 0.81 <br>'
       
        
  
      },
      {
        name: '90s',
        songs: 62,
        tfidf: '<br> life 1.83 <br> real 1.83 <br> well 1.71 <br> nothing 1.53 <br> time 1.52 <br> give 1.37 <br> nobody 1.35 <br> never 1.29 <br> call 1.26 <br> little 1.24 <br> away 1.20 <br> feel 1.18 <br> mind 1.16<br> heart 1.16 <br> right 1.10 <br> living 1.08 <br> world 1.07 <br> back 1.05 <br> telling 1.05 <br> dreaming 1.01<br>'



      },
      {
        name: '00s',
        songs: 25,
        tfidf: ' <br> better 1.30<br>life 1.24<br>looking 1.19<br>queen  1.05<br>skyline  1.048<br>everyone  0.94<br>never  0.90<br>nothing  0.83<br>little  0.82<br>home  0.75<br>ever  0.75<br>shadow  0.72<br>burn  0.69<br>bring  0.67<br>ready  0.65<br>know  0.62<br>hero  0.62<br>afraid  0.61<br>fall  0.60<br>fear  0.60<br>'
        

      },
      {
        name: '10s',
        songs: 32,
        tfidf: '<br> girl  1.23 <br> star  1.05 <br> could  1.04 <br> turn  1.03 <br> take  0.99 <br> never  0.99 <br> know  0.96 <br> face  0.96 <br>hand  0.93<br> blood  0.90 <br> hold  0.89<br>        nothing  0.85<br>         life  0.83<br>         bless  0.78<br>         world  0.77<br>         tell  0.75<br> ever  0.74<br> tonight  0.73<br> dying  0.70<br> dancing  0.70<br>'

      }
    
  ]  
var height = 200,
width = 1000,
padding = 100;


 
    var tip = d3.tip()
    .attr('class', 'd3-tip')
    .style("text-anchor", "middle")
    .style("background", "#282828")
    .style('width', 200 )
    .style('height', 400 )
    .html(function(d) {
      return "<strong>Top Terms:</strong> <span style='color:red'>" + d.name + "</span>"+"<p>"+d.tfidf+"</p>";
    })   

 
    var svg = d3.select("body")
    .append("svg")
    .attr("height", height + padding * 2)
    .attr("width", width + padding * 2)
    .append("g")
    .attr("transform", "translate(100 100)")
    var imgsix = svg.append("svg:image")
    .attr("xlink:href", "style/images/sixties.png")
    .attr("width", "80")
    .attr("height", "80")
    .attr('x',  width/4-200)
    
    var imgseven = svg.append("svg:image")
    .attr("xlink:href", "style/images/seventies.png")
    .attr("width", "80")
    .attr("height", "80")
    .attr('x', width/4)
    
    var imgeight = svg.append("svg:image")
    .attr("xlink:href", "style/images/eighties.png")
    .attr("width", "80")
    .attr("height", "80")
    .attr('x', width/4+200)
    
    var imgnine = svg.append("svg:image")
    .attr("xlink:href", "style/images/nineties.png")
    .attr("width", "80")
    .attr("height", "80")
    .attr('x', width/4+400)
    
    var imgten = svg.append("svg:image")
    .attr("xlink:href", "style/images/zeroes.png")
    .attr("width", "80")
    .attr("height", "80")
    .attr('x', width/4+600)
    
    
  
svg.call(tip);


var names = decades.map(function(d) { return d.name })
var songNames = decades.map(function(d) { return +d.songs }),
minPop = d3.min(songNames),
maxPop = d3.max(songNames);

var maxSongs = 295

var xPositionScaleName = d3.scalePoint().domain(names).range([0, width])
var defaultRadius = 20;
var maxRadius = 100;
var sizeScale = d3.scaleSqrt().domain([0, maxPop]).range([0, maxRadius])

var xPositionScalesongs = d3.scaleLinear().domain([0, maxPop]).range([0, width])


var line = svg.append("line")
.attr("x1", 0)
.attr("x2", width)
.attr("y1", height / 2)
.attr("y2", height / 2)
.attr("stroke", "white")
.attr("opacity", 2)

var groups = svg.selectAll("g")
.data(decades)
.enter().append("g")
.attr("transform", "translate(" + (width / 2) + " " + (height / 2) + ")")

var text = groups.append("text")
.text(function(d) {
  return d.name
})
.attr("text-anchor", "middle")
.attr("opacity", 1)
.attr("dy", defaultRadius*2 + 40)



var circles = groups.append("circle")
.attr("r", defaultRadius*3)
.attr("fill", 'white')
.style("fill-opacity", 0)
.on('mouseover', tip.show)
.on('mouseout', tip.hide)



function makeTranslate(x, y) {
return "translate(" + x + " " + y + ")"
}

  
 
groups.transition()
  .duration(1000)
  .attr("transform", function(d) {
    return makeTranslate(xPositionScaleName(d.name), height / 2)
  })


circles.transition()
  .duration(1000)
  .attr("r", defaultRadius*2)
  .style("fill-opacity", 1)
  .style("fill", '#ffffff')
  .style("stroke-width", 0)
  .style("stroke-width", 0)
  .on('mouseover', tip.show)
  .on('mouseout', tip.hide)


}())


;



 
 