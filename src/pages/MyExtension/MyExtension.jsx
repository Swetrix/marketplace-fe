import React, {
  memo, useState, useMemo, useEffect,
} from 'react'
import { withAuthentication, auth } from 'hoc/protected'
import { useSelector } from 'react-redux'
import routes from 'routes'
import { useParams } from 'react-router-dom'

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
  const { version, id: currentId, price } = sharedExtensions
  console.log(version, currentId, price)
  const { id } = useParams()
  const result1 = sharedExtensions.filter(extension => extension.id === id)
  console.log(result1)
  return (

    <div className='min-h-min-footer bg-gray-50 dark:bg-gray-800'>
      <div className='flex flex-col py-6 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl w-full mx-auto'>
          <div className='lex pt-4 space-x-4 mt-1 text-1xl font-bold text-gray-900 dark:text-gray-50'>
            <button type='button'>Delete</button>
            <button type='button'>Disable</button>
          </div>
          <ul className='flex flex-col space-y-4'>
            {result1.map(extension => (
              <li key={extension.id}>
                {extension.name}
                {extension.description}
                {extension.owner.email}
                {extension.description}
                {extension.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

  )
}

export default memo(withAuthentication(MyExtension, auth.authenticated))
