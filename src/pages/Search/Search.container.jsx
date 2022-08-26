import { connect } from 'react-redux'
import { errorsActions } from 'redux/actions/errors'
import UIActions from 'redux/actions/ui'
import { authActions } from 'redux/actions/auth'
import { alertsActions } from 'redux/actions/alerts'
import Search from './Search'

const mapStateToProps = (state) => ({
  // extensions: state.ui.extensions.extensions,
})

const mapDispatchToProps = (dispatch) => ({
  // deleteExtensionFailed: (message) => {
  //   dispatch(errorsActions.deleteExtensionFailed(message))
  // },
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
