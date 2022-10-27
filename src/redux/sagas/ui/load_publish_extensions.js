import { put, call } from 'redux-saga/effects'
import _map from 'lodash/map'
import _isString from 'lodash/isString'
import Debug from 'debug'

import UIActions from 'redux/actions/ui'

import { ENTRIES_PER_PAGE_DASHBOARD } from 'redux/constants'
import {
  getPublishExtensions,
} from '../../../api'

const debug = Debug('swetrix:rx:s:load-projects')

export default function* loadPublishExtensions({ payload: { take = ENTRIES_PER_PAGE_DASHBOARD, skip = 0 } }) {
  try {
    yield put(UIActions.setExtensionsLoading(true, true))

    let {
      // eslint-disable-next-line prefer-const
      extensions, count,
    } = yield call(getPublishExtensions, take, skip)
    console.log(extensions)
    extensions = _map(extensions, (extension) => {
      return {
        ...extension,
        project: {
          ...extension.project,
        },
      }
    })

    yield put(UIActions.setExtensions(extensions, true))
    yield put(UIActions.setTotal(count, true))
  } catch ({ message }) {
    if (_isString(message)) {
      yield put(UIActions.setExtensionsError(message))
    }
    debug('failed to load projects: %s', message)
  }
}
