import { takeLatest, all, call } from 'redux-saga/effects'
import { types } from 'redux/actions/auth/types'
import signIn from 'redux/sagas/auth/workers/signin'
import signUp from 'redux/sagas/auth/workers/signup'
import updateUserProfile from 'redux/sagas/auth/workers/updateUserProfile'

function* watchLogin() {
  yield takeLatest(types.LOGIN_ASYNC, signIn)
}

function* watchSignup() {
  yield takeLatest(types.SIGNUP_ASYNC, signUp)
}

function* watchUpdateUserProfile() {
  yield takeLatest(types.UPDATE_USER_PROFILE_ASYNC, updateUserProfile)
}

export default function* watchAuth() {
  yield all([
    call(watchLogin), call(watchSignup), call(watchUpdateUserProfile),
  ])
}
