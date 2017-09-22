import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Plot} from './Presentation'
import * as actions from '../actions'
import moment from 'moment'


class HiChart extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.ts === this.props.ts) return
    const {data: {series}} = this.props
    if (!series) return
    const xs0 = series[0].data.reduce((xs, point) => [...xs, point[1]], [])
    const xs1 = series[1].data.reduce((xs, point) => [...xs, point[1]], [])
    const xs = [...xs0, ...xs1]
    const max = Math.max(...xs)

    this.chart = window.Highcharts.chart('plot', {
      chart: {
        type: 'column',
        margin: [-1, -5, 21, 0],
        zoomType: 'xy'
      },
      title: null,
      xAxis: {
        crosshair: true,
        type: 'datetime',
        tickLength: 4,
        startOnTick: true,
        minPadding: 0,
        endOnTick: true,
        maxPadding: 0,
        labels: {
          y: 15,
          formatter() {
            if (this.isFirst || this.isLast) return ''
            return moment.utc(this.value).format('HH:mm')
          }
        },
        plotLines:[{
          value: (new Date()).getTime()-((new Date()).getTimezoneOffset()*60*1000)
        }]
      },
      yAxis: {
        crosshair: false,
        min: 0,
        title: null,
        startOnTick: false,
        endOnTick: false,
        labels: {
          enabled:false
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
        column: {
          grouping: false,
          pointPadding: 0,
          groupPadding: 0
        },
        stickyTracking: false
      },
      series
    })

    this.chart.yAxis[0].setExtremes(0, max)
  }

  render() {
    const {pending} = this.props
    return (
      <Plot className={pending ? 'pending' : ''} id="plot" />
    )
  }
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, actions)(HiChart)
