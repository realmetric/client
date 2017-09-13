export const setApi = (api) =>  ({type: 'API', api})

export const resetMetric = () => ({type: 'METRIC_RESET'})

export const resetSlice = () => ({type: 'SLICE_RESET'})

export const resetChart = () => ({type: 'CHART_RESET'})

export const fetchMetric = (id) => (dispatch, getState) => {
  if (getState().chart.metricId === id) {
    dispatch(resetMetric())
    dispatch(resetSlice())
  } else {
    dispatch({type: 'METRIC_REQUEST', id})
  }
}

export const fetchMetrics = ({slice_id} = {}) => ({type: 'METRICS_REQUEST', slice_id})

export const fetchSlices = (metricId) => ({type: 'SLICES_REQUEST', metricId})

export const fetchSlice = ({metric_id, slice_id, interval = 'm', from, to}) =>
  ({type: 'SLICE_REQUEST', metric_id, slice_id, interval, from, to})

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
