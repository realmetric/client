import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Plot} from './Presentation'
import * as actions from '../actions'
import moment from 'moment'


class HiChart extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.ts === this.props.ts) return
    const {data} = this.props

    // console.log('series', data.series)

    this.chart = window.Highcharts.chart('plot', {
      chart: {
        type: 'column',
        margin: [0, -6, 23, -6],
        zoomType: 'x',
        panning: true,
        panKey: 'shift',
        events: {
          load() {
            // var points = []
            // this.series.forEach(function (entry) {
            //     entry.data.forEach(function (theData) {
            //         points.push(theData.y);
            //     });
            // });
            // this.yAxis[0].update({
            //   max: this.yAxis[0].getExtremes().dataMax
            // })
          },

        }
      },
      title: null,
      xAxis: {
        crosshair: true,
        type: 'datetime',
        tickLength: 5,
        labels: {
          style: {
            color: '#80868e',
            font: '10px Roboto, sans-serif',
          },
          y: 16,
          formatter() {
            if (this.isFirst || this.isLast) return ''
            return moment.utc(this.value).format('HH:mm')
          }
        }
      },
      yAxis: {
        crosshair: false,
        min: 0,
        title: null,
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
        // headerFormat: '<span>{point.key}</span><table>',
        // pointFormat: '<tr><td style="padding:0;"><span class={series.className}></span>{series.name}: </td>' +
        //     '<td style="padding:0"><b>{point.y}</b></td></tr>',
        // footerFormat: '</table>',
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
      series: data.series
    })

  }

  componentWillUnmount() {
    // const node = window.document.getElementById('plot')
    // if (node.parentNode) node.parentNode.removeChild(node)

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
