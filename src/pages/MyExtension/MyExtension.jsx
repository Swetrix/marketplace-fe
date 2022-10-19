import React, {
  memo, useState, useMemo, useEffect,
} from 'react'
import { withAuthentication, auth } from 'hoc/protected'
import { useSelector } from 'react-redux'
import _filter from 'lodash/filter'
import _map from 'lodash/map'

const MyExtension = (
  extensions,
  isLoading,
  error,
  user,
  loadExtensions,
  loadPublishExtensions,
  total,
  setDashboardPaginationPage,
  dashboardPaginationPage,
  publishExtensions,
  dashboardTabs,
  setDashboardTabs,
  publishTotal,
  setDashboardPaginationPagePublish,
  dashboardPaginationPagePublish,
) => {
  const data = useSelector(state => state.ui.extensions.extensions)
  console.log(data)
  const { extensions: sharedExtensions } = extensions
  const { version, id: currentId, price } = sharedExtensions[0]
  console.log(version, currentId, price)
  const result = sharedExtensions.filter(extension => extension.version === '0.0.1')
  console.log(result)
  return (

    <div className='min-h-min-footer bg-gray-50 dark:bg-gray-800'>
      <div className='flex flex-col py-6 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl w-full mx-auto'>
          <div className='flex justify-between'>
            <div>{}</div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default memo(withAuthentication(MyExtension, auth.authenticated))
