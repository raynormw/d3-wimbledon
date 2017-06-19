/* global d3 */

// Our canvas
const width = 1000,
  height = 400,
  margin = 20
  marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('padding', '100px 50px')
  .style('background', '#FAFAFA')
  .style('border', '1px solid black')

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
  .range([0, 400])

  const xScale = d3.scaleLinear()
  .domain([0, goalScored.length])
  .range([0, 1000])

  const colorScale = d3.scaleLinear()
  .domain([0, d3.max(goalScored)])
  .range(['#64edbc', '#6495ed'])

  const xAxis = d3.axisBottom(xScale)
  .ticks(goalScored.length)

  svg.append("g")
  .attr("transform", "translate(0, 1000)")
  .call(xAxis)

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
