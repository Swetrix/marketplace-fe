/* eslint-disable react/forbid-prop-types */
import React, {
  memo, useState, useMemo, useEffect,
} from 'react'
import { Link, useHistory } from 'react-router-dom'
import cx from 'clsx'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import _isEmpty from 'lodash/isEmpty'
import _isNumber from 'lodash/isNumber'
import _replace from 'lodash/replace'
import _map from 'lodash/map'
import _filter from 'lodash/filter'
import _ceil from 'lodash/ceil'
import { useTranslation } from 'react-i18next'
import { EyeIcon, CalendarIcon, FolderAddIcon } from '@heroicons/react/outline'
import { ArrowSmUpIcon, ArrowSmDownIcon, XCircleIcon } from '@heroicons/react/solid'

import Modal from 'ui/Modal'
import { withAuthentication, auth } from 'hoc/protected'
import Title from 'components/Title'
import Loader from 'ui/Loader'
import { ActivePin, InactivePin, WarningPin } from 'ui/Pin'
import PulsatingCircle from 'ui/icons/PulsatingCircle'
import routes from 'routes'
import {
  ENTRIES_PER_PAGE_DASHBOARD, tabsForDashboard, tabForInstallExtension, tabForPublishExtensions, extensionStatus,
} from 'redux/constants'

import Pagination from 'ui/Pagination'

const ProjectCart = ({
  name, created, status, overall, t, language, live, isPublic, installed, publish,
}) => {
  const statsDidGrowUp = overall?.percChange >= 0
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
                    <WarningPin className='mr-2' label='disabled' />
                  )
                ) : status === extensionStatus[0] ? (
                  <InactivePin label={extensionStatus[0]} />
                ) : (
                  <ActivePin label={t('dashboard.active')} />
                )
              }
              {isPublic && (
              <ActivePin label={t('dashboard.public')} className='ml-2' />
              )}
            </div>
          </div>
          <div className='mt-2 sm:flex sm:justify-between'>
            <div className='sm:flex flex-col'>
              {overall && (
                <div className='flex items-center mt-2 text-sm text-gray-500 dark:text-gray-300'>
                  <EyeIcon className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-300' />
                  {t('dashboard.pageviews')}
                  :
                  &nbsp;
                  <dd className='flex items-baseline'>
                    <p className='h-5 mr-1'>
                      {overall?.thisWeek}
                    </p>
                    <p
                      className={cx('flex text-xs -ml-1 items-baseline', {
                        'text-green-600': statsDidGrowUp,
                        'text-red-600': !statsDidGrowUp,
                      })}
                    >
                      {statsDidGrowUp ? (
                        <>
                          <ArrowSmUpIcon className='self-center flex-shrink-0 h-4 w-4 text-green-500' />
                          <span className='sr-only'>
                            {t('dashboard.inc')}
                          </span>
                        </>
                      ) : (
                        <>
                          <ArrowSmDownIcon className='self-center flex-shrink-0 h-4 w-4 text-red-500' />
                          <span className='sr-only'>
                            {t('dashboard.dec')}
                          </span>
                        </>
                      )}
                      {overall?.percChange}
                      %
                    </p>
                  </dd>
                </div>
              )}
              <div className='mt-2 flex items-center text-sm text-gray-500 dark:text-gray-300 sm:mt-0'>
                <PulsatingCircle className='flex-shrink-0 mr-3 ml-1' />
                {t('dashboard.liveVisitors')}
                :&nbsp;
                {live}
              </div>
            </div>
            <div className='mt-2 flex items-center text-sm text-gray-500 dark:text-gray-300'>
              <CalendarIcon className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-300' />
              <p>
                {t('dashboard.createdAt')}
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
  <div className='mt-5'>
    <h3 className='text-center dark:text-gray-50'>
      {t('dashboard.noextensions')}
    </h3>
    <p className='text-center dark:text-gray-50'>
      {t('dashboard.createProject')}
    </p>
  </div>
)

