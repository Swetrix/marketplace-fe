import { connect } from 'react-redux'
import UIActions from 'redux/actions/ui'
import Dashboard from './Dashboard'

const mapStateToProps = (state) => ({
  extensions: state.ui.extensions.installExtensions,
  publishExtensions: state.ui.extensions.publishExtensions,
  user: state.auth.user,
  isLoading: state.ui.extensions.isLoadingInstall,
  isLoadingPublish: state.ui.extensions.isLoadingPublish,
  total: state.ui.extensions.installTotal,
  publishTotal: state.ui.extensions.publishTotal,
  error: state.ui.extensions.error,
  dashboardPaginationPage: state.ui.extensions.dashboardPaginationPage,
  dashboardPaginationPagePublish: state.ui.extensions.dashboardPaginationPagePublish,
  dashboardTabs: state.ui.extensions.dashboardTabs,
})

const mapDispatchToProps = (dispatch) => ({
  loadExtensions: (take, skip) => {
    dispatch(UIActions.loadInstallExtensions(take, skip))
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
