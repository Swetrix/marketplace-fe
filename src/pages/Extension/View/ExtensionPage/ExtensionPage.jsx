import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
// import StarsRaiting from 'ui/StarsRaiting'
import Glider from 'react-glider'
import _find from 'lodash/find'
import _map from 'lodash/map'
import _isEmpty from 'lodash/isEmpty'
import _filter from 'lodash/filter'
import { installExtension, deleteInstallExtension } from 'api'
import '../../../../glider.css'
import Button from 'ui/Button'
import Title from 'components/Title'
import { extensionStatuses } from 'redux/constants'

const ExtensionPage = ({ extensions, showError, setExtensions, installExtensions, authenticated, publishExtensions }) => {
  const { id } = useParams()
  const extension = useMemo(() => _find([...extensions, ...publishExtensions], p => p.id === id) || {}, [extensions, publishExtensions, id])
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [installLoading, setInstallLoading] = useState(false)
  const isInstalled = useMemo(() => !_isEmpty(_find(installExtensions, p => p.id === id) || {}), [installExtensions, id])
  const isPublish = useMemo(() => !_isEmpty(_find(publishExtensions, p => p.id === id) || {}), [publishExtensions, id])
  const isPending = useMemo(() => extension.status !== extensionStatuses.ACCEPTED, [extension])

  const install = async () => {
    if (!authenticated) {
      showError('You must be logged in to install extensions')
      return
    }
    setInstallLoading(true)
    await installExtension(extension.id)
      .then((response) => {
        setExtensions([...installExtensions, extension], false)
      }).catch((err) => {
        showError(`Error installing extension: ${err.message}`)
      })
    setInstallLoading(false)
  }

  const deleted = async () => {
    if (!authenticated) {
      showError('You must be logged in to install extensions')
      return
    }
    setDeleteLoading(true)
    await deleteInstallExtension(extension.id)
      .then((response) => {
        setExtensions(_filter(extensions, p => p.id !== id), false)
      }).catch((err) => {
        showError(`Error deleting extension: ${err.message}`)
      })
    setDeleteLoading(false)
  }

  return (
    <>
      <Title title={extension.name}>
        <div className='flex flex-col bg-gray-50 dark:bg-slate-900 py-6 px-4 sm:px-6 lg:px-8 min-h-min-footer-ad extensionPageGlider'>
          <div className='max-w-4xl mx-auto'>
            {(isPublish && isPending) && (
              <div className='relative bg-indigo-600 dark:bg-gray-600 rounded-lg'>
                <div className='mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8'>
                  <div className='pr-16 sm:px-16 sm:text-center'>
                    <p className='font-medium text-white'>
                      <span>It is preview because your extensions passes inspection</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className='flex flex-col justify-between items-start pt-6'>
              <div className='flex items-end'>
                <div className='flex justify-center items-center'>
                  <img
                    alt='mainImage'
                    className='h-24 w-24 rounded-lg'
                    src={extension.mainImage ? `${process.env.REACT_APP_CDN_URL}file/${extension.mainImage}` : `https://via.placeholder.com/150?text=${extension.name}`}
                    width='150'
                    height='70'
                  />
                </div>
                <div className='flex items-start flex-col pl-12'>
                  <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50 break-words'>
                    {extension.name}
                  </h2>
                  <div className='flex flex-row gap-4 items-center'>
                    <p className='font-semibold text-lg text-gray-900 dark:text-gray-50'>
                      {extension.owner?.nickname || 'Empty nickname'}
                    </p>
                    <span> | </span>
                    <p className='text-base text-gray-900 dark:text-gray-50'>
                      {extension.usersQuantity}
                      {' '}
                      users
                    </p>
                    {/* <span> | </span>
                  <div className='flex flex-row items-center gap-1'>
                    <StarsRaiting stars='3.5' />
                  </div> */}
                    {/* <span> | </span>
              <p className='text-base text-gray-900 dark:text-gray-50'>9$</p> */}
                  </div>
                </div>
                <div className='flex flex-row items-end pl-12'>
                  {isInstalled ? (
                    <Button type='submit' loading={deleteLoading} onClick={deleted} danger regular>
                      Uninstall
                    </Button>
                  ) : (
                    <Button
                      type='button'
                      loading={installLoading}
                      regular
                      primary
                      onClick={install}
                    >
                      Install
                    </Button>
                  )}
                </div>
              </div>
              <div className='w-full max-w-[1200px] py-4'>
                {!_isEmpty(extension.additionalImages) && (
                  <Glider
                    hasArrows
                    slidesToScroll={1}
                    slidesToShow={1}
                    resizeLock
                    // exactWidth
                    rewind
                  >
                    {_map(extension.additionalImages, ((image) => (
                      <div key={image} className='glider-block border-2 border-white rounded-lg bg-gray-100 dark:bg-slate-900 dark:border-gray-900'>
                        <img
                          alt=''
                          className='rounded-lg'
                          src={`${process.env.REACT_APP_CDN_URL}file/${image}` || 'https://via.placeholder.com/150'}
                        />
                      </div>
                    )))}
                  </Glider>
                )}
              </div>
            </div>
            <div className='flex flex-row w-full pt-5 pb-6 gap-3'>
              <div className='relative w-full bg-white dark:bg-gray-750 pt-5 px-4 min-h-72 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden pb-5'>
                <div className='flex items-center justify-between mb-2'>
                  <h3 className='flex items-center text-lg leading-6 font-semibold text-gray-900 dark:text-gray-50'>
                    Description
                  </h3>
                </div>
                <p className='text-lg dark:text-gray-50 whitespace-pre-line'>
                  {extension.description}
                </p>
              </div>
              {!_isEmpty(extension.tags) && (
                <div className='relative bg-white dark:bg-gray-750 pt-5 px-4 min-h-72 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden pb-12'>
                  <div className='flex items-center justify-between mb-2'>
                    <h3 className='flex items-center text-lg leading-6 font-semibold text-gray-900 dark:text-gray-50'>
                      Tags
                    </h3>
                  </div>
                  <div className='flex flex-row gap-3 flex-wrap w-full'>
                    {_map(extension.tags, (tag) => (
                      <p className='rounded-lg border-2 flex-nowrap py-1 px-3 text-gray-900 dark:text-gray-50'>
                        {tag}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Title>
    </>
  )
}

export default ExtensionPage
