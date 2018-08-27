(function () {


 var decades = [   
          {
            name: '60s',
            songs: 48,
            imgno: 1,

          },
          {
            name: '70s',
            songs: 89,
            imgno: 2

          },
          {
            name: '80s',
            songs: 39,
            imgno:3
          },
          {
            name: '90s',
            songs: 62,
            imgno:4
          },
          {
            name: '00s',
            songs: 25,
            imgno:5
          },
          {
            name: '10s',
            songs: 32,
            imgno:6
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

var text = groups.append("text")
  .text(function(d) {
    return d.name
  })
  .attr("text-anchor", "middle")
  .attr("opacity", 0)
  .attr("dy", defaultRadius + 40)

var labeltext = groups.append("text")
  .text(function(d) {
    return d.songs+" song lyrics"
  })
  .attr("text-anchor", "middle") 

  .attr("opacity", 0)
  .attr("dy", defaultRadius + 40)



var textZero = groups.append("text")
  .text(function(d) {
    return maxSongs+ " song lyrics written by Bowie and dating from  1964 up to 2015 have been analyzed.[Click ot Tap]"
  })
  .attr("text-anchor", "middle")
  .attr("opacity", 1)
  .attr("dy", defaultRadius*3 + 40)

var circles = groups.append("circle")
  .attr("r", defaultRadius*3)
  .attr("fill", 'white')
  .style("fill-opacity", 0)

function circleTransition() { 

var plsCircles = groups.append("circle")
  .attr("r", defaultRadius*2)
  .attr("fill", 'white')

  repeat();

function repeat() {
  plsCircles
    .transition()        
    .duration(500)      
    .attr("r", defaultRadius*2)
    .attr("fill","white")
    .transition()       
    .duration(500)      
    .attr("r", defaultRadius)
    .attr("fill","white")
    .on("end", repeat);  
};

};

circleTransition();
 
var steps = [
  step0,
  step1,
  step2
 
]

var imgsix = svg.append("svg:image")
.attr("xlink:href", "style/images/sixties.png")
.attr("width", "80")
.attr("height", "80")
.attr('x',  width/4-200)
.attr("visibility","hidden")

var imgseven = svg.append("svg:image")
.attr("xlink:href", "style/images/seventies.png")
.attr("width", "80")
.attr("height", "80")
.attr('x', width/4)
.attr("visibility","hidden")

var imgeight = svg.append("svg:image")
.attr("xlink:href", "style/images/eighties.png")
.attr("width", "80")
.attr("height", "80")
.attr('x', width/4+200)
.attr("visibility","hidden")

var imgnine = svg.append("svg:image")
.attr("xlink:href", "style/images/nineties.png")
.attr("width", "80")
.attr("height", "80")
.attr('x', width/4+400)
.attr("visibility","hidden")

var imgten = svg.append("svg:image")
.attr("xlink:href", "style/images/zeroes.png")
.attr("width", "80")
.attr("height", "80")
.attr('x', width/4+600)
.attr("visibility","hidden")

var currentStep = 0

d3.select("body").on("click", function() {
  console.log(d3.event.code)
  {
        currentStep = (currentStep + 1) % 3
        steps[currentStep].apply()
      }
     
    })

function makeTranslate(x, y) {
  return "translate(" + x + " " + y + ")"
}

function step0() {
  line.transition().attr("opacity", 0)

  groups.transition()
    .duration(1000)
    .attr("transform", makeTranslate(width / 2, height / 2))
   
  circles.transition()
    .duration(1000)
    .attr("r",defaultRadius*3)
    .style("fill-opacity", 1)
    .style("fill", '#ffffff')
    .style("stroke-width", 0)
    
  text.transition()
    .duration(1000)
    .attr("opacity", 0)

  textZero.transition()
    .duration(500)
    .attr("text-anchor", "middle")
    .attr("opacity", 1)
    .attr("dx", 0)
    .attr("dy", defaultRadius*3 + 40)  

labeltext.transition()
.duration(1000)
    .attr("opacity", 0)
    .attr("dy", function(d) {
      return sizeScale(d.songs) + 40
    })
    .attr("dx", 0)
    .attr("text-anchor", "middle")

}

    

function step1() {
  line.transition().attr("opacity", 2)

textZero.transition()
    .duration(250)
    .attr("text-anchor", "middle")
    .attr("opacity", 0)
    .attr("dx", 0)
    .attr("dy", defaultRadius*3 + 40)
   
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
  
  text.transition()
    .duration(1000)
    .attr("text-anchor", "middle")
    .attr("opacity", 1)
    .attr("dx", 0)
    .attr("dy", defaultRadius*2 + 40)


    

imgsix
.attr("visibility","show")
imgseven
.attr("visibility","show")
imgeight
.attr("visibility","show")
imgnine
.attr("visibility","show")
imgten
.attr("visibility","show")



}


function step2() {
  line.transition().attr("opacity", 2)

  groups.transition()
    .duration(1000)
    .attr("transform", function(d) {
      return makeTranslate(xPositionScaleName(d.name), height / 2)
    })

  circles.transition()
    .duration(1000)
    .attr("r", function(d) {
      return sizeScale(d.songs)
    })
    .style("fill-opacity", 1)
    .style("fill", '#ffffff')
    .style("stroke-width", 0)

  text.transition()
    .duration(1000)
    .attr("opacity", 0)
    .attr("dy", function(d) {
      return sizeScale(d.songs) + 40
    })
    .attr("dx", 0)
    .attr("text-anchor", "middle")


labeltext.transition()
.duration(1000)
    .attr("opacity", 1)
    .attr("dy", function(d) {
      return sizeScale(d.songs) + 40
    })
    .attr("dx", 0)
    .attr("text-anchor", "middle")
  
    
    

imgsix
.attr("visibility","hidden")
imgseven
.attr("visibility","hidden")
imgeight
.attr("visibility","hidden")
imgnine
.attr("visibility","hidden")
imgten
.attr("visibility","hidden")




}


}())
 

