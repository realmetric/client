const metricState = {
  minutes: {
    curr: {},
    prev: {}
  },
  days: {
    curr: {},
    prev: {}
  },
  pending: false
}

export function metric(state = metricState, action) {
  switch (action.type) {
    case 'METRIC_REQUEST':
      return {...state, pending: true}

    case 'METRIC_SUCCESS': {
      const {intervalType, response} = action
      return {
        ...state,
        [intervalType]: response.values,
        ts: response.ts,
        pending: false
      }
    }

    case 'METRIC_ERROR':
      return {...state, pending: false}

    case 'METRIC_RESET':
      return metricState

    default:
      return state
  }
}

const metricsState = {
  byCategory: {},
  popularCats: {},
  pending: false
}

export function metrics(state = metricsState, action) {
  switch (action.type) {
    case 'METRICS_REQUEST':
      return {...state, pending: true}

    case 'METRICS_SUCCESS': {
      const {response} = action
      return {...state, byCategory: response.metrics, ts: response.ts, pending: false}
    }

    case 'METRICS_ERROR':
      return {...state, pending: false}

    case 'POPULAR_CATS_SUCCESS':
      return {
        ...state, popularCats: action.popularCats
      }

    case 'CATEGORY_CLICK':
      return {
        ...state,
        popularCats: {
          ...state.popularCats,
          [action.category]: (state.popularCats[action.category] || 0) + 1
        }
      }

    default:
      return state
  }
}

export const getMetricsList = ({metrics}) => {
  return metrics.byCategory
}
