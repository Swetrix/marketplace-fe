import React from 'react'

import StarsRaiting from 'ui/StarsRaiting'
import _replace from 'lodash/replace'
import { DownloadIcon } from '@heroicons/react/outline'
import { useHistory } from 'react-router-dom'
import routes from 'routes'

const ExtensionsCard = ({
  name, stars, downloads, mainImage, price, companyLink, companyName, id,
}) => {
  const history = useHistory()

  const subStr = (string, len) => {
    if (string.length > len) {
      return `${string.substring(0, len)}...`
    }
    return string
  }

  const openExtension = () => {
    history.push(_replace(routes.viewExtensions, ':id', id))
  }

  return (
    <div className='group w-[210px] relative border-2 border-white rounded-lg p-3 bg-gray-100 dark:bg-gray-800 dark:border-gray-900 cursor-pointer' onClick={openExtension}>
      <div className='h-28 w-28 mx-auto aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none'>
        <img src={mainImage ? `${process.env.REACT_APP_SDN_URL}file/${mainImage}` : 'https://via.placeholder.com/150'} alt={companyName} className='w-full h-full object-center object-cover lg:w-full lg:h-full' />
      </div>
      <div className='mt-4'>
        <h3 className='text-center text-lg font-semibold leading-5 text-gray-700 dark:text-gray-300'>
          <p>
            {subStr(name, 15)}
          </p>
        </h3>
        <div className='flex items-center justify-between mt-2'>
          <div className='flex flex-col'>
            <p className='dark:text-gray-400 text-gray-500 text-sm leading-[10px]'>
              {subStr(companyName, 10)}
            </p>
            {/* <a href={companyLink} className='dark:text-indigo-400 cursor-pointer text-indigo-500 font-semibold border-0 text-sm'>
              {_includes(companyLink, 'https://')
                ? subStr(_replace(companyLink, 'https://', ''), 10)
                : subStr(_replace(companyLink, 'http://', ''), 10)}
            </a> */}
          </div>
          <div className='flex items-center'>
            <DownloadIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
            <p className='pl-1 text-gray-400'>
              {downloads}
            </p>
          </div>
        </div>
        <div className='flex justify-between items-center mt-1'>
          <StarsRaiting stars={stars} />
          <div>
            <p className='text-indigo-700 dark:text-indigo-500 font-semibold'>
              {price === 0 ? 'Free' : `${price}$`}
            </p>
            <span className='sr-only'>pricing</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExtensionsCard
