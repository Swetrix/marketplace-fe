import { takeEvery, fork } from 'redux-saga/effects'
import { types as authTypes } from '../../actions/auth/types'
import { types } from '../../actions/ui/types'
import initialise from './initialise'
import logout from './logout'
import loadExtensions from './load_extensions'
import loadPublishExtensions from './load_publish_extensions'
import loadCategory from './load_category'

function* mainUISaga() {
  yield fork(initialise)
  yield takeEvery(authTypes.LOGOUT, logout)
  yield takeEvery(types.LOAD_EXTENSIONS, loadExtensions)
  yield takeEvery(types.LOAD_CATEGORY, loadCategory)
  yield takeEvery(types.LOAD_PUBLISH_EXTENSIONS, loadPublishExtensions)
}

export default mainUISaga
