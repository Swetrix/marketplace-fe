import { connect } from 'react-redux'
import UIActions from 'redux/actions/ui'
import { alertsActions } from 'redux/actions/alerts'
import { errorsActions } from 'redux/actions/errors'

import { tabForPublishExtensions } from 'redux/constants'
import ProjectSettings from './ExtensionSettings'

const mapStateToProps = (state) => ({
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
    dispatch(alertsActions.extensionDeleted(message))
  },
  deleteExtensionFailed: (message) => {
    dispatch(errorsActions.deleteExtensionFailed(message))
  },
  loadExtensions: (shared) => {
    if (shared) {
      dispatch(UIActions.loadPublishExtensions())
    } else {
      dispatch(UIActions.loadInstallExtensions())
    }
    dispatch(UIActions.loadExtensions())
  },
  removeExtension: (pid, shared) => {
    dispatch(UIActions.removeExtension(pid, shared))
  },
  showError: (message) => {
    dispatch(errorsActions.genericError(message))
  },
  setPublishExtensions: (publishExtensions) => {
    dispatch(UIActions.setExtensions(publishExtensions, true))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSettings)
