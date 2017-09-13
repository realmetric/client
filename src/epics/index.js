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
    .switchMap(({id}) =>
      ajax({
        url: api.metric(store.getState().api, id),
        responseType: 'json',
        headers: {
          Authorization: 'Basic ' + creds(store.getState().api)
        }
      })
      .map(({response}) => ({type: 'METRIC_SUCCESS', response}))
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
    .switchMap(({metric_id, slice_id, interval = 'm', from, to}) =>
      ajax({
        url: interval === 'm'
          ? api.sliceMinutesValues(store.getState().api, metric_id, slice_id, from, to)
          : api.sliceDaysValues(store.getState().api, metric_id, slice_id, from, to),
        responseType: 'json',
        headers: {
          Authorization: 'Basic ' + creds(store.getState().api)
        }
      })
      .map(({response}) => ({type: 'SLICE_SUCCESS', response}))
      .catch(error => Observable.of({type: 'SLICE_ERROR', error: error.xhr.response}))
    )


export const rootEpic = combineEpics(
  fetchMetric,
  fetchMetrics,
  fetchSlice,
  fetchSlices
)
