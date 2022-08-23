import { types } from './types'

const loadExtensions = (take, skip) => ({
  type: types.LOAD_EXTENSIONS,
  payload: { take, skip },
})

const loadPublishExtensions = (take, skip) => ({
  type: types.LOAD_PUBLISH_EXTENSIONS,
  payload: { take, skip },
})

const setExtensions = (Extensions, publish) => ({
  type: types.SET_EXTENSIONS,
  payload: {
    Extensions,
    publish,
  },
})

const setTotalMonthlyEvents = (totalMonthlyEvents) => ({
  type: types.SET_TOTAL_MONTHLY_EVENTS,
  payload: {
    totalMonthlyEvents,
  },
})

const setTotal = (total, publish) => ({
  type: types.SET_TOTAL,
  payload: {
    total,
    publish,
  },
})

const setDashboardPaginationPage = (page) => ({
  type: types.SET_DASHBOARD_PAGINATION_PAGE,
  payload: {
    page,
  },
})

const setDashboardPaginationPagePublish = (page) => ({
  type: types.SET_DASHBOARD_PAGINATION_PAGE_PUBLISH,
  payload: {
    page,
  },
})

const setShowNoEventsLeftBanner = (showNoEventsLeftBanner) => ({
  type: types.SET_SHOW_NO_EVENTS_LEFT,
  payload: {
    showNoEventsLeftBanner,
  },
})

const setLiveStats = (data, publish) => ({
  type: types.SET_LIVE_STATS,
  payload: {
    data,
    publish,
  },
})

const setLiveStatsForExtension = (id, count, publish) => ({
  type: types.SET_LIVE_STATS_EXTENSION,
  payload: {
    id, count, publish,
  },
})

const setPublicExtension = (extension, publish) => ({
  type: types.SET_PUBLIC_EXTENSION,
  payload: {
    extension,
    publish,
  },
})

const removeExtension = (pid, publish) => ({
  type: types.REMOVE_EXTENSION,
  payload: {
    pid,
    publish,
  },
})

const setExtensionsError = (error) => ({
  type: types.SET_EXTENSIONS_ERROR,
  payload: {
    error,
  },
})

const setExtensionsLoading = (isLoading, publish) => ({
  type: types.SET_EXTENSIONS_LOADING,
  payload: {
    isLoading,
    publish,
  },
})

const setExtensionCache = (pid, data, key) => ({
  type: types.SET_EXTENSION_CACHE,
  payload: {
    pid, data, key,
  },
})

const deleteExtensionCache = (pid, period, timeBucket) => ({
  type: types.DELETE_EXTENSION_CACHE,
  payload: {
    pid, period, timeBucket,
  },
})

const setExtensionViewPrefs = (pid, period, timeBucket, rangeDate) => ({
  type: types.SET_EXTENSION_VIEW_PREFS,
  payload: {
    pid, period, timeBucket, rangeDate,
  },
})

const setTheme = (theme) => ({
  type: types.SET_THEME,
  payload: {
    theme,
  },
})

const setGeneralStats = (stats) => ({
  type: types.SET_GENERAL_STATS,
  payload: {
    stats,
  },
})

const setPaddleLastEvent = (event) => ({
  type: types.SET_PADDLE_LAST_EVENT,
  payload: {
    event,
  },
})

const setExtensionsPublishData = (data, id, publish) => ({
  type: types.SET_EXTENSIONS_PUBLISH_DATA,
  payload: {
    data,
    id,
    publish,
  },
})

const shareVerifyAsync = (data, successfulCallback, errorCallback) => ({
  type: types.SHARE_VERIFY_ASYNC,
  payload: { data, successfulCallback, errorCallback },
})

const setDashboardTabs = (tab) => ({
  type: types.SET_DASHBOARD_TABS,
  payload: { tab },
})

const UIActions = {
  loadExtensions,
  loadPublishExtensions,
  setExtensions,
  setExtensionsError,
  setExtensionsLoading,
  removeExtension,
  setExtensionCache,
  deleteExtensionCache,
  setExtensionViewPrefs,
  setPublicExtension,
  setLiveStatsForExtension,
  setLiveStats,
  setTheme,
  setGeneralStats,
  setPaddleLastEvent,
  setTotalMonthlyEvents,
  setDashboardPaginationPage,
  setDashboardPaginationPagePublish,
  setTotal,
  setShowNoEventsLeftBanner,
  setExtensionsPublishData,
  shareVerifyAsync,
  setDashboardTabs,
}

export default UIActions
