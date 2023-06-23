import React, {
  useEffect, lazy, Suspense, useState,
} from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import routes from 'routes'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from '@blaumaus/react-alert'

import Header from 'components/Header'
import Footer from 'components/Footer'
import Loader from 'ui/Loader'

import ScrollToTop from 'hoc/ScrollToTop'
import { getAccessToken } from 'utils/accessToken'
import { getRefreshToken } from 'utils/refreshToken'
import { authActions } from 'redux/actions/auth'
import { errorsActions } from 'redux/actions/errors'
import { alertsActions } from 'redux/actions/alerts'
import _some from 'lodash/some'
import _includes from 'lodash/includes'
import { authMe } from './api'

const MainPage = lazy(() => import('pages/MainPage'))
const SignUp = lazy(() => import('pages/Auth/Signup'))
const SignIn = lazy(() => import('pages/Auth/Signin'))
const NotFound = lazy(() => import('pages/NotFound'))
const Dashboard = lazy(() => import('pages/Dashboard'))
const Search = lazy(() => import('pages/Search'))
const ProjectSettings = lazy(() => import('pages/Extension/Settings'))
const ExtensionPage = lazy(() => import('pages/Extension/View/ExtensionPage'))
const UserSettings = lazy(() => import('pages/UserSettings'))
const Checklist = lazy(() => import('pages/Checklist'))
const InstalledExtensionSettings = lazy(() => import('./pages/Extension/Settings/InstalledSettings'))
const minimalFooterPages = [
  '/projects', '/dashboard', '/settings', '/contact',
]

const Fallback = () => {
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    let isMounted = true

    setTimeout(() => {
      if (isMounted) {
        setShowLoader(true)
      }
    }, 1000)

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className='bg-gray-50 dark:bg-slate-900 min-h-page'>
      {showLoader && (
        <Loader />
      )}
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const location = useLocation()
  const { loading, authenticated } = useSelector(state => state.auth)
  const { theme } = useSelector(state => state.ui.theme)
  const { error } = useSelector(state => state.errors)
  const { message, type } = useSelector(state => state.alerts)
  const accessToken = getAccessToken()
  const refreshToken = getRefreshToken()

  useEffect(() => {
    const loaderEl = document.getElementById('loader')

    if (loaderEl) {
      loaderEl.classList.add('available')
      setTimeout(() => {
        loaderEl.outerHTML = ''
      }, 1000)
    }
  }, [])

  useEffect(() => {
    (async () => {
      if ((accessToken && refreshToken) && !authenticated) {
        try {
          const me = await authMe()
          dispatch(authActions.loginSuccess(me))
          dispatch(authActions.finishLoading())
        } catch (e) {
          dispatch(authActions.logout())
        }
      }
    })()
  }, [authenticated]) // eslint-disable-line

  useEffect(() => {
    if (error) {
      alert.error(error.toString(), {
        onClose: () => {
          dispatch(errorsActions.clearErrors())
        },
      })
    }
  }, [error]) // eslint-disable-line

  useEffect(() => {
    if (message && type) {
      alert.show(message.toString(), {
        type,
        onClose: () => {
          dispatch(alertsActions.clearAlerts())
        },
      })
    }
  }, [message, type]) // eslint-disable-line

  const isMinimalFooter = _some(minimalFooterPages, (page) => _includes(location.pathname, page))

  return (
    (!accessToken || !loading) && (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <Suspense fallback={<></>}>
        <Header authenticated={authenticated} theme={theme} />
        <ScrollToTop>
          <Suspense fallback={<Fallback theme={theme} />}>
            <Switch>
              <Route path={routes.main} component={MainPage} exact />
              <Route path={routes.signin} component={SignIn} exact />
              <Route path={routes.signup} component={SignUp} exact />
              <Route path={routes.user_settings} component={UserSettings} exact />
              <Route path={routes.dashboard} component={Dashboard} exact />
              <Route path={routes.search} component={Search} exact />
              <Route path={routes.checklist} component={Checklist} exact />
              <Route
                path={routes.new_extension}
                component={ProjectSettings}
                exact
              />
              <Route
                path={routes.extension_settings}
                component={ProjectSettings}
                exact
              />
              <Route
                path={routes.view_extensions}
                component={ExtensionPage}
                exact
              />
              <Route
                path={routes.installed_extension_settings}
                component={InstalledExtensionSettings}
                exact
              />
              <Route path='*' component={NotFound} />
            </Switch>
          </Suspense>
        </ScrollToTop>
        <Footer minimal={isMinimalFooter} authenticated={authenticated} />
      </Suspense>
    )
  )
}

export default App
