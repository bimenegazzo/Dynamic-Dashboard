/* global d3 */

function barChart() {

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 400,
    height = 400,
    innerWidth = width - margin.left - margin.right,
    innerHeight = height - margin.top - margin.bottom,
    xValue = function(d) { return d[0]; },
    yValue = function(d) { return d[1]; },
    xScale = d3.scaleBand().padding(0.1),
    yScale = d3.scaleLinear(),
    onBrushed = function () {},
    brush = d3.brushX();
        
  function chart(selection) {
    selection.each(function (data) {
          //console.log(data)

      innerWidth = width - margin.left - margin.right,
      innerHeight = height - margin.top - margin.bottom;

      // Select the svg element, if it exists.
      var svg = d3.select(this).selectAll("svg").data([data]);     

      // Otherwise, create the skeletal chart.
      var svgEnter = svg.enter().append("svg");
      var gEnter = svgEnter.append("g");
      gEnter.append("g").attr("class", "x axis");
      gEnter.append("g").attr("class", "y axis");
      
      // Update the outer dimensions.
      svg.merge(svgEnter).attr("width", width)
            .attr("height", height);

      // Update the inner dimensions.
      var g = svg.merge(svgEnter).select("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      xScale.rangeRound([0, innerWidth])
            .domain(data.map(xValue));
      yScale.rangeRound([innerHeight, 0])
            .domain([0, d3.max(data, yValue)]);

      g.select(".x.axis")
            .attr("transform", "translate(0," + innerHeight + ")")
            .call(d3.axisBottom(xScale));

      g.select(".y.axis")
            .call(d3.axisLeft(yScale).ticks(10))
        .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Frequency");

      var bars = g.selectAll(".bar")
            .data(function (d) { return d; });

      bars.enter().append("rect")
            .attr("class", "bar")
        .merge(bars)
            .attr("x", X)
            .attr("y", Y)
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) { 
                return innerHeight - Y(d); 
          });

      bars.exit().remove();

      brush.on("end.snap", brushed);
      svgEnter.append("g").attr("class","brush").call(brush);

      function brushed() {

            var selected = d3.event.selection;
            var nD = [];
            
            if (!d3.event.sourceEvent || !selected) return;
            //console.log(xScale.step() / 2)
            var range = xScale.domain().map(xScale), dx = (xScale.step() / 2) + 5;
            var x0 = range[d3.bisectRight(range, selected[0])] - dx + 15;
            var x1 = range[d3.bisectRight(range, selected[1]) - 1] + dx;
            
            d3.select(this).transition().call(brush.move, x1 > x0 ? [x0, x1] : null);
            

            var key1;
            var key2;
            var test1 = [
                {"1":47.5},
                {"2":108.5},
                {"3":169.5},
                {"4":230.5},
                {"5":291.5},
                {"6":352.5},
                {"7":413.5},
                {"8":474.5},
                {"9":535.5},
                {"10":596.5},
                {"11":657.5},
                {"12":718.5}
            ]

            var test2 = [
                {"1":103.5},
                {"2":164.5},
                {"3":225.5},
                {"4":286.5},
                {"5":347.5},
                {"6":408.5},
                {"7":469.5},
                {"8":530.5},
                {"9":591.5},
                {"10":652.5},
                {"11":713.5},
                {"12":774.5}
            ]

            for ( i in test1 ) {
                //console.log(selection[0])
                for ( j in test1[i] ){
                    
                    if ( x0 == test1[i][j] ) {
                        key1 = j
                      
                    }
                    if (x1 == test2[i][j] ) {
                        key2 = j
                    }
                   
                }
            }
           
            key = []
            
            key.push(key1,key2)
            if ( key[0] == key[1] ) {
                onBrushed(key[0])
            } else {
                onBrushed(key)
            }

        }
      
    });

  }


// The x-accessor for the path generator; xScale ∘ xValue.
  function X(d) {
        return xScale(xValue(d));
  }

  // The y-accessor for the path generator; yScale ∘ yValue.
  function Y(d) {
        return yScale(yValue(d));
  }

  chart.margin = function(_) {
        if (!arguments.length) return margin;
        margin = _;
        return chart;
  };

  chart.width = function(_) {
        if (!arguments.length) return width;
        width = _;
        return chart;
  };

  chart.height = function(_) {
        if (!arguments.length) return height;
        height = _;
        return chart;
  };

  chart.x = function(_) {
        if (!arguments.length) return xValue;
        xValue = _;
        return chart;
  };

  chart.y = function(_) {
        if (!arguments.length) return yValue;
        yValue = _;
        return chart;
  };

  chart.onBrushed = function(_) {
        if (!arguments.length) return onBrushed;
        onBrushed = _;
        return chart;
  };

        return chart;
}
