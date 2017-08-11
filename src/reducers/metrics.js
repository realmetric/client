import moment from 'moment'
import {quantize5minPerDay} from '../utils'

export function metric(state = {
  byDate: [],
  pending: false
}, action) {

  switch (action.type) {
    case 'METRIC_REQUEST':
      return {...state, pending: true}

    case 'METRIC_SUCCESS': {
      const {response} = action
      return {...state, byDate: response.values, ts: response.ts, pending: false}
    }

    case 'METRIC_ERROR':
      return {...state, pending: false}

    default:
      return state
  }
}

export function metrics(state = {
  byCategory: {},
  pending: false
}, action) {

  switch (action.type) {
    case 'METRICS_REQUEST':
      return {...state, pending: true}

    case 'METRICS_SUCCESS': {
      const {response} = action
      return {...state, byCategory: response.metrics, ts: response.ts, pending: false}
    }

    case 'METRICS_ERROR':
      return {...state, pending: false}

    default:
      return state
  }
}

export const getMetricsList = ({metrics}) => {
  return metrics.byCategory
}

export const getMetricValues = ({metric}, date) => {
  return metric.byDate[date] || []
}

export const getMetricChart = ({metric}) => {
  const today = moment().format('YYYY-MM-DD')
  const yesterday = moment().subtract(1, 'days').startOf('day').format('YYYY-MM-DD')

  const dataToday = quantize5minPerDay(getMetricValues({metric}, today))
  const dataYesterday = quantize5minPerDay(getMetricValues({metric}, yesterday))

  // console.log('dataToday', dataToday)

  const dataPointsToday =
    Object.keys(dataToday).map(minute => ([
      moment.utc(today, 'YYYY-MM-DD').startOf('day').add(minute, 'minute').valueOf(),
      dataToday[minute]
    ]))

  const dataPointsYesterday =
    Object.keys(dataYesterday).map(minute => ([
      moment.utc(yesterday, 'YYYY-MM-DD').add(1, 'days').startOf('day').add(minute, 'minute').valueOf(),
      dataYesterday[minute]
  ]))

  return {
    series: [{
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
  }
}

