import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import configureStore from './store'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/mergeMap'
require('smoothscroll-polyfill').polyfill()

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

window.onbeforeunload = () => {
  const {api, metrics} = store.getState()
  let storage = {}

  try {
    storage = JSON.parse(localStorage.getItem(api))
  } catch (e) {}

  if (api) {
    localStorage.setItem(
      api,
      JSON.stringify({
        ...storage, popularCats: metrics.popularCats
      })
    )
  }
}

registerServiceWorker()
