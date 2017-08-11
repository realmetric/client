import qs from 'qs'

export const metrics = (api, slice_id) => slice_id ?
  `${api}/metrics/slice/${slice_id}` :
  `${api}/metrics`

export const metric = (api, id) => `${api}/metrics/${id}`

export const slices = (api, metric_id, from, to) => metric_id ?
  `${api}/slices/${metric_id}?${qs.stringify({from, to}, {encode: false})}` :
  `${api}/slices`

export const sliceMinutesValues = (api, metric_id, slice_id, from, to) =>
  `${api}/values/minutes?${qs.stringify({metric_id, slice_id, from, to}, {encode: false})}`

export const sliceDaysValues = (api, metric_id, slice_id, from, to) =>
  `${api}/values/days?${qs.stringify({metric_id, slice_id, from, to}, {encode: false})}`