const Dashboard = ({
  extensions, isLoading, error, user, loadExtensions, loadPublishExtensions,
  total, setDashboardPaginationPage, dashboardPaginationPage, publishExtensions, dashboardTabs,
  setDashboardTabs, publishTotal, setDashboardPaginationPagePublish, dashboardPaginationPagePublish,
}) => {
  const { t, i18n: { language } } = useTranslation('common')
  const [showActivateEmailModal, setShowActivateEmailModal] = useState(false)
  const history = useHistory()
  const [tabextensions, setTabextensions] = useState(dashboardTabs)
  const pageAmount = useMemo(() => (dashboardTabs === tabForPublishExtensions ? _ceil(publishTotal / ENTRIES_PER_PAGE_DASHBOARD) : _ceil(total / ENTRIES_PER_PAGE_DASHBOARD)), [total, publishTotal, dashboardTabs])

  const onNewExtension = () => {
    if (user.isActive) {
      history.push(routes.new_extension)
    } else {
      setShowActivateEmailModal(true)
    }
  }

  useEffect(() => {
    if (publishTotal <= 0) {
      setDashboardTabs(tabForInstallExtension)
      setTabextensions(tabForInstallExtension)
    }

    setDashboardTabs(tabextensions)
  }, [tabextensions, setDashboardTabs, publishTotal])

  useEffect(() => {
    if (tabextensions === tabForInstallExtension) {
      loadExtensions(ENTRIES_PER_PAGE_DASHBOARD, (dashboardPaginationPage - 1) * ENTRIES_PER_PAGE_DASHBOARD)
    }
    if (tabextensions === tabForPublishExtensions) {
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [toggleState, setToggleState] = useState(1)
  const ToggleTab = (index) => {
    setToggleState(index)
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
                {t('dashboard.newProject')}
              </span>
            </div>
            <div className={toggleState}>
              <div className='flex pt-4 space-x-4 mt-1 text-1xl font-bold text-gray-900 dark:text-gray-50 '>
                <button type='button' className={toggleState === 1 ? 'underline decoration-blue-900 decoration-2 underline-offset-8' : 'text-gray-400'} onClick={() => ToggleTab(1)}> Added extensions</button>
                <button type='button' className={toggleState === 2 ? 'underline decoration-blue-900 decoration-2 underline-offset-8' : 'text-gray-400'} onClick={() => ToggleTab(2)}> Shared extensions</button>
              </div>
              <div className='flex justify-center p-5 w-full h-full'>
                <div
                  className={toggleState === 1 ? 'relative' : 'absolute invisible'}
                >
                  <h2>Content 1</h2>
                  <hr />
                  <p>
                    First Content
                  </p>
                </div>
                <div
                  className={toggleState === 2 ? 'relative' : 'absolute invisible'}
                >
                  <h2>Content 2</h2>
                  <hr />
                  <p>
                    Second Content
                  </p>
                </div>
              </div>
            </div>
            <div className='mt-6'>
              {publishTotal > 0 && (
              <nav className='-mb-px flex space-x-8'>
                {_map(tabsForDashboard, (tab) => (
                  <button
                    key={tab.name}
                    type='button'
                    onClick={() => setTabextensions(tab.name)}
                    className={cx('whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-md', {
                      'border-indigo-500 text-indigo-600 dark:text-indigo-500': tabextensions === tab.name,
                      'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-300': tabextensions !== tab.name,
                    })}
                    aria-current={tab.name === tabextensions ? 'page' : undefined}
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

                {tabextensions === tabForInstallExtension && (
                <div>
                  {_isEmpty(_filter(extensions, ({ uiHidden }) => !uiHidden)) ? (
                    <Noextensions t={t} />
                  ) : (
                    <div className='shadow overflow-hidden sm:rounded-md'>
                      <ul className='divide-y divide-gray-200 dark:divide-gray-500'>
                        {_map(_filter(extensions, ({ uiHidden }) => !uiHidden), ({
                          name, id, created, status, overall, live, public: isPublic, publish = false, installed,
                        }) => (
                          <div key={id}>
                            <Link to={_replace(routes.project, ':id', id)}>
                              <ProjectCart
                                t={t}
                                language={language}
                                name={name}
                                created={created}
                                publish={publish}
                                status={status}
                                isPublic={isPublic}
                                installed={installed}
                                overall={overall}
                                live={_isNumber(live) ? live : 'N/A'}
                              />
                            </Link>
                          </div>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                )}

                {tabextensions === tabForPublishExtensions && (
                <div>
                  {_isEmpty(publishExtensions) ? (
                    <Noextensions t={t} />
                  ) : (
                    <div className='shadow overflow-hidden sm:rounded-md'>
                      <ul className='divide-y divide-gray-200 dark:divide-gray-500'>
                        {_map(publishExtensions, (extension) => (
                          <div key={extension.id}>
                            <Link to={_replace(routes.project, ':id', extension.id)}>
                              <ProjectCart
                                t={t}
                                language={language}
                                name={extension.name}
                                created={extension.created}
                                publish={extension}
                                status={extension.status}
                                isPublic={extension.public}
                                overall={extension.overall}
                                live={_isNumber(extension.live) ? extension.live : 'N/A'}
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
                  <Pagination page={tabextensions === tabForPublishExtensions ? dashboardPaginationPagePublish : dashboardPaginationPage} setPage={tabextensions === tabForPublishExtensions ? (page) => setDashboardPaginationPagePublish(page) : (page) => setDashboardPaginationPage(page)} pageAmount={pageAmount || 0} total={tabextensions === tabForPublishExtensions ? publishTotal : total} />
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
