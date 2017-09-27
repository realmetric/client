const sliceState = {
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

export function slice(state = sliceState, action) {
  switch (action.type) {
    case 'SLICE_REQUEST':
      return {...state, pending: true}

    case 'SLICE_SUCCESS': {
      const {intervalType, response} = action
      return {
        ...state,
        [intervalType]: response.values,
        ts: response.ts,
        pending: false
      }
    }

    case 'SLICE_ERROR':
      return {...state, pending: false}

    case 'SLICE_RESET':
      return sliceState

    default:
      return state
  }
}

const slicesState = {
  byCategory: {},
  pending: false
}

export function slices(state = slicesState, action) {
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
