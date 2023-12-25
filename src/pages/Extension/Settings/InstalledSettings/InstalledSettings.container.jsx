import { connect } from 'react-redux'
import UIActions from 'redux/actions/ui'
import { errorsActions } from 'redux/actions/errors'
import InstalledSettings from './InstalledSettings'

const mapStateToProps = (state) => ({
  extensions: state.ui.extensions.extensions,
})

const mapDispatchToProps = (dispatch) => ({
  setInstallExtensions: (installExtensions) => {
    dispatch(UIActions.setExtensions(installExtensions, false))
  },
  generateError: (message) => {
    dispatch(errorsActions.genericError(message))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(InstalledSettings)
