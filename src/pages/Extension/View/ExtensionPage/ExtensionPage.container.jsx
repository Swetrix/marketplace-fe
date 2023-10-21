import { connect } from 'react-redux'
import { errorsActions } from 'redux/actions/errors'
import UIActions from 'redux/actions/ui'

import ExtensionPage from './ExtensionPage'

const mapStateToProps = (state) => ({
  extensions: state.ui.extensions.extensions,
  publishExtensions: state.ui.extensions.publishExtensions,
  installExtensions: state.ui.extensions.installExtensions,
  isLoading: state.ui.extensions.isLoading,
  authenticated: state.auth.authenticated,
  user: state.auth.user,
  comments: state.ui.extensions.comments,
})

const mapDispatchToProps = (dispatch) => ({
  showError: (message) => {
    dispatch(errorsActions.genericError(message))
  },
  setExtensions: (extensions, publish) => {
    dispatch(UIActions.setExtensions(extensions, publish))
  },
  setComments: (comments) => {
    dispatch(UIActions.setComments(comments))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ExtensionPage)
