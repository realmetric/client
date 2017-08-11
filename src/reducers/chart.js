import {existy} from '../utils'
import {getMetricChart} from './metrics'
import {getSliceChart} from './slices'

function chart(state = {
  ts: 0,
  metricId: null,
  sliceId: null
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
