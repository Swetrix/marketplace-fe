import { connect } from 'react-redux'
import { errorsActions } from 'redux/actions/errors'
import UIActions from 'redux/actions/ui'
import { authActions } from 'redux/actions/auth'
import { alertsActions } from 'redux/actions/alerts'
import MyExtension from './MyExtension'

const mapStateToProps = (state) => ({
  extensions: state.ui.extensions.extensions,
  publishExtensions: state.ui.extensions.publishExtensions,
  user: state.auth.user,
  isLoading: state.ui.extensions.isLoading,
  total: state.ui.extensions.total,
  publishTotal: state.ui.extensions.publishTotal,
  error: state.ui.extensions.error,
  dashboardPaginationPage: state.ui.extensions.dashboardPaginationPage,
  dashboardPaginationPagePublish: state.ui.extensions.dashboardPaginationPagePublish,
  dashboardTabs: state.ui.extensions.dashboardTabs,
})

const mapDispatchToProps = (dispatch) => ({
  loadExtensions: (take, skip) => {
    dispatch(UIActions.loadExtensions(take, skip))
  },
  loadPublishExtensions: (take, skip) => {
    dispatch(UIActions.loadPublishExtensions(take, skip))
  },
  setDashboardPaginationPage: (page) => {
    dispatch(UIActions.setDashboardPaginationPage(page))
  },
  setDashboardPaginationPagePublish: (page) => {
    dispatch(UIActions.setDashboardPaginationPagePublish(page))
  },
  setDashboardTabs: (tab) => {
    dispatch(UIActions.setDashboardTabs(tab))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(MyExtension)
