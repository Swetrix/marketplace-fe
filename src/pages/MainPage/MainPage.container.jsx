import { connect } from 'react-redux'
import UIActions from 'redux/actions/ui'
import { alertsActions } from 'redux/actions/alerts'
import { errorsActions } from 'redux/actions/errors'

import { tabForPublishExtensions } from 'redux/constants'
import MainPage from './MainPage'

const mapStateToProps = (state) => ({
  extensions: state.ui.extensions.extensions,
  categories: state.ui.extensions.category,
  publishExtensions: state.ui.extensions.publishExtensions,
  isLoading: state.ui.extensions.isLoading,
  user: state.auth.user,
  isPublishExtension: state.ui.extensions.dashboardTabs === tabForPublishExtensions,
})

const mapDispatchToProps = (dispatch) => ({
  updateExtensionFailed: (message) => {
    dispatch(errorsActions.updateExtensionFailed(message))
  },
  createNewExtensionFailed: (message) => {
    dispatch(errorsActions.createNewExtensionFailed(message))
  },
  newExtension: (message) => {
    dispatch(alertsActions.newExtension(message))
  },
  extensionDelete: (message) => {
    dispatch(alertsActions.extensionDelete(message))
  },
  deleteExtensionFailed: (message) => {
    dispatch(errorsActions.deleteExtensionFailed(message))
  },
  loadExtensions: (shared) => {
    if (shared) {
      dispatch(UIActions.loadSharedProjects())
    } else {
      dispatch(UIActions.loadExtensions())
    }
  },
  removeExtension: (pid, shared) => {
    dispatch(UIActions.removeExtension(pid, shared))
  },
  showError: (message) => {
    dispatch(errorsActions.genericError(message))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
