// @TODO: YOUR CODE HERE!
var svgWidth = 800;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then(function(censusData) {

    // Step 1: Parse Data/Cast as numbers (Kept the step titles from the Hair Metal actvity - they look pretty neat)
    // ==============================
    censusData.forEach(function(data) {
      data.obesity = +data.obesity;
      data.poverty = +data.poverty;
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(censusData, d => d.obesity) * 0.8, d3.max(censusData, d => d.obesity) * 1.1])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(censusData, d => d.poverty) * 0.8, d3.max(censusData, d => d.poverty) * 1.1])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(censusData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.obesity))
    .attr("cy", d => yLinearScale(d.poverty))
    .attr("r", "13")
    .attr("fill", "green")
    .attr("opacity", ".7")
    //.class("stateCircle", true); tried before, didn't work
    .attr("class","stateCircle");

    chartGroup.selectAll(".stateText") 
    .data(censusData) 
    .enter() 
    .append("text")
    .text(data => data.abbr)
    .attr("dx", data => xLinearScale(data.obesity)) 
    .attr("dy", data => yLinearScale(data.poverty))
    .attr("class", "stateText")
    .attr('font-size', 10)


//Tried to use expamples from the class activities to add tool,tips, didn't work out

/*
    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, 60])
      .html(function(d) {
        return (`<br>High Obesity: ${d.obesityHigh}<br> Poverty: ${d.poverty}`);
      });

    

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });
*/
    // Create labels for X and Y
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 1.3))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Poverty");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Obesity");
  }).catch(function(error) {
    console.log(error);
  });