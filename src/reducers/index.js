import {combineReducers} from 'redux'
import api from './api'
import chart from './chart'
import {slice, slices} from './slices'
import {metric, metrics} from './metrics'

export default combineReducers({
  api,
  chart,
  metric,
  metrics,
  slice,
  slices
})
