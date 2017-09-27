import {existy, quantize5minPerDay} from '../utils'
import {intervalTypes} from '../constants'
import moment from 'moment'

function chart(state = {
  ts: 0,
  metricId: null,
  sliceId: null,
  intervalType: 'minutes',
  period: '1D'
}, action) {

  switch (action.type) {
    case 'METRIC_REQUEST':
      return {...state, metricId: action.metricId}

    case 'SLICE_REQUEST':
      return {...state, metricId: action.metric_id, sliceId: action.slice_id}

    case 'METRICS_REQUEST':
      return {...state, sliceId: action.slice_id}

    case 'METRIC_RESET':
      return {...state, metricId: null, ts: Date.now()}

    case 'SLICE_RESET':
      return {...state, sliceId: null, ts: Date.now()}

    case 'METRIC_SUCCESS':
    case 'SLICE_SUCCESS':
    case 'CHART_RESET':
      return {...state, ts: Date.now()}

    case 'METRIC_ERROR':
      return {...state, metricId: null}

    case 'PERIOD_UPDATE':
      return {...state, period: action.period, intervalType: intervalTypes[action.period]}

    default:
      return state
  }
}

export default chart

export const isChartPending = ({chart: {metricId, sliceId}, slice, metric}) =>
  existy(metricId) && existy(sliceId)
    ? slice.pending
    : existy(metricId)
      ? metric.pending
      : false

export const getMetricName = ({chart, metrics}) => {
  const {metricId} = chart
  return (
    Object.values(metrics.byCategory)
      .reduce((flat, next) => [...flat, ...next], [])
      .find(metric => metric.id === metricId) || {name: ''}
  ).name
}

export const getSliceName = ({chart, slices}) => {
  const {metricId, sliceId} = chart
  if (!existy(metricId) || !existy(sliceId)) return ''

  const slice = Object.keys(slices.byCategory)
    .reduce((flat, next) => [
      ...flat,
      ...slices.byCategory[next].map(slice => ({...slice, category: next}))
    ], [])
    .find(slice => slice.id === sliceId)

  return slice ? slice.category + ':' + slice.name : ''
}

export const getChart = (state, kind = 'metric') => {
  const report = state[kind]
  const chart = state.chart

  switch (chart.period) {
    case '1D': {
      const today = moment().format('YYYY-MM-DD')
      const yesterday = moment().subtract(1, 'days').startOf('day').format('YYYY-MM-DD')
      const todayVals = report[chart.intervalType].curr[today]
      const yesterdayVals = report[chart.intervalType].prev[yesterday]

      const dataYesterday = quantize5minPerDay(yesterdayVals)
      const dataPointsYesterday =
        Object.keys(dataYesterday).map(minute => ([
          moment.utc(yesterday, 'YYYY-MM-DD').add(1, 'days').startOf('day').add(minute, 'minute').valueOf(),
          dataYesterday[minute]
      ]))

      const dataToday = quantize5minPerDay(todayVals)
      const dataPointsToday =
        Object.keys(dataToday).map(minute => ([
          moment.utc(today, 'YYYY-MM-DD').startOf('day').add(minute, 'minute').valueOf(),
          dataToday[minute]
        ]))

      const series = [{
        name: 'yesterday',
        className: 'yesterday',
        data: dataPointsYesterday,
        animation: {
          duration: 200
        }
      }, {
        name: 'today',
        className: 'today',
        data: dataPointsToday,
        animation: {
          duration: 200
        }
      }]

      return {series}
    }

    case '1W': {
      return {
        series: [{
          name: 'prev',
          type: 'area',
          className: 'prevArea',
          data: Object.keys(report[chart.intervalType].prev)
            .sort((a, b) =>
              moment.utc(a, 'YYYY-MM-DD').valueOf() - moment.utc(b, 'YYYY-MM-DD').valueOf()
            )
            .map(date => [
              moment.utc(date, 'YYYY-MM-DD').add(1, 'week').valueOf(),
              report[chart.intervalType].prev[date]
            ]),
          animation: false
        }, {
          name: 'curr',
          type: 'area',
          className: 'currArea',
          data: Object.keys(report[chart.intervalType].curr)
            .sort((a, b) =>
              moment.utc(a, 'YYYY-MM-DD').valueOf() - moment.utc(b, 'YYYY-MM-DD').valueOf()
            )
            .map(date => [
              moment.utc(date, 'YYYY-MM-DD').valueOf(),
              report[chart.intervalType].curr[date]
            ]),
          animation: false
        }]
      }
    }

    case '1M': {
      return {
        series: [{
          name: 'prev',
          type: 'area',
          className: 'prevArea',
          data: Object.keys(report[chart.intervalType].prev)
            .sort((a, b) =>
              moment.utc(a, 'YYYY-MM-DD').valueOf() - moment.utc(b, 'YYYY-MM-DD').valueOf()
            )
            .map(date => [
              moment.utc(date, 'YYYY-MM-DD').add(1, 'month').valueOf(),
              report[chart.intervalType].prev[date]
            ]),
          animation: false
        }, {
          name: 'curr',
          type: 'area',
          className: 'currArea',
          data: Object.keys(report[chart.intervalType].curr)
            .sort((a, b) =>
              moment.utc(a, 'YYYY-MM-DD').valueOf() - moment.utc(b, 'YYYY-MM-DD').valueOf()
            )
            .map(date => [
              moment.utc(date, 'YYYY-MM-DD').valueOf(),
              report[chart.intervalType].curr[date]
            ]),
          animation: false
        }]
      }
    }

    case '6M': {
      return {
        series: [{
          name: 'prev',
          className: 'prevArea',
          data: Object.keys(report[chart.intervalType].prev)
            .sort((a, b) =>
              moment.utc(a, 'YYYY-MM-DD').valueOf() - moment.utc(b, 'YYYY-MM-DD').valueOf()
            )
            .map(date => [
              moment.utc(date, 'YYYY-MM-DD').add(6, 'month').valueOf(),
              report[chart.intervalType].prev[date]
            ]),
          animation: false
        }, {
          name: 'curr',
          className: 'currArea',
          data: Object.keys(report[chart.intervalType].curr)
            .sort((a, b) =>
              moment.utc(a, 'YYYY-MM-DD').valueOf() - moment.utc(b, 'YYYY-MM-DD').valueOf()
            )
            .map(date => [
              moment.utc(date, 'YYYY-MM-DD').valueOf(),
              report[chart.intervalType].curr[date]
            ]),
          animation: false
        }]
      }
    }

    default:
      return {
        series: []
      }
  }
}

export const getChartData = (state) => {
  const {metricId, sliceId} = state.chart

  return existy(metricId) && existy(sliceId)
    ? getChart(state, 'slice')
    : existy(metricId)
      ? getChart(state, 'metric')
      : {
          series: [{
            name: 'prev',
            data: []
          }, {
            name: 'curr',
            data: []
          }]
        }
}
