/* eslint-disable no-param-reassign */
import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { withAuthentication, auth } from 'hoc/protected'
import { authActions } from 'redux/actions/auth'
import { alertsActions } from 'redux/actions/alerts'
import UserSettings from './UserSettings'

dayjs.extend(utc)

const UserSettingsContainer = () => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    delete data.repeat
    // eslint-disable-next-line no-restricted-syntax
    for (const key in data) {
      if (data[key] === '') {
        delete data[key]
      }
    }

    dispatch(
      authActions.updateUserProfileAsync(data, () =>
        dispatch(alertsActions.accountUpdated(t('profileSettings.updated'))),
      ),
    )
  }

  return <UserSettings t={t} onSubmit={onSubmit} />
}

export default memo(withAuthentication(UserSettingsContainer, auth.authenticated))
