import { types } from 'redux/actions/alerts/types'

const initialState = {
  message: null,
  type: 'info',
}

// eslint-disable-next-line default-param-last
const alertsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ACCOUNT_UPDATED:
      return { ...state, message: payload.message, type: payload.type }

    case types.CLEAR_ALERTS:
      return { ...state, message: null, type: 'info' }

    default:
      return state
  }
}

export default alertsReducer
