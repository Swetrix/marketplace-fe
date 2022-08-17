import React, {
  useEffect, lazy, Suspense, useState,
} from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from 'routes'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from '@blaumaus/react-alert'

import Header from 'components/Header'
import Footer from 'components/Footer'
import Loader from 'ui/Loader'

import ScrollToTop from 'hoc/ScrollToTop'
import { getAccessToken } from 'utils/accessToken'
import { authActions } from 'redux/actions/auth'
import { errorsActions } from 'redux/actions/errors'
import { alertsActions } from 'redux/actions/alerts'
import { authMe } from './api'

const MainPage = lazy(() => import('pages/MainPage'))
const SignUp = lazy(() => import('pages/Auth/Signup'))
const SignIn = lazy(() => import('pages/Auth/Signin'))
const NotFound = lazy(() => import('pages/NotFound'))

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
    <div className='bg-gray-50 dark:bg-gray-800 min-h-page'>
      {showLoader && (
        <Loader />
      )}
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const { loading, authenticated } = useSelector(state => state.auth)
  const { theme } = useSelector(state => state.ui.theme)
  const { error } = useSelector(state => state.errors)
  const { message, type } = useSelector(state => state.alerts)
  const accessToken = getAccessToken()

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
      if (accessToken && !authenticated) {
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

  return (
    (!accessToken || !loading) && (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <Suspense fallback={<></>}>
        <Header />
        <ScrollToTop>
          <Suspense fallback={<Fallback theme={theme} />}>
            <Switch>
              <Route path={routes.main} component={MainPage} exact />
              <Route path={routes.signin} component={SignIn} exact />
              <Route path={routes.signup} component={SignUp} exact />
              <Route path='*' component={NotFound} />
            </Switch>
          </Suspense>
        </ScrollToTop>
        <Footer />
      </Suspense>
    )
  )
}

export default App
