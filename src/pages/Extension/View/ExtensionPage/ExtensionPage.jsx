import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
// import StarsRaiting from 'ui/StarsRaiting'
import Glider from 'react-glider'
import _find from 'lodash/find'
import _map from 'lodash/map'
import _isEmpty from 'lodash/isEmpty'
import _filter from 'lodash/filter'
import { installExtension, deleteInstallExtension } from 'api'
import 'glider-js/glider.min.css'
import Button from 'ui/Button'
import Title from 'components/Title'
import { extensionStatuses } from 'redux/constants'
import StarsRaiting from 'ui/StarsRaiting'
import { ExtensionCommentList } from 'data/ExtensionCommentList'

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
        <div className='bg-gray-50 dark:bg-slate-900 py-6 px-4 sm:px-6 lg:px-8 min-h-min-footer-ad extensionPageGlider'>
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
              <div className='w-full mx-auto max-w-[800px] py-4'>
                {!_isEmpty(extension.additionalImages) && (
                  <Glider
                    slidesToScroll={1}
                    // slidesToShow={1}
                    resizeLock
                    // resizeLock
                    // exactWidth
                    // exactWidth
                    rewind
                  >
                    {_map(extension.additionalImages, ((image) => (
                      <div key={image} className='border-2 border-white rounded-lg bg-gray-100 dark:bg-slate-900 dark:border-gray-900'>
                        <img
                          alt=''
                          className='rounded-lg w-full max-w-[800px] max-h-[400px]'
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

				<section className='bg-white dark:bg-gray-900 py-8 lg:py-16'>
        <div className='max-w-2xl mx-auto px-4'>
            <div className='flex flex-col justify-start items-start mb-6'>
            <h2 className='text-lg lg:text-2xl font-bold text-gray-900 dark:text-white'>Discussion (20)</h2>
            
            <div className='flex flex-row items-center gap-1 mt-2'>
              <StarsRaiting stars='3.5' />
            </div>
          
          </div>
          <form className='mb-6'>
          
            <div className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
            <label htmlFor='comment' className='sr-only'>Your comment</label>

            <textarea id='comment' rows='6'
                className='px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
                placeholder='Write a comment...' required></textarea>
            </div>

            <div className='flex justify-end'>
            <Button
              type='submit'
              primary
              className='inline-flex justify-center items-center cursor-pointer text-center border border-transparent leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 shadow-sm text-white bg-slate-900 hover:bg-slate-700 dark:text-gray-50 dark:border-gray-800 dark:bg-slate-800 dark:hover:bg-slate-700 px-4 py-3 text-sm'
            >
              Submit
            </Button>
            </div>
          </form>

          {
            _map(ExtensionCommentList, (item) => (
              <div key={item.id}>
                <article className='p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900'>
                  <footer className='flex justify-between items-center mb-2'>
                  <div className='flex items-center'>
                <p className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white'><img
                        className='mr-2 w-6 h-6 rounded-full'
                        src={item.icon}
                        alt='Michael Gough'/>{item.name}</p>
                <p className='text-sm text-gray-600 dark:text-gray-400'><time  dateTime='2022-02-08'
                        title='February 8th, 2022'>{item.data}</time></p>
                  </div>
                  <button id='dropdownComment1Button' data-dropdown-toggle='dropdownComment1'
                className='inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                type='button'>
                <svg className='w-5 h-5' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                        d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z'>
                    </path>
                </svg>
                <span className='sr-only'>Comment settings</span>
                  </button>
            
                  <div id='dropdownComment1'
                      className='hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'>
                    <ul className='py-1 text-sm text-gray-700 dark:text-gray-200'
                    aria-labelledby='dropdownMenuIconHorizontalButton'>
                    <li>
                        <a href='#'
                            className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Edit</a>
                    </li>
                    <li>
                        <a href='#'
                            className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Remove</a>
                    </li>
                    <li>
                        <a href='#'
                            className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Report</a>
                    </li>
                </ul>
                  </div>
                  </footer>
                  <p className='text-gray-500 dark:text-gray-400'>{item.description}</p>
                  <div className='flex items-center mt-4 space-x-4'>
                  <button type='button'
                      className='flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400'>
                      <svg aria-hidden='true' className='mr-1 w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'></path></svg>
                      Reply
                  </button>
                  </div>
                </article>

                
                {
                  item.subComment && _map(item.subComment, (subItem) => (
                    <div key={subItem.id}>
                      <article  className='p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900'>
                        <footer className='flex justify-between items-center mb-2'>
                        <div className='flex items-center'>
                        <p className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white'><img
                          className='mr-2 w-6 h-6 rounded-full'
                          src={subItem.icon}
                          alt='Jese Leos'/>{subItem.name}</p>
                      <p className='text-sm text-gray-600 dark:text-gray-400'><time  dateTime='2022-02-12'
                        title='February 12th, 2022'>{subItem.data}</time></p>
                      </div>
                      <button id='dropdownComment2Button' data-dropdown-toggle='dropdownComment2'
                              className='inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                              type='button'>
                        <svg className='w-5 h-5' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'>
                        <path
                              d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z'>
                        </path>
                        </svg>
                        <span className='sr-only'>Comment settings</span>
                      </button>
            
                      <div id='dropdownComment2'
                          className='hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'>
                      <ul className='py-1 text-sm text-gray-700 dark:text-gray-200'
                          aria-labelledby='dropdownMenuIconHorizontalButton'>
                          <li>
                              <a href='#'
                                  className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Edit</a>
                          </li>
                          <li>
                              <a href='#'
                                  className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Remove</a>
                          </li>
                          <li>
                              <a href='#'
                                  className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Report</a>
                          </li>
                      </ul>
                      </div>
                      </footer>
                      <p className='text-gray-500 dark:text-gray-400'>{subItem.description}</p>
                      <div className='flex items-center mt-4 space-x-4'>
                      <button type='button'
                          className='flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400'>
                          <svg aria-hidden='true' className='mr-1 w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'></path></svg>
                          Reply
                      </button>
                      </div>
                      </article>
                    </div>
                  ))
                }
              </div>
            ))
          }
   
        </div>
      </section>
      </Title>
    </>
  )
}

export default ExtensionPage
