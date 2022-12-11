/* eslint-disable react/forbid-prop-types */
import React, {
  memo, useState, useMemo, useEffect,
} from 'react'
import { Link, useHistory } from 'react-router-dom'
import cx from 'clsx'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import _isEmpty from 'lodash/isEmpty'
import _replace from 'lodash/replace'
import _map from 'lodash/map'
import _filter from 'lodash/filter'
import _ceil from 'lodash/ceil'
import { useTranslation } from 'react-i18next'
import { CalendarIcon, FolderAddIcon, CogIcon } from '@heroicons/react/outline'
import { XCircleIcon } from '@heroicons/react/solid'


import Modal from 'ui/Modal'
import { withAuthentication, auth } from 'hoc/protected'
import Title from 'components/Title'
import Loader from 'ui/Loader'
import { ActivePin, InactivePin, WarningPin } from 'ui/Pin'
import routes from 'routes'
import {
  ENTRIES_PER_PAGE_DASHBOARD, tabsForDashboard, tabForInstallExtension, tabForPublishExtensions, extensionStatus,
} from 'redux/constants'
import { deleteInstallExtension } from 'api'

import Pagination from 'ui/Pagination'
import Button from 'ui/Button'

const ProjectCart = ({
  name, created, status, t, language, installed, publish, version, onDelete,
}) => {
  const history = useHistory()

  const redirectClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    history.push(`/extensions/settings/${publish.id}`)
  }

  return (
    <li>
      <div className='block cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-700'>
        <div className='px-4 py-4 sm:px-6'>
          <div className='flex items-center justify-between'>
            <p className='text-lg font-medium text-indigo-600 dark:text-gray-50 truncate'>
              {name}
            </p>
            <div className='ml-2 flex-shrink-0 flex'>
              {
                !publish ? (
                  installed ? (
                    <ActivePin className='mr-2' label='installed' />
                  ) : (
                    <>
                      <Button
                        className='mr-2'
                        primary
                        large
                        onClick={(e) => {
                          e.stopPropagation()
                          e.preventDefault()
                          onDelete()
                        }}
                      >
                        delete
                      </Button>
                    </>
                  )
                ) : (
                    <>
                      <div className='cursor-pointer' onClick={redirectClick}>
                        <CogIcon className='w-6 h-6 text-gray-400 hover:text-gray-500 mr-5' />
                      </div>
                      {status === extensionStatus[0] ? (
                        <InactivePin label={status} />
                      ) : status === 'ACCEPTED'
                        ? (
                          <ActivePin label={status} />
                        )
                        : (
                          <WarningPin label={status} />
                        )
                      }
                    </>
                )
              }
            </div>
          </div>
          <div className='mt-2 sm:flex sm:justify-between'>
            <div className='sm:flex flex-col'>
              <div className='mt-2 flex items-center text-sm text-gray-500 dark:text-gray-300 sm:mt-0'>
                {t('dashboard.version')}
                {`: v${version}`}
              </div>
            </div>
            <div className='mt-2 flex items-center text-sm text-gray-500 dark:text-gray-300'>
              <CalendarIcon className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-300' />
              <p>
                {t('dashboard.createdOn')}
                &nbsp;
                <time dateTime={dayjs(created).format('YYYY-MM-DD')}>
                  {language === 'en'
                    ? dayjs(created).locale(language).format('MMMM D, YYYY')
                    : dayjs(created).locale(language).format('D MMMM, YYYY')}
                </time>
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

const Noextensions = ({ t }) => (
  <p className='mt-5 text-center dark:text-gray-50'>
    {t('dashboard.noextensions')}
  </p>
)

const Dashboard = ({
  extensions, isLoading, error, user, loadExtensions, loadPublishExtensions,
  total, setDashboardPaginationPage, dashboardPaginationPage, publishExtensions, dashboardTabs,
  setDashboardTabs, publishTotal, setDashboardPaginationPagePublish, dashboardPaginationPagePublish, setExtensions, showError,
}) => {
  const { t, i18n: { language } } = useTranslation('common')
  const [showActivateEmailModal, setShowActivateEmailModal] = useState(false)
  const history = useHistory()
  const [tabExtensions, setTabExtensions] = useState(dashboardTabs)
  const pageAmount = useMemo(() => (dashboardTabs === tabForPublishExtensions ? _ceil(publishTotal / ENTRIES_PER_PAGE_DASHBOARD) : _ceil(total / ENTRIES_PER_PAGE_DASHBOARD)), [total, publishTotal, dashboardTabs])

  const onNewExtension = () => {
    if (user.isActive) {
      history.push(routes.new_extension)
    } else {
      setShowActivateEmailModal(true)
    }
  }

  const onDeleteInstallExtensions = async (id) => {
    await deleteInstallExtension(id)
      .then((response) => {
        setExtensions(_filter(extensions, p => p.id !== id), false)
      }).catch((err) => {
        showError(`Error deleting extension: ${err.message}`)
      })
  }


  useEffect(() => {
    if (publishTotal <= 0) {
      setDashboardTabs(tabForInstallExtension)
      setTabExtensions(tabForInstallExtension)
    }

    setDashboardTabs(tabExtensions)
  }, [tabExtensions, setDashboardTabs, publishTotal])

  useEffect(() => {
    if (tabExtensions === tabForInstallExtension) {
      loadExtensions(ENTRIES_PER_PAGE_DASHBOARD, (dashboardPaginationPage - 1) * ENTRIES_PER_PAGE_DASHBOARD)
    }
    if (tabExtensions === tabForPublishExtensions) {
      loadPublishExtensions(ENTRIES_PER_PAGE_DASHBOARD, (dashboardPaginationPagePublish - 1) * ENTRIES_PER_PAGE_DASHBOARD)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardPaginationPage, dashboardPaginationPagePublish])

  if (error && !isLoading) {
    return (
      <Title title={t('titles.dashboard')}>
        <div className='flex justify-center pt-10'>
          <div className='rounded-md bg-red-50 p-4 w-11/12 lg:w-4/6'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <XCircleIcon className='h-5 w-5 text-red-400' aria-hidden='true' />
              </div>
              <div className='ml-3'>
                <h3 className='text-sm font-medium text-red-800'>{error}</h3>
              </div>
            </div>
          </div>
        </div>
      </Title>
    )
  }

  return (
    <Title title={t('titles.dashboard')}>
      <div className='min-h-min-footer bg-gray-50 dark:bg-gray-800'>
        <div className='flex flex-col py-6 px-4 sm:px-6 lg:px-8'>
          <div className='max-w-7xl w-full mx-auto'>
            <div className='flex justify-between'>
              <h2 className='mt-2 text-3xl font-bold text-gray-900 dark:text-gray-50'>
                {t('titles.dashboard')}
              </h2>
              <span onClick={onNewExtension} className='inline-flex justify-center items-center cursor-pointer text-center border border-transparent leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-2 text-sm'>
                <FolderAddIcon className='w-5 h-5 mr-1' />
                {t('dashboard.create')}
              </span>
            </div>
            <div className='mt-6'>
              {publishTotal > 0 && (
                <nav className='-mb-px flex space-x-8'>
                  {_map(tabsForDashboard, (tab) => (
                    <button
                      key={tab.name}
                      type='button'
                      onClick={() => setTabExtensions(tab.name)}
                      className={cx('whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-md', {
                        'border-indigo-500 text-indigo-600 dark:text-indigo-500': tabExtensions === tab.name,
                        'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-300': tabExtensions !== tab.name,
                      })}
                      aria-current={tab.name === tabExtensions ? 'page' : undefined}
                    >
                      {t(tab.label)}
                    </button>
                  ))}
                </nav>
              )}
            </div>
            {isLoading ? (
              <Title title={t('titles.dashboard')}>
                <div className='min-h-min-footer bg-gray-50 dark:bg-gray-800'>
                  <Loader />
                </div>
              </Title>
            ) : (
              <>

                {tabExtensions === tabForInstallExtension && (
                  <div>
                    {_isEmpty(_filter(extensions, ({ uiHidden }) => !uiHidden)) ? (
                      <Noextensions t={t} />
                    ) : (
                      <div className='shadow overflow-hidden sm:rounded-md'>
                        <ul className='divide-y divide-gray-200 dark:divide-gray-500'>
                          {_map(_filter(extensions, ({ uiHidden }) => !uiHidden), ({
                            name, id, created, status, version, publish = false, installed,
                          }) => (
                            <div key={id}>
                              <Link to={_replace(routes.extension, ':id', id)}>
                                <ProjectCart
                                  t={t}
                                  language={language}
                                  name={name}
                                  created={created}
                                  publish={publish}
                                  onDelete={() => onDeleteInstallExtensions(id)}
                                  status={status}
                                  installed={installed}
                                  version={version}
                                />
                              </Link>
                            </div>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {tabExtensions === tabForPublishExtensions && (
                  <div>
                    {_isEmpty(publishExtensions) ? (
                      <Noextensions t={t} />
                    ) : (
                      <div className='shadow overflow-hidden sm:rounded-md'>
                        <ul className='divide-y divide-gray-200 dark:divide-gray-500'>
                          {_map(publishExtensions, (extension) => (
                            <div key={extension.id}>
                              <Link to={_replace(routes.extension, ':id', extension.id)}>
                                <ProjectCart
                                  t={t}
                                  language={language}
                                  name={extension.name}
                                  created={extension.created}
                                  publish={extension}
                                  onDelete={() => { }}
                                  status={extension.status}
                                  version={extension.version}
                                />
                              </Link>
                            </div>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {
              pageAmount > 1 && (
                <Pagination page={tabExtensions === tabForPublishExtensions ? dashboardPaginationPagePublish : dashboardPaginationPage} setPage={tabExtensions === tabForPublishExtensions ? (page) => setDashboardPaginationPagePublish(page) : (page) => setDashboardPaginationPage(page)} pageAmount={pageAmount || 0} total={tabExtensions === tabForPublishExtensions ? publishTotal : total} />
              )
            }
          </div>
        </div>
      </div>
      <Modal
        onClose={() => setShowActivateEmailModal(false)}
        onSubmit={() => setShowActivateEmailModal(false)}
        submitText={t('common.gotIt')}
        title={t('dashboard.verifyEmailTitle')}
        type='info'
        message={t('dashboard.verifyEmailDesc')}
        isOpened={showActivateEmailModal}
      />
    </Title>
  )
}

Dashboard.propTypes = {
  extensions: PropTypes.arrayOf(PropTypes.object).isRequired,
  publishExtensions: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  loadExtensions: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  setDashboardPaginationPage: PropTypes.func.isRequired,
  setDashboardPaginationPagePublish: PropTypes.func.isRequired,
  dashboardPaginationPage: PropTypes.number.isRequired,
  dashboardPaginationPagePublish: PropTypes.number.isRequired,
  dashboardTabs: PropTypes.string.isRequired,
  setDashboardTabs: PropTypes.func.isRequired,
  publishTotal: PropTypes.number.isRequired,
}

Dashboard.defaultProps = {
  error: '',
}

export default memo(withAuthentication(Dashboard, auth.authenticated))
