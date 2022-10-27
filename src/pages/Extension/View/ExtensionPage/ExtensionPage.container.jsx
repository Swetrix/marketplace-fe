import { connect } from 'react-redux'
import { errorsActions } from 'redux/actions/errors'
import UIActions from 'redux/actions/ui'

import ExtensionPage from './ExtensionPage'

const mapStateToProps = (state) => ({
  extensions: state.ui.extensions.extensions,
  installExtensions: state.ui.extensions.installExtensions,
  isLoading: state.ui.extensions.isLoading,
  authenticated: state.auth.authenticated,
  user: state.auth.user,
})

const mapDispatchToProps = (dispatch) => ({
  showError: (message) => {
    dispatch(errorsActions.genericError(message))
  },
  setExtensions: (extensions, publish) => {
    dispatch(UIActions.setExtensions(extensions, publish))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ExtensionPage)
