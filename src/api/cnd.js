/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios'
import Debug from 'debug'
import _isEmpty from 'lodash/isEmpty'

const debug = Debug('swetrix:api')

const api = axios.create({
  baseURL: process.env.REACT_APP_CDN_API_URL,
})

const token = process.env.REACT_APP_CDN_API_TOKEN

export const uploadFile = (file) =>
  api
    .post('/file', file)
    .then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const deleteFile = (file) =>
  api
    .delete(`/file/${file}`, { token })
    .then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })
