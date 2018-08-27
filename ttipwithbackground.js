(function () {


    var decades = [   
      {
        name: '60s',
        songs: 48,
        tfidf: 'baby 1.72 /n dream 1.58 | yeah 1.53 want 1.45 little 1.41 live 1.34 london 1.33 girl 1.25 know 1.18 friend 1.13 blue 1.04 away 1.03 time 1.02 anything 0.99 sleep 0.95 good 0.89 hand 0.88 made 0.88 play 0.86 well 0.85'
 
      },
      {
        name: '70s',
        songs: 89,

      },
      {
        name: '80s',
        songs: 39,
      },
      {
        name: '90s',
        songs: 62,
      },
      {
        name: '00s',
        songs: 25,
      },
      {
        name: '10s',
        songs: 32,
      }
    
  ]  
var height = 200,
width = 1000,
padding = 100;

var svg = d3.select("body")
.append("svg")
.attr("height", height + padding * 2)
.attr("width", width + padding * 2)
.append("g")
.attr("transform", "translate(100 100)")


var names = decades.map(function(d) { return d.name })
var songNames = decades.map(function(d) { return +d.songs }),
minPop = d3.min(songNames),
maxPop = d3.max(songNames);

var maxSongs = 295

var xPositionScaleName = d3.scalePoint().domain(names).range([0, width])
var colorScale = d3.scaleLinear().domain([minPop, maxPop]).range(['#ffffff','#e7298a'])
var colorScaleName = d3.scaleOrdinal().domain(names).range(['#66c2a5','#fc8d62','#8da0cb','#e78ac3','#a6d854'])


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
.attr("opacity", 0)


var groups = svg.selectAll("g")
.data(decades)
.enter().append("g")
.attr("transform", "translate(" + (width / 2) + " " + (height / 2) + ")")

var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("text-anchor", "middle")
    .style("visibility", "hidden")
    .style("background", "#282828")
    .style('width', 300 )
    .style('height', 600 )
    
    



var labeltext = groups.append("text")
.text(function(d) {
return d.songs+" song lyrics"
})
.attr("text-anchor", "middle")
.attr("opacity", 0)
.attr("dy", defaultRadius + 40)





var circles = groups.append("circle")
.attr("r", defaultRadius*3)
.attr("fill", 'white')
.style("fill-opacity", 0)



 function makeTranslate(x, y) {
   return "translate(" + x + " " + y + ")"
 }



line.attr("opacity", 2)

groups.attr("transform", function(d) {
return makeTranslate(xPositionScaleName(d.name), height / 2)
 })

circles.attr("r", function(d) {
return sizeScale(d.songs)
 })
 .style("fill-opacity", 1)
 .style("fill", '#ffffff')
 .style("stroke-width", 0)
 .on("mouseover", function(d,i){ 
  console.log("mouseover on", this)
     tooltip.text(d.tfidf+d.name); return tooltip.style("visibility", "visible")
     && d3.select(this)
       .transition()
       .duration(100)
       .attr('stroke', '#ffffff')
       .attr('stroke-width', '2')
       
  ;})


  .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
  .on("mouseout", function(d,i){
    console.log("mouseout", this)    
    return tooltip.style("visibility", "hidden")
    && d3.select(this)
              .transition()
              .duration(100)
              .attr('stroke', '#000000')
              .attr('stroke-width', '0')
              
              
              ;})

labeltext
 .attr("opacity", 1)
 .attr("dy", function(d) {
   return sizeScale(d.songs) + 40
 })
 .attr("dx", 0)
 .attr("text-anchor", "middle")


}())


;
