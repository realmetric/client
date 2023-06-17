function api(state = null, action) {
    switch (action.type) {
        case 'API': {
            if (!action.api) {
                return state
            }
            if (/^https?:\/\//.test(action.api)) {
                return action.api
            } else {
                return 'https://' + action.api
            }
        }
        default:
            return state
    }
}

export default api
