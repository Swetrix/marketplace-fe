import { takeEvery, fork } from 'redux-saga/effects'
import { types as authTypes } from '../../actions/auth/types'

import initialise from './initialise'
import logout from './logout'

function* mainUISaga() {
  yield fork(initialise)
  yield takeEvery(authTypes.LOGOUT, logout)
}

export default mainUISaga
