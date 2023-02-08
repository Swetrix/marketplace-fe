import { logoutApi } from 'api'
import { removeAccessToken } from 'utils/accessToken'
import { removeRefreshToken, getRefreshToken } from 'utils/refreshToken'
import { types } from './types'

export const authActions = {
  loginSuccess(user) {
    return {
      type: types.LOGIN_SUCCESSFUL,
      payload: { user },
    }
  },

  signupSuccess(user) {
    return {
      type: types.SIGNUP_UP_SUCCESSFUL,
      payload: { user },
    }
  },

  updateProfileSuccess(user) {
    return {
      type: types.UPDATE_USER_PROFILE_SUCCESS,
      payload: { user },
    }
  },

  logout() {
    const refreshToken = getRefreshToken()
    logoutApi(refreshToken)
    removeAccessToken()
    removeRefreshToken()
    return {
      type: types.LOGOUT,
    }
  },

  clearErrors() {
    return {
      type: types.CLEAR_ERRORS,
    }
  },

  setDontRemember(dontRemember) {
    return {
      type: types.SET_DONT_REMEMBER,
      payload: { dontRemember },
    }
  },

  updateUserData(data) {
    return {
      type: types.UPDATE_USER_DATA,
      payload: { data },
    }
  },

  finishLoading() {
    return {
      type: types.FINISH_LOADING,
    }
  },

  // Asynchronous
  loginAsync(credentials, callback = () => { }) {
    return {
      type: types.LOGIN_ASYNC,
      payload: {
        credentials, callback,
      },
    }
  },

  signupAsync(data, t, callback = () => { }) {
    return {
      type: types.SIGNUP_ASYNC,
      payload: {
        data, callback, t,
      },
    }
  },

  updateUserProfileAsync(data, successfulCallback = () => { }) {
    return {
      type: types.UPDATE_USER_PROFILE_ASYNC,
      payload: { data, successfulCallback },
    }
  },
}
