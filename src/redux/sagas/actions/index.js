/* eslint-disable no-unused-vars */
import types from 'redux/sagas/actions/types'
import { removeAccessToken } from 'utils/accessToken'
import { removeItem } from 'utils/localstorage'
import { LS_VIEW_PREFS_SETTING, LS_CAPTCHA_VIEW_PREFS_SETTING } from 'redux/constants'

const loadProjects = (take, skip) => ({
  type: types.LOAD_PROJECTS,
  payload: { take, skip },
})

const loadMetainfo = () => ({
  type: types.LOAD_METAINFO,
})

const loadUsageinfo = () => ({
  type: types.LOAD_USAGEINFO,
})

const loadSharedProjects = (take, skip) => ({
  type: types.LOAD_SHARED_PROJECTS,
  payload: { take, skip },
})

const loadProjectsCaptcha = (take, skip) => ({
  type: types.LOAD_PROJECTS,
  payload: { take, skip, isCaptcha: true },
})

const loadExtensions = () => ({
  type: types.LOAD_EXTENSIONS,
})

const loadProjectAlerts = (take, skip) => ({
  type: types.LOAD_PROJECT_ALERTS,
  payload: { take, skip },
})

const loginAsync = (credentials, callback = () => {}) => ({
  type: types.LOGIN_ASYNC,
  payload: {
    credentials,
    callback,
  },
})

// currently only google is supported, in future we should provide a variable specifying the provider
const authSSO = (provider, dontRemember, t, callback) => ({
  type: types.AUTH_SSO,
  payload: {
    dontRemember,
    callback,
    t,
    provider,
  },
})

// currently only google is supported, in future we should provide a variable specifying the provider
const linkSSO = (t, callback, provider = 'google') => ({
  type: types.LINK_SSO,
  payload: {
    callback,
    t,
    provider,
  },
})

// currently only google is supported, in future we should provide a variable specifying the provider
const unlinkSSO = (t, callback, provider = 'google') => ({
  type: types.UNLINK_SSO,
  payload: {
    callback,
    t,
    provider,
  },
})

const signupAsync = (data, t, callback) => ({
  type: types.SIGNUP_ASYNC,
  payload: {
    data,
    callback,
    t,
  },
})

const emailVerifyAsync = (data, successfulCallback, errorCallback) => ({
  type: types.EMAIL_VERIFY_ASYNC,
  payload: { data, successfulCallback, errorCallback },
})

const updateUserProfileAsync = (data, callback = (item) => {}) => ({
  type: types.UPDATE_USER_PROFILE_ASYNC,
  payload: { data, callback },
})

const deleteAccountAsync = (errorCallback, successCallback, t) => {
  return {
    type: types.DELETE_ACCOUNT_ASYNC,
    payload: {
      errorCallback,
      successCallback,
      t,
    },
  }
}

const shareVerifyAsync = (data, successfulCallback, errorCallback) => ({
  type: types.SHARE_VERIFY_ASYNC,
  payload: { data, successfulCallback, errorCallback },
})

const logout = (basedOn401Error) => {
  removeAccessToken()
  removeItem(LS_VIEW_PREFS_SETTING)
  removeItem(LS_CAPTCHA_VIEW_PREFS_SETTING)

  return {
    type: types.LOGOUT,
    payload: { basedOn401Error },
  }
}

const updateShowLiveVisitorsInTitle = (show, callback) => ({
  type: types.UPDATE_SHOW_LIVE_VISITORS_IN_TITLE,
  payload: {
    show,
    callback,
  },
})

const sagaActions = {
  loadProjects,
  loadSharedProjects,
  loadProjectsCaptcha,
  loadExtensions,
  loadProjectAlerts,
  loginAsync,
  authSSO,
  signupAsync,
  emailVerifyAsync,
  updateUserProfileAsync,
  deleteAccountAsync,
  logout,
  shareVerifyAsync,
  linkSSO,
  unlinkSSO,
  loadMetainfo,
  loadUsageinfo,
  updateShowLiveVisitorsInTitle,
}

export default sagaActions
