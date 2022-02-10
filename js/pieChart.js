/* global d3 */

function pieChart() {

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 300,
    height = 200,
    innerWidth = width - margin.left - margin.right,
    innerHeight = height - margin.top - margin.bottom,
    pie = d3.pie(),
    arc = d3.arc(),
    label = d3.arc(),
    color = d3.scaleOrdinal(),
    onClick = function() {};
    /*MouseOver = function() {},
    MouseOut = function () {};*/

  function chart(selection) {
    selection.each(function (data) {  
        
        
        radius = Math.min(width, height) / 2,
        innerWidth = width - margin.left - margin.right,
        innerHeight = height - margin.top - margin.bottom;

        color.domain(data)
            .range(['#BDD5E7','#99BDDA','#5F98C6','#2C6593','#1C415E', '#1C415E','#122A3C'])

        arc.innerRadius(0)
            .outerRadius(radius);
        
        label.innerRadius(radius)
            .outerRadius((radius/4));

        // Select the svg element, if it exists.
        var svg = d3.select(this).selectAll("svg").data([data]);     

        // Otherwise, create the skeletal chart.
        var svgEnter = svg.enter().append("svg");
        var gEnter = svgEnter.append("g");

        // Update the outer dimensions.
        svg.merge(svgEnter).attr("width", width)
            .attr("height", height);

        var g = svg.merge(svgEnter).select("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        
        var path = g.selectAll(".slice")
            .data(createPie)
            
        path.enter().append("path")
            .attr("class", getText)
            .merge(path)
            //.text(getText)
            .attr("fill", function(d, i) { return color(i); })
            .attr("d", arc)
            .on("click", onClick)
            /*.on("mouseover", MouseOver)
            .on("mouseout", MouseOut);*/
        
        path.exit().remove();

        /*var text = g.selectAll(".text")
            .data(createPie)

        text.enter().append("path")
            .attr("class","text")
            .merge(text)
            .text(getText)
            .style("font-size", "12px")
            .style('fill', 'black')
            .attr("transform", placeText)

        text.exit().remove();*/       
  
    });

  }

  function createPie(d) {
        pie.value(function(d) {return d.value})
        return pie(d)
  }

  function getText(d) {
        //return d.data.key.substring(0, 2);
        return "slice"+d.data.key;
  }

  function placeText(d) {        
        x=label.centroid(d)[0]
        y=label.centroid(d)[1]
        return "translate(" + x+","+y + ")"; 
  }

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

  /*chart.MouseOver = function(_) {
        if (!arguments.length) return MouseOver;
        MouseOver = _;
        return chart;
  };

  chart.MouseOut = function(_) {
        if (!arguments.length) return MouseOut;
        MouseOut = _;
        return chart;
  };*/

  chart.onClick = function(_) {
        if (!arguments.length) return onClick;
        onClick = _;
        return chart;
  };

  return chart;
}
