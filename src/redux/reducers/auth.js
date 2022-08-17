import { types } from 'redux/actions/auth/types'

const initialState = {
  authenticated: false,
  loading: true,
  user: {},
  dontRemember: false,
}

// eslint-disable-next-line default-param-last
const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SIGNUP_UP_SUCCESSFUL:
    case types.LOGIN_SUCCESSFUL:
      return { ...state, user: payload.user, authenticated: true }

    case types.UPDATE_USER_PROFILE_SUCCESS:
      return { ...state, user: payload.user }

    case types.LOGOUT:
      return { ...state, authenticated: false, user: {} }

    case types.FINISH_LOADING:
      return { ...state, loading: false }

    case types.SET_DONT_REMEMBER: {
      const { dontRemember } = payload
      return { ...state, dontRemember }
    }

    case types.UPDATE_USER_DATA: {
      const { data } = payload
      return { ...state, user: { ...state.user, ...data } }
    }

    default:
      return state
  }
}

export default authReducer
