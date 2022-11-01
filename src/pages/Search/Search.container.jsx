import { connect } from 'react-redux'
import UIActions from 'redux/actions/ui'
import Search from './Search'

const mapStateToProps = (state) => ({
  offset: state.ui.search.offset,
  limit: state.ui.search.limit,
  category: state.ui.extensions.category,
})

const mapDispatchToProps = (dispatch) => ({
  setOffset: (offset) => {
    dispatch(UIActions.setOffset(offset))
  },
  generateError: (message) => {
    dispatch(UIActions.generateError(message))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
