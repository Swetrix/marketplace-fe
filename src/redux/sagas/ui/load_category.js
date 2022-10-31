import { put, call } from 'redux-saga/effects'
import _isString from 'lodash/isString'
import Debug from 'debug'

import UIActions from 'redux/actions/ui'

import {
  getCategories,
} from '../../../api'

const debug = Debug('swetrix:rx:s:load-category')

export default function* loadCategory() {
  try {
    const result = yield call(getCategories)

    yield put(UIActions.setCategory(result.categories))
  } catch ({ message }) {
    if (_isString(message)) {
      yield put(UIActions.setExtensionsError(message))
    }
    debug('failed to load category: %s', message)
  }
}
