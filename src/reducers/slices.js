import moment from 'moment'
import {quantize5minPerDay} from '../utils'

export function slice(state = {
  byDate: [],
  pending: false
}, action) {

  switch (action.type) {
    case 'SLICE_REQUEST':
      return {...state, pending: true}

    case 'SLICE_SUCCESS': {
      const {response} = action
      return {...state, byDate: response.values, ts: response.ts, pending: false}
    }

    case 'SLICE_ERROR':
      return {...state, pending: false}

    default:
      return state
  }
}

export function slices(state = {
  byCategory: {},
  pending: false
}, action) {

  switch (action.type) {
    case 'SLICES_REQUEST':
      return {...state, pending: true}

    case 'SLICES_SUCCESS':
      return {...state, byCategory: action.response.slices, pending: false}

    case 'SLICES_ERROR':
      return {...state, pending: false}

    default:
      return state
  }
}

export const getSlicesList = ({slices}) => slices.byCategory

export const getSliceValues = ({slice}, date) => {
  return slice.byDate[date] || []
}

export const getSliceChart = ({slice}) => {
  const today = moment().format('YYYY-MM-DD')
  const yesterday = moment().subtract(1, 'days').startOf('day').format('YYYY-MM-DD')

  const dataToday = quantize5minPerDay(getSliceValues({slice}, today))
  const dataYesterday = quantize5minPerDay(getSliceValues({slice}, yesterday))

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
