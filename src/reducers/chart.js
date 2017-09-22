import {existy} from '../utils'
import {getMetricChart} from './metrics'
import {getSliceChart} from './slices'

function chart(state = {
  ts: 0,
  metricId: null,
  sliceId: null,
  period: '1D'
}, action) {

  switch (action.type) {
    case 'METRIC_REQUEST':
      return {...state, metricId: action.id}

    case 'SLICE_REQUEST':
      return {...state, metricId: action.metric_id, sliceId: action.slice_id}

    case 'METRICS_REQUEST':
      return {
        ...state,
        sliceId: action.slice_id
      }

    case 'METRIC_RESET':
      return {...state, metricId: null}

    case 'SLICE_RESET':
      return {...state, sliceId: null}

    case 'METRIC_SUCCESS':
    case 'SLICE_SUCCESS':
    case 'CHART_RESET':
      return {...state, ts: Date.now()}

    case 'METRIC_ERROR':
      return {...state, metricId: null}

    case 'PERIOD_UPDATE':
      return {...state, period: action.period}

    default:
      return state
  }
}

export default chart

export const getChartData = (state) => {
  const {metricId, sliceId} = state.chart
  // console.log('existy(metricId) && existy(sliceId)', existy(metricId) && existy(sliceId))
  // console.log('existy(metricId)', existy(metricId))

  return existy(metricId) && existy(sliceId)
    ? getSliceChart(state)
    : existy(metricId)
      ? getMetricChart(state)
      : []
}

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
