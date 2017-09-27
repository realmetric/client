import moment from 'moment'

export const setApi = (api) => ({type: 'API', api})

export const resetMetric = () => ({type: 'METRIC_RESET'})

export const resetSlice = () => ({type: 'SLICE_RESET'})

export const resetChart = () => ({type: 'CHART_RESET'})

const action4Period = (action, period) => {
  switch (period) {
    case '1D':
      return action

    case '1W':
      return {
        ...action,
        from: moment().startOf('isoweek').format('YYYY-MM-DD HH:mm:ss'),
        to: moment().format('YYYY-MM-DD HH:mm:ss'),
        prevFrom: moment().startOf('isoweek').subtract(1, 'week').format('YYYY-MM-DD HH:mm:ss'),
        prevTo: moment().endOf('isoweek').subtract(1, 'week').format('YYYY-MM-DD HH:mm:ss')
      }

    case '1M':
      return {
        ...action,
        from: moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
        to: moment().format('YYYY-MM-DD HH:mm:ss'),
        prevFrom: moment().startOf('month').subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss'),
        prevTo: moment().endOf('month').subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss')
      }

    case '6M':
      return {
        ...action,
        from: moment().subtract(6, 'month').format('YYYY-MM-DD HH:mm:ss'),
        to: moment().format('YYYY-MM-DD HH:mm:ss'),
        prevFrom: moment().subtract(12, 'month').format('YYYY-MM-DD HH:mm:ss'),
        prevTo: moment().endOf('month').subtract(6, 'month').format('YYYY-MM-DD HH:mm:ss')
      }

    default:
      return action
  }
}

export const fetchMetric = (metricId) => (dispatch, getState) => {
  const {period, intervalType} = getState().chart
  const action = {type: 'METRIC_REQUEST', intervalType, metricId}
  dispatch(action4Period(action, period))
}

export const fetchSlice = (metric_id, slice_id) => (dispatch, getState) => {
  const {period, intervalType} = getState().chart
  const action = {type: 'SLICE_REQUEST', intervalType, metric_id, slice_id}
  dispatch(action4Period(action, period))
}

export const fetchMetrics = ({slice_id} = {}) => ({type: 'METRICS_REQUEST', slice_id})

export const fetchSlices = (metricId) => ({type: 'SLICES_REQUEST', metricId})

export const loadInitialData = () => ({type: 'LOAD_INITIAL_DATA'})

export const categoryClick = (category) => ({type: 'CATEGORY_CLICK', category})

export const fetchPopularCats = (api) => (dispatch, getState) => {
  try {
    const storage = JSON.parse(localStorage.getItem(api))
    dispatch({type: 'POPULAR_CATS_SUCCESS', popularCats: storage.popularCats})
  } catch (e) {
    dispatch({type: 'POPULAR_CATS_ERROR'})
  }
}

export const updatePeriod = (period) => ({type: 'PERIOD_UPDATE', period})
