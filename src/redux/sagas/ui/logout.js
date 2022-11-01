import { put } from 'redux-saga/effects'

import UIActions from 'redux/actions/ui'

export default function* logout() {
  yield put(UIActions.setExtensions([]))
  yield put(UIActions.setExtensions([], true))
  yield put(UIActions.setAllExtensions([], true))
  yield put(UIActions.setTotal(0))
  yield put(UIActions.setTotal(0, true))
  yield put(UIActions.deleteExtensionCache())
}
