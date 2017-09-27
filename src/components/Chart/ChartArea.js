import React, {Component} from 'react'
import {Plot} from '../Presentation'
import moment from 'moment'

class ChartArea extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.ts === this.props.ts) return
    const {data: {series}} = this.props
    if (!series) return
    // const xs0 = series[0].data.reduce((xs, point) => [...xs, point[1]], [])
    // const xs1 = series[1].data.reduce((xs, point) => [...xs, point[1]], [])
    // const xs = [...xs0, ...xs1]
    // const max = Math.max(...xs)
    // const min = Math.min(...xs)

    this.chart = window.Highcharts.chart('plot', {
      chart: {
        type: 'area',
        margin: [0, 0, 21, 0],
        zoomType: 'xy'
      },
      title: null,
      xAxis: {
        crosshair: true,
        type: 'datetime',
        tickLength: 5,
        minPadding: 0.0005,
        maxPadding: 0.001,
        labels: {
          y: 15,
          formatter() {
            return moment.utc(this.value).format('MMM DD')
          }
        }
      },
      yAxis: {
        crosshair: false,
        min: 0,
        title: null,
        startOnTick: false,
        endOnTick: false,
        labels: {
          enabled: false
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        shape: 'square',
        animation: false,
        positioner(labelWidth, labelHeight, point) {
          let x = point.plotX + this.chart.plotLeft + 15
          let flipX = this.chart.plotWidth + this.chart.plotLeft - 15 - labelWidth
          return {
            x: x > flipX ? x - labelWidth + this.chart.plotLeft - 25 : x,
            y: 0.2 * this.chart.plotHeight
          }
        },
        shared: true,
        useHTML: true,
        shadow: false
      },
      plotOptions: {
        area: {
          marker: {
            enabled: false,
            radius: 2,
            symbol: 'circle'
          }
        },
        stickyTracking: false
      },
      series
    })

    // this.chart.yAxis[0].setExtremes(0, max)
  }

  render() {
    const {pending} = this.props
    return (
      <Plot className={pending ? 'chart-area pending' : 'chart-area'} id="plot" />
    )
  }
}

export default ChartArea
