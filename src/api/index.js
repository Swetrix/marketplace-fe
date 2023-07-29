/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios'
import { store } from 'redux/store'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import Debug from 'debug'
import _isEmpty from 'lodash/isEmpty'
import _isArray from 'lodash/isArray'
import { authActions } from 'redux/actions/auth'
import _map from 'lodash/map'

import { getAccessToken, setAccessToken } from 'utils/accessToken'
import { getRefreshToken, } from 'utils/refreshToken'

const debug = Debug('swetrix:api')
const baseURL = process.env.REACT_APP_API_URL

const api = axios.create({
  baseURL,
})

const refreshAuthLogic = (failedRequest) =>
  axios
    .post(`${baseURL}v1/auth/refresh-token`, null, {
      headers: {
        Authorization: `Bearer ${getRefreshToken}`,
      },
    })
    .then((tokenRefreshResponse) => {
      const { accessToken } = tokenRefreshResponse.data
      setAccessToken(accessToken)
      // eslint-disable-next-line
      failedRequest.response.config.headers.Authorization = `Bearer ${accessToken}`
      return Promise.resolve()
    })
    .catch((error) => {
      debug('%s', error)
      store.dispatch(authActions.logout())
      return Promise.reject(error)
    })

// Instantiate the interceptor
createAuthRefreshInterceptor(api, refreshAuthLogic, {
  statusCodes: [401, 403],
})

export const logoutApi = (refreshToken) =>
  axios
    .post(`${baseURL}v1/auth/logout`, null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
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

export const authMe = () =>
  api
    .get('/user/me')
    .then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const refreshToken = () =>
  api
    .post('v1/auth/refresh-token')
    .then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const login = (credentials) =>
  api
    .post('v1/auth/login', credentials)
    .then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const signup = (data) =>
  api
    .post('v1/auth/register', data)
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

export const getInstallExtensions = (limit = 0, offset = 0) =>
  api
    .get(`/extensions/installed?limit=${limit}&offset=${offset}`)
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

export const installExtension = (extensionId, projectId = '') =>
  api
    .post(`/extensions/${extensionId}/install`, { projectId })
    .then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const deleteInstallExtension = (extensionId) =>
  api
    .delete(`/extensions/${extensionId}/uninstall`)
    .then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

		export const createComment = (userId, comment) =>
			api
			.post(`/comments?userId=${userId}`, comment)
			.then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
			})

		export const replyToComment = (commentId, text) =>
			api
			.post(`/comments/reply`, {commentId, text})
			.then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
			})

      export const deleteReply = (replyId) =>
			api
			.delete(`/comments/reply/${replyId}`)
			.then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
			})

		export const getComments = (extensionId, limit, offset, userId) =>
		api
		.get(`/comments?offset=${offset}&limit=${limit}&extensionId=${extensionId}`)
			.then((response) => response.data)
			.catch((error) => {
				debug('%s', error)
				throw _isEmpty(error.response.data?.message)
					? error.response.data
					: error.response.data.message
			})

			export const getCommentById = (commentId) =>
			api
				.get(`/comments${commentId}`)
				.then((response) => response.data)
				.catch((error) => {
					debug('%s', error)
					throw _isEmpty(error.response.data?.message)
						? error.response.data
						: error.response.data.message
				})

			export const deleteComment = (commentId) =>
			api
				.delete(`/comments/${commentId}`)
				.then((response) => response.data)
				.catch((error) => {
					debug('%s', error)
					throw _isEmpty(error.response.data?.message)
						? error.response.data
						: error.response.data.message
				})


