import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import {createEpicMiddleware} from 'redux-observable'
import appReducer from './reducers'
import {rootEpic} from './epics'

const log = store => next => action => {
  console.group(action.type)
  console.log('Dispatching', action)
  const result = next(action)
  console.info(store.getState())
  console.groupEnd(action.type)
  return result
}

const epicMiddleware = createEpicMiddleware(rootEpic)

const middlewares = [thunk, epicMiddleware]

export default () =>
  process.env.NODE_ENV !== 'production'
    ? createStore(appReducer, applyMiddleware(...middlewares, log))
    : createStore(appReducer, applyMiddleware(...middlewares))
