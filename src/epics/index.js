import * as api from '../api'
import {combineEpics} from 'redux-observable'
import {ajax} from 'rxjs/observable/dom/ajax'
import {Observable} from 'rxjs'

const creds = (api) => {
  const storage = localStorage.getItem(api)
  let auth = ''
  try {
    auth = storage && JSON.parse(storage).auth
  } catch (e) {}
  return window.btoa(auth)
}

const fetchMetric = (action$, store) =>
  action$.ofType('METRIC_REQUEST')
    .switchMap(({intervalType, metricId, from, to, prevFrom, prevTo}) =>
      ajax({
        url: api.metricValues(store.getState().api, intervalType, metricId, from, to, prevFrom, prevTo),
        responseType: 'json',
        headers: {
          Authorization: 'Basic ' + creds(store.getState().api)
        }
      })
      .map(({response}) => ({type: 'METRIC_SUCCESS', intervalType, response}))
      .catch(error => Observable.of({type: 'METRIC_ERROR', error: error.xhr.response}))
    )

const fetchMetrics = (action$, store) =>
  action$.ofType('METRICS_REQUEST')
    .switchMap(({slice_id}) =>
      ajax({
        url: api.metrics(store.getState().api, slice_id),
        responseType: 'json',
        headers: {
          Authorization: 'Basic ' + creds(store.getState().api)
        }
      })
      .map(({response}) => ({type: 'METRICS_SUCCESS', response}))
      .catch(error => Observable.of({type: 'METRICS_ERROR', error: error.xhr.response}))
    )

const fetchSlices = (action$, store) =>
  action$.ofType('SLICES_REQUEST')
    .switchMap(({metricId}) =>
      ajax({
        url: api.slices(store.getState().api, metricId),
        responseType: 'json',
        headers: {
          Authorization: 'Basic ' + creds(store.getState().api)
        }
      })
      .map(({response}) => ({type: 'SLICES_SUCCESS', response}))
      .catch(error => Observable.of({type: 'SLICES_ERROR', error: error.xhr.response}))
    )

const fetchSlice = (action$, store) =>
  action$.ofType('SLICE_REQUEST')
    .switchMap(({intervalType, metric_id, slice_id, from, to, prevFrom, prevTo}) =>
      ajax({
        url: api.sliceValues(store.getState().api, intervalType, metric_id, slice_id, from, to, prevFrom, prevTo),
        responseType: 'json',
        headers: {
          Authorization: 'Basic ' + creds(store.getState().api)
        }
      })
      .map(({response}) => ({type: 'SLICE_SUCCESS', intervalType, response}))
      .catch(error => Observable.of({type: 'SLICE_ERROR', error: error.xhr.response}))
    )


export const rootEpic = combineEpics(
  fetchMetric,
  fetchMetrics,
  fetchSlice,
  fetchSlices
)
