import { put, call } from 'redux-saga/effects'
import _isString from 'lodash/isString'
import Debug from 'debug'

import UIActions from 'redux/actions/ui'

import { ENTRIES_PER_PAGE_DASHBOARD } from 'redux/constants'
import {
  getInstallExtensions,
} from '../../../api'

const debug = Debug('swetrix:rx:s:load-installed-extensions')

export default function* loadInstallExtensions({ payload: { take = ENTRIES_PER_PAGE_DASHBOARD, skip = 0 } }) {
  try {
    yield put(UIActions.setExtensionsLoading(true))

    let {
      // eslint-disable-next-line prefer-const
      extensions, count,
    } = yield call(getInstallExtensions, take, skip)


    yield put(UIActions.setExtensions(extensions))
    yield put(UIActions.setTotal(count))
  } catch ({ message }) {
    if (_isString(message)) {
      yield put(UIActions.setExtensionsError(message))
    }
    debug('failed to load installed extensions: %s', message)
  }
}
