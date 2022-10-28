import { put, call } from 'redux-saga/effects'
import _map from 'lodash/map'
import _isString from 'lodash/isString'
import Debug from 'debug'

import UIActions from 'redux/actions/ui'

import { ENTRIES_PER_PAGE_DASHBOARD } from 'redux/constants'
import {
  getExtensions,
} from '../../../api'

const debug = Debug('swetrix:rx:s:load-extensions')

export default function* loadExtensions({ payload: { take = ENTRIES_PER_PAGE_DASHBOARD, skip = 0 } }) {
  try {
    yield put(UIActions.setAllExtensionsLoading(true))

    let {
      // eslint-disable-next-line prefer-const
      extensions, count,
    } = yield call(getExtensions, take, skip)
  
    extensions = _map(extensions, res => ({
      ...res,
    }))

    yield put(UIActions.setAllExtensions(extensions))
    yield put(UIActions.setAllTotal(count))
  } catch ({ message }) {
    if (_isString(message)) {
      yield put(UIActions.setExtensionsError(message))
    }
    debug('failed to load extensions: %s', message)
  }
}
