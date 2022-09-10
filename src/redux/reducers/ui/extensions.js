import { types } from 'redux/actions/ui/types'
import _filter from 'lodash/filter'
import _findIndex from 'lodash/findIndex'
import _map from 'lodash/map'
import { tabForInstallExtension } from 'redux/constants'
import { setItem, getItem } from 'utils/localstorage'

const getInitialState = () => {
  return {
    extensions: [],
    publishExtensions: [],
    isLoading: true,
    isLoadingPublish: true,
    error: null,
    totalMonthlyEvents: null,
    total: 0,
    publishTotal: 0,
    dashboardPaginationPage: 1,
    dashboardPaginationPagePublish: 1,
    dashboardTabs: getItem('dashboardTabs') || tabForInstallExtension,
  }
}

// eslint-disable-next-line default-param-last
const extensionsReducer = (state = getInitialState(), { type, payload }) => {
  switch (type) {
    case types.SET_EXTENSIONS: {
      const { extensions, shared = false } = payload
      if (shared) {
        return {
          ...state,
          isLoadingPublish: false,
          publishExtensions: extensions,
        }
      }

      return {
        ...state,
        extensions: [...extensions],
        isLoading: false,
      }
    }

    case types.SET_DASHBOARD_PAGINATION_PAGE: {
      const { page } = payload
      return {
        ...state,
        dashboardPaginationPage: page,
      }
    }

    case types.SET_DASHBOARD_PAGINATION_PAGE_PUBLISH: {
      const { page } = payload
      return {
        ...state,
        dashboardPaginationPagePublish: page,
      }
    }

    case types.SET_TOTAL_MONTHLY_EVENTS: {
      const { totalMonthlyEvents } = payload
      return {
        ...state,
        totalMonthlyEvents,
      }
    }

    case types.SET_TOTAL: {
      const { total, publish } = payload

      if (publish) {
        return {
          ...state,
          publishTotal: total,
        }
      }

      return {
        ...state,
        total,
      }
    }

    case types.SET_LIVE_STATS: {
      const { data, publish = false } = payload

      if (publish) {
        return {
          ...state,
          publishExtensions: _map(state.publishExtensions, res => ({
            ...res,
            project: {
              ...res.project,
              live: data[res.project.id],
            },
          })),
        }
      }

      return {
        ...state,
        extensions: _map(state.extensions, res => ({
          ...res,
          live: data[res.id],
        })),
      }
    }

    case types.SET_LIVE_STATS_PROJECT: {
      const { id, count, publish = false } = payload

      if (publish) {
        return {
          ...state,
          publishExtensions: _map(state.publishExtensions, res => {
            if (res.id === id) {
              return {
                ...res,
                live: count,
              }
            }

            return res
          }),
        }
      }

      return {
        ...state,
        extensions: _map(state.extensions, res => {
          if (res.id === id) {
            return {
              ...res,
              live: count,
            }
          }

          return res
        }),
      }
    }

    case types.SET_PUBLIC_EXTENSION: {
      const { project, publish = false } = payload

      if (publish) {
        return {
          ...state,
          publishExtensions: _findIndex(state.publishExtensions, (el) => el.id === project.id) >= 0
            ? state.publishExtensions
            : [
              ...state.publishExtensions,
              {
                ...project,
                uiHidden: true,
              },
            ],
        }
      }

      return {
        ...state,
        extensions: _findIndex(state.extensions, (el) => el.id === project.id) >= 0
          ? state.extensions
          : [
            ...state.extensions,
            {
              ...project,
              uiHidden: true,
            },
          ],
      }
    }

    case types.SET_EXTENSIONS_PUBLISH_DATA: {
      const { data, id, publish = false } = payload

      if (publish) {
        return {
          ...state,
          publishExtensions: _map(state.publishExtensions, (item) => {
            if (item.project.id === id) {
              return {
                ...item,
                ...data,
              }
            }

            return item
          }),
        }
      }

      return {
        ...state,
        extensions: _map(state.extensions, (item) => {
          if (item.id === id) {
            return {
              ...item,
              ...data,
            }
          }

          return item
        }),
      }
    }

    case types.SET_EXTENSIONS_ERROR: {
      const { error } = payload
      return {
        ...state,
        error,
      }
    }

    case types.REMOVE_PROJECT: {
      const { pid, publish = false } = payload

      if (publish) {
        return {
          ...state,
          publishExtensions: _filter(state.publishExtensions, (item) => item.project.id !== pid),
          publishTotal: state.publishTotal - 1,
        }
      }

      return {
        ...state,
        extensions: _filter(state.extensions, (project) => project.id !== pid),
        total: state.total - 1,
      }
    }

    case types.SET_EXTENSIONS_LOADING: {
      const { isLoading, publish = false } = payload
      if (publish) {
        return {
          ...state,
          isLoadingPublish: isLoading,
        }
      }
      return {
        ...state,
        isLoading,
      }
    }

    case types.SET_DASHBOARD_TABS: {
      const { tab } = payload

      setItem('dashboardTabs', tab)

      return {
        ...state,
        dashboardTabs: tab,
      }
    }

    default:
      return state
  }
}

export default extensionsReducer
