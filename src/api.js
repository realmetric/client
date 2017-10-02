import qs from 'qs'

export const metrics = (api, slice_id) =>
  slice_id ? `${api}/metrics/slice/${slice_id}` : `${api}/metrics`

export const slices = (api, metric_id, from, to) =>
  metric_id
    ? `${api}/slices/${metric_id}?${qs.stringify({from, to}, {encode: false})}`
    : `${api}/slices`

export const metricValues = (
  api,
  intervalType, /* one of ['days', 'minutes'] */
  metric_id,
  from,
  to,
  prev_from,
  prev_to
) =>
  `${api}/values/${intervalType}${qs.stringify(
    {metric_id, from, to, prev_from, prev_to},
    {addQueryPrefix: true, encode: false}
  )}`

export const sliceValues = (
  api,
  intervalType, /* one of ['days', 'minutes'] */
  metric_id,
  slice_id,
  from,
  to,
  prev_from,
  prev_to
) =>
  `${api}/values/${intervalType}${qs.stringify(
    {metric_id, slice_id, from, to, prev_from, prev_to},
    {addQueryPrefix: true, encode: false}
  )}`
