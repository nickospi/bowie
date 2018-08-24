(function () {
  var width = 1000,
    height = 1000;

    var decades = [   //decades cities //population/songs
          {
            name: '60s',
            songs: 48
          },
          {
            name: '70s',
            songs: 89
          },
          {
            name: '80s',
            songs: 39
          },
          {
            name: '90s',
            songs: 62
          },
          {
            name: '00s',
            songs: 25
          },
          {
            name: '10s',
            songs: 32
          }
        
      ]  
  


var height = 200,
width = 1000,
padding = 100;


var svg = d3.select("viz")
  .append("svg")
  .attr("height", height + padding * 2)
  .attr("width", width + padding * 2)
  .append("g")
  .attr("transform", "translate(100 100)")

    
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
      .attr("dy", defaultRadius + 20)
    
    var circles = groups.append("circle")
      .attr("r", defaultRadius)
    
    var steps = [
      step0,
      step1,
      step2,
      step3,
      step4,
      step5,
      step6
    ]
    
    var currentStep = 0
    
    d3.select("body").on("keyup", function() {
      console.log(d3.event.code)
      if(d3.event.code === "Space" || d3.event.code === "ArrowRight") {
        currentStep = (currentStep + 1) % 7
        steps[currentStep].apply()
      }
      if(d3.event.code === "ArrowLeft") {
        currentStep = currentStep < 1 ? 6 : currentStep - 1
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
        .attr("r", defaultRadius)
        .style("fill-opacity", 1)
        .style("fill", '#ffffff')
        .style("stroke-width", 0)
    
      text.transition()
        .duration(1000)
        .attr("opacity", 0)
    }
    
    function step1() {
      line.transition().attr("opacity", 0)
    
      groups.transition()
        .duration(1000)
        .attr("transform", function(d) {
          return makeTranslate(xPositionScaleName(d.name), height / 2)
        })
    
      circles.transition()
        .duration(1000)
        .attr("r", defaultRadius)
        .style("fill-opacity", 1)
        .style("fill", '#ffffff')
        .style("stroke-width", 0)
    
      text.transition()
        .duration(1000)
        .attr("text-anchor", "middle")
        .attr("opacity", 1)
        .attr("dx", 0)
        .attr("dy", defaultRadius + 20)
    }
    
    function step2() {
      line.transition().attr("opacity", 0)
    
      groups.transition()
        .duration(1000)
        .attr("transform", function(d) {
          return makeTranslate(xPositionScaleName(d.name), height / 2)
        })
    
      circles.transition()
        .duration(1000)
        .attr("r", defaultRadius * 3)
        .style("fill", function(d) {
          return colorScale(d.songs)
        })
        .style("fill-opacity", 1)
        .style("stroke-width", 0)
    
      text.transition()
        .duration(1000)
        .attr("opacity", 1)
        .attr("dy", defaultRadius * 3 + 20)
        .attr("dx", 0)
        .attr("text-anchor", "middle")
    }
    
    function step3() {
      line.transition().attr("opacity", 0)
    
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
        .attr("opacity", 1)
        .attr("dy", function(d) {
          return sizeScale(d.songs) + 20
        })
        .attr("dx", 0)
        .attr("text-anchor", "middle")
    }
    
    function step4() {
      line.transition().attr("opacity", 0)
    
      groups.transition()
        .duration(1000)
        .attr("transform", function(d) {
          var y = height - sizeScale(d.songs) - maxRadius
          return makeTranslate(width / 2, y)
        })
    
      circles.transition()
        .duration(1000)
        .attr("r", function(d) {
          return sizeScale(d.songs)
        })
        .style("fill-opacity", 0)
        .style("fill", '#ffffff')
        .style("stroke-width", 1)
    
      text.transition()
        .duration(1000)
        .attr("opacity", 1)
        .attr("dy", 0)
        .attr("text-anchor", "right")
        .attr("dx", function(d) {
          return sizeScale(d.songs) + 5
        })
    }
    
    function step5() {
      line.transition().attr("opacity", 1)
    
      groups.transition()
        .duration(1000)
        .attr("transform", function(d) {
          return makeTranslate(xPositionScalePopulation(d.songs), height / 2)
        })
    
      circles.transition()
        .duration(1000)
        .attr("r", defaultRadius / 2)
        .style("fill-opacity", 1)
        .style("fill", '#ffffff')
        .style("stroke-width", 0)
    
      text.transition()
        .duration(1000)
        .attr("opacity", 1)
        .attr("dy", defaultRadius / 2 + 20)
        .attr("text-anchor", "middle")
        .attr("dx", 0)
    
    }
    
    function step6() {
      line.transition().attr("opacity", 1)
    
      groups.transition()
        .duration(1000)
        .attr("transform", function(d) {
          return makeTranslate(xPositionScalePopulation(d.songs), height / 2)
        })
    
      circles.transition()
        .duration(1000)
        .attr("r", defaultRadius / 2)
        .style("fill-opacity", 1)
        .style("fill", function(d) {
          return colorScaleName(d.name)
        })
        .style("stroke-width", 0)
    
      text.transition()
        .duration(1000)
        .attr("opacity", 1)
        .attr("dy", defaultRadius / 2 + 20)
        .attr("text-anchor", "middle")
        .attr("dx", 0)
    
    }
    
    
    })
    
    








//