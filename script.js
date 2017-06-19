/* global d3 */

// Our canvas
const width = 1000,
  height = 400,
  margin = 20,
  marginLeft = 60

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

  // .style('paddingLeft', marginLeft)
  .style('background', '#FAFAFA')
  .style('border', '1px solid black')
  .style('padding', '50px')

const mouseover = (d, i) => {
  debugger
}

// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv('afcw-results.tsv', (rows) => {
    console.log(JSON.stringify(rows))
    redraw(rows)
  })
}

// redraw function
let redraw = (data) => {
  let goalScored = []
  data.forEach(function (res) {
    goalScored.push(res.GoalsScored)
  })

  const yScale = d3.scaleLinear()
  .domain([0, d3.max(goalScored)])
  .range([0, height])

  const xScale = d3.scaleLinear()
  .domain([0, goalScored.length])
  .range([0, width])

  const colorScale = d3.scaleLinear()
  .domain([0, d3.max(goalScored)])
  .range(['#64edbc', '#6495ed'])

  var yAxis = d3.axisLeft(yScale);
  var xAxis = d3.axisBottom(xScale);

  svg.append('g')
   .call(yAxis)
   .attr('transform', 'translate(20, 0)')

  svg.append('g')
   .call(xAxis)
    .attr('transform', 'translate(0, 380)')

  // Your data to graph here
  svg.selectAll('rect')
    .data(goalScored)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => {
      return xScale(i)
    })
    .attr('y', (d) => {
      return 400 - yScale(d)
    })
    .attr('width', margin)
    .attr('height', (d) => {
      return yScale(d)
    })
    .attr('fill', colorScale)
    .on('mouseover', function (d, i) {
      d3.select(this).style('fill', '#ed6495')
    })
    .on('mouseout', function (d, i) {
      d3.select(this).style('fill', colorScale(d))
    })

}

reload()
