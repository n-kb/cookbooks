<template>
  <div class="notification is-warning" v-if="noResults">
    <button class="delete" @click="noResults = false"></button>
    Your search returned no results.
  </div>
  <div id="viz" ref="viz" :class="{'invisible': isLoading}">
  </div>
  <p :class="{'invisible': isLoading}">{{legend}}.</p>
</template>

<script>
import * as d3 from "d3"

export default {
  props: ['results', 'isLoading'],
  data() {
    return {
      noResults: false,
      legend: ""
    }
  },
  watch : {
    results(newvalue) {
      this.makeViz(newvalue)
    }
  },
  methods: {
    makeViz(results)
    {
      this.legend = "Frequency of the words " + results.query.join(", ") + " (aggregated) in " + results.aggregate_results.length + " cookbooks"

      var el_w = this.$refs.viz.clientWidth;
      
      var margin = {top: 10, right: 30, bottom: 30, left: 60},
          width = el_w - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;

      //d3.select("svg").remove();
      const div = document.querySelector('#viz');
      [].slice.call(div.children).forEach(child => div.removeChild(child))

      var svg = d3.select("#viz")
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

      const data = results.aggregate_results

      // Displays error message if no results
      if (data == false) {
        this.noResults = true
        return false
      } else {
        this.noResults = false
      }

      const lowess = results.lowess

      // create a tooltip
      var Tooltip = d3.select("body")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")

      // Two functions for tooltips
      var mouseover = function(event, d) {
        Tooltip
          .style("opacity", 1)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY) + "px")
          .html("<em>" + d.title + "</em><br>Publication year: " + d.pub_year)

        d3.select(this)
          .style("stroke", "black")
          .style("opacity", 1)

      }

      var mouseleave = function() {
        Tooltip
          .style("opacity", 0)
        d3.select(this)
          .style("stroke", "none")
          .style("opacity", 0.8)
      }

      var max_year = d3.max(data, function(d) { return +d.pub_year;} );
      var min_year = d3.min(data, function(d) { return +d.pub_year;} );

      var max_freq = d3.max(data, function(d) { return +d.frequency;} );

      var x = d3.scaleLinear()
          .domain([min_year - 5, max_year + 5])
          .range([ 0, width ]);

      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
                .tickFormat(d3.format("d")))

      // Add Y axis
      var y = d3.scaleLinear()
        .domain([0, max_freq + 0.001])
        .range([ height, 0]);
      svg.append("g")
        .call(d3.axisLeft(y));
      
      // Adds lowess curves, starting with stderr
      // If there are more than X points
      if (data.length >= 10) {
        var area = d3.area()
                   .x(function(d)  { return x(d.year); })
                   .y0(function(d) { return y(d.ul); })
                   .y1(function(d) { return d.ll > 0 ? y(d.ll) : y(0); }); 

        svg.append("path")
              .datum(lowess)
              .attr("fill", "#ccc")
              .attr("stroke", "steelblue")
              .attr("stroke-width", 0)
              .style("opacity", 0.2)
              .attr("d", area);

        svg.append("path")
           .datum(lowess)
           .attr("fill", "none")
           .attr("stroke", "steelblue")
           .attr("stroke-width", 1.5)
           .attr("d", d3.line()
            .x(function(d) { return x(d.year) })
            .y(function(d) { return y(d.lowess) })
            )
      }
      // Add dots
      svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
          .attr("cx", function (d) { return x(d.pub_year); } )
          .attr("cy", function (d) { return y(d.frequency); } )
          .attr("r", 5)
          .style("fill", "#69b3a2")
        .on("mouseover", mouseover)
        .on("mouseleave", mouseleave)

    }
  }
  
}

</script>

<style type="text/css">
  div.tooltip {
    position: absolute;
    text-align: left;
    width: 260px;
    padding: 5px;
    font: 12px sans-serif;
    background: white;
    border: 1px solid black;
    pointer-events: none;
  }
  .invisible {
    opacity: 0;
  }
</style>