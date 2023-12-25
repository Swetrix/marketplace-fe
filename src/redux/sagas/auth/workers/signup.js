import { call, put } from 'redux-saga/effects'
import { authActions } from 'redux/actions/auth'
import { errorsActions } from 'redux/actions/errors'

import _omit from 'lodash/omit'
import UIActions from 'redux/actions/ui'
import { setAccessToken } from 'utils/accessToken'
import { setRefreshToken } from 'utils/refreshToken'
import { signup } from 'api'

export default function* signupWorder({ payload: { data: rawData, callback, t } }) {
  try {
    const { repeat, ...data } = rawData
    const { dontRemember } = data
    const {
      user,
      accessToken,
      refreshToken, // theme,
    } = yield call(signup, _omit(data, ['dontRemember']))

    yield put(authActions.signupSuccess(user))
    yield call(setAccessToken, accessToken, dontRemember)
    yield call(setRefreshToken, refreshToken)
    yield put(authActions.setDontRemember(dontRemember))
    yield put(UIActions.loadExtensions())
    yield put(UIActions.loadInstallExtensions())
    yield put(UIActions.loadPublishExtensions())
    callback(true)
  } catch (error) {
    const message = error.message || (typeof error === 'string' ? error : error[0])
    yield put(errorsActions.signupFailed(message || 'apiNotifications.somethingWentWrong'))
    callback(false)
  } finally {
    yield put(authActions.finishLoading())
  }
}
