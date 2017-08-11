function api(state = null, action) {
  switch (action.type) {
    case 'API': {
      if (!action.api) return state

      return /^https:\/\//.test(action.api)
        ? action.api : 'https://' + action.api.replace(/^http:\/\//, '')
    }

    default:
      return state
  }
}

export default api
