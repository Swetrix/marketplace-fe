/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios'
import { store } from 'redux/store'
import Debug from 'debug'
import _isEmpty from 'lodash/isEmpty'
import _isArray from 'lodash/isArray'
import { authActions } from 'redux/actions/auth'
import _map from 'lodash/map'

import { getAccessToken, removeAccessToken } from 'utils/accessToken'

const debug = Debug('swetrix:api')

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data.statusCode === 401) {
      removeAccessToken()
      store.dispatch(authActions.logout())
    }
    return Promise.reject(error)
  },
)

export const authMe = () =>
  api
    .get('/auth/me')
    .then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const login = (credentials) =>
  api
    .post('/auth/login', credentials)
    .then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const signup = (data) =>
  api
    .post('/auth/register', data)
    .then((response) => response.data)
    .catch((error) => {
      const errorsArray = error.response.data.message
      if (_isArray(errorsArray)) {
        throw errorsArray
      }
      throw new Error(errorsArray)
    })

export const submit2FA = (twoFactorAuthenticationCode) =>
  api
    .post('2fa/authenticate', { twoFactorAuthenticationCode })
    .then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const acceptShareProject = (id) =>
  api
    .get(`user/share/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const getExtensions = (limit = 0, offset = 0) =>
  api
    .get(`/extensions?limit=${limit}&offset=${offset}`)
    .then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const getPublishExtensions = (limit = 0, offset = 0) =>
  api
    .get(`/extensions/published?limit=${limit}&offset=${offset}`)
    .then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const createExtension = (data) =>
  api
    .post('/extensions', data)
    .then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const updateExtension = (id, data) =>
  api
    .patch(`/extensions/${id}`, data)
    .then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const deleteExtension = (id) =>
  api
    .delete(`/extensions/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const getOverallStats = (pids) =>
  api
    .get(`log/birdseye?pids=[${_map(pids, (pid) => `"${pid}"`).join(',')}]`)
    .then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const getLiveVisitors = (pids) =>
  api
    .get(`log/hb?pids=[${_map(pids, (pid) => `"${pid}"`).join(',')}]`)
    .then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const getExtensionsSearch = (term, category, sortBy, offset = 0, limit = 25) =>
  api
    .get(`/extensions/search?term=${term}&category=${category}&sortBy=${sortBy}&offset=${offset}&limit=${limit}`)
    .then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const getCategories = () =>
  api
    .get('/categories')
    .then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const confirmEmail = () =>
  api
    .post('/user/confirm_email')
    .then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const changeUserDetails = (data) =>
  api
    .put('/user', data)
    .then((response) => response.data)
    .catch((error) => {
      const errorsArray = error.response.data.message
      if (_isArray(errorsArray)) {
        throw errorsArray
      }
      throw new Error(errorsArray)
    })
