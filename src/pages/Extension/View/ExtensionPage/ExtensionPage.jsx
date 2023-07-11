import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
// import StarsRaiting from 'ui/StarsRaiting'
import Glider from 'react-glider'
import _find from 'lodash/find'
import _map from 'lodash/map'
import _isEmpty from 'lodash/isEmpty'
import _filter from 'lodash/filter'
import {
  installExtension,
  deleteInstallExtension,
  createComment,
  getComments,
  replyToComment,
} from 'api'
import 'glider-js/glider.min.css'
import Button from 'ui/Button'
import Title from 'components/Title'
import { extensionStatuses } from 'redux/constants'
import StarsRaiting from 'ui/StarsRaiting'
import { ExtensionCommentList } from 'data/ExtensionCommentList'
import cx from 'clsx'
import { Menu, Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next'

const CommentMenu = () => {
  return (
    <Menu as='div' className='relative'>
      <div>
        <Menu.Button className='p-1 flex justify-center items-center font-semibold leading-6 text-base text-slate-800 hover:text-slate-700 dark:text-slate-200 dark:hover:text-white'>
          <svg
            className='w-5 h-5'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z'></path>
          </svg>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 z-30 mt-2 w-60 min-w-max origin-top-right rounded-md bg-white dark:bg-slate-900 py-1 shadow-lg ring-1 ring-slate-200 dark:ring-slate-800 focus:outline-none'>
          <Menu.Item>
            {({ active }) => (
              <div
                className={cx(
                  'cursor-pointer block px-4 py-2 text-sm text-gray-700 dark:text-gray-50',
                  {
                    'bg-gray-100 dark:bg-slate-800': active,
                  }
                )}
                onClick={() => console.log('Edit')}
              >
                Edit
              </div>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <div
                className={cx(
                  'cursor-pointer block px-4 py-2 text-sm text-gray-700 dark:text-gray-50',
                  {
                    'bg-gray-100 dark:bg-slate-800': active,
                  }
                )}
                onClick={() => console.log('Remove')}
              >
                Remove
              </div>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <div
                className={cx(
                  'cursor-pointer px-4 py-2 text-sm text-gray-700 dark:text-gray-50',
                  {
                    'bg-gray-100 dark:bg-slate-800': active,
                  }
                )}
                onClick={() => console.log('Report')}
              >
                Report
              </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

const ExtensionPage = ({
  extensions,
  showError,
  setExtensions,
  comments,
  setComments,
  installExtensions,
  authenticated,
  publishExtensions,
  user,
}) => {
  const { id } = useParams()
  const {
    t,
    i18n: { language },
  } = useTranslation('common')
  const extension = useMemo(
    () =>
      _find([...extensions, ...publishExtensions], (p) => p.id === id) || {},
    [extensions, publishExtensions, id]
  )
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [installLoading, setInstallLoading] = useState(false)
  const [commentInputs, setCommentInputs] = useState({})
  const [commentForm, setCommentForm] = useState()

  const isInstalled = useMemo(
    () => !_isEmpty(_find(installExtensions, (p) => p.id === id) || {}),
    [installExtensions, id]
  )
  const isPublish = useMemo(
    () => !_isEmpty(_find(publishExtensions, (p) => p.id === id) || {}),
    [publishExtensions, id]
  )
  const isPending = useMemo(
    () => extension.status !== extensionStatuses.ACCEPTED,
    [extension]
  )

  const install = async () => {
    if (!authenticated) {
      showError('You must be logged in to install extensions')
      return
    }
    setInstallLoading(true)
    await installExtension(extension.id)
      .then((response) => {
        setExtensions([...installExtensions, extension], false)
      })
      .catch((err) => {
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
        setExtensions(
          _filter(extensions, (p) => p.id !== id),
          false
        )
      })
      .catch((err) => {
        showError(`Error deleting extension: ${err.message}`)
      })
    setDeleteLoading(false)
  }

  const addComment = async (text) => {
    await createComment(user.id, {
      extensionId: extension.id,
      text,
      rating: 2,
    })
      .then((response) => {
        setComments({
          comments: [...comments.comments, response],
          count: comments.count + 1,
        })
      })
      .catch((err) => {
        showError(`Error add a comment: ${err.message}`)
      })
  }

  const replyComment = async (commentId, reply) => {
    await replyToComment(commentId, { reply: reply })
      .then((response) => {
        toggleCommentInput(commentId)
        setComments({
          comments: _map(comments.comments, (comment) =>
            comment.id === commentId ? { ...comment, reply: reply } : comment
          ),
          count: comments.count,
        })
      })
      .catch((err) => {
        showError(`Error reply to comment: ${err.message}`)
      })
  }

  const getAllComments = async (extensionId) => {
    await getComments(extensionId)
      .then((response) => {
        setComments(response)
      })
      .catch((e) => {
        showError('apiNotifications.somethingWentWrong')
      })
  }

  const toggleCommentInput = (commentId) => {
    setCommentInputs((prevInputs) => {
      const updateInputs = Object.fromEntries(
        _map(Object.entries(prevInputs), ([id]) => [id, false])
      )
      return {
        ...updateInputs,
        [commentId]: !prevInputs[commentId],
      }
    })
  }

  const handleSubmit = (e, commentId) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.target.id === 'mainForm') {
      addComment(commentForm)
    } else replyComment(commentId, commentForm)

    setCommentForm('')
  }

  const handleInput = (event) => {
    const { target } = event
    setCommentForm(target.value)
  }

  useEffect(() => {
    getAllComments(extension.id)
  }, [])

  return (
    <>
      <Title title={extension.name}>
        <div className='bg-gray-50 dark:bg-slate-900 py-6 px-4 sm:px-6 lg:px-8 min-h-min-footer-ad extensionPageGlider'>
          <div className='max-w-4xl mx-auto'>
            {isPublish && isPending && (
              <div className='relative bg-indigo-600 dark:bg-gray-600 rounded-lg'>
                <div className='mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8'>
                  <div className='pr-16 sm:px-16 sm:text-center'>
                    <p className='font-medium text-white'>
                      <span>
                        It is preview because your extensions passes inspection
                      </span>
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
                    src={
                      extension.mainImage
                        ? `${process.env.REACT_APP_CDN_URL}file/${extension.mainImage}`
                        : `https://via.placeholder.com/150?text=${extension.name}`
                    }
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
                      {extension.usersQuantity} users
                    </p>
                    <span> | </span>
                    <div className='flex flex-row items-center gap-1'>
                      <StarsRaiting stars='3.5' />
                    </div>
                    <span> | </span>
                    <p className='text-base text-gray-900 dark:text-gray-50'>
                      9$
                    </p>
                  </div>
                </div>
                <div className='flex flex-row items-end pl-12'>
                  {isInstalled ? (
                    <Button
                      type='submit'
                      loading={deleteLoading}
                      onClick={deleted}
                      danger
                      regular
                    >
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
                    {_map(extension.additionalImages, (image) => (
                      <div
                        key={image}
                        className='border-2 border-white rounded-lg bg-gray-100 dark:bg-slate-900 dark:border-gray-900'
                      >
                        <img
                          alt=''
                          className='rounded-lg w-full max-w-[800px] max-h-[400px]'
                          src={
                            `${process.env.REACT_APP_CDN_URL}file/${image}` ||
                            'https://via.placeholder.com/150'
                          }
                        />
                      </div>
                    ))}
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
                      <p
                        key={tag}
                        className='rounded-lg border-2 flex-nowrap py-1 px-3 text-gray-900 dark:text-gray-50'
                      >
                        {tag}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <section className='bg-white dark:bg-gray-900 py-8 lg:py-16'>
              <div className='max-w-2xl mx-auto px-4'>
                <div className='flex flex-col justify-start items-start mb-6'>
                  <h2 className='text-lg lg:text-2xl font-bold text-gray-900 dark:text-white'>
                    {t('comments.discussion')} {comments.count}
                  </h2>
                  <div className='flex flex-row items-center gap-1 mt-2'>
                    <StarsRaiting stars='1' />
                  </div>
                </div>
                <form id='mainForm' onSubmit={handleSubmit} className='mb-6'>
                  <div className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
                    <label htmlFor='comment' className='sr-only'>
                      {t('comments.writeComment')}
                    </label>
                    <textarea
                      id='comment'
                      value={commentForm}
                      onChange={handleInput}
                      rows='6'
                      className='px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
                      placeholder={t('comments.writeComment')}
                      required
                    ></textarea>
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

                {_isEmpty(comments.comments) ? (
                  <div className='mt-10 text-lg lg:text-2xl font-bold text-gray-900 dark:text-white text-center'>
                    {t('comments.empty')}
                  </div>
                ) : (
                  <div>
                    {_map(comments.comments, (item) => (
                      <div key={item.id}>
                        <article className='p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900'>
                          <footer className='flex justify-between items-center mb-2'>
                            <div className='flex items-center'>
                              <p className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white'>
                                <img
                                  className='mr-2 w-6 h-6 rounded-full'
                                  src='#'
                                  alt='userName'
                                />
                                User name
                              </p>
                              <p className='text-sm text-gray-600 dark:text-gray-400'>
                                <time
                                  dateTime='2022-02-08'
                                  title='February 8th, 2022'
                                >
                                  {item.addedAt}
                                </time>
                              </p>
                            </div>
                            <div>
                              <CommentMenu />
                            </div>
                          </footer>
                          <p className='text-gray-500 dark:text-gray-400'>
                            {item.text}
                          </p>
                          <div className='flex items-center mt-4 space-x-4'>
                            <button
                              onClick={() => toggleCommentInput(item.id)}
                              type='button'
                              className='flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400'
                            >
                              <svg
                                aria-hidden='true'
                                className='mr-1 w-4 h-4'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='2'
                                  d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                                ></path>
                              </svg>
                              Reply
                            </button>
                          </div>
                          {commentInputs[item.id] && (
                            <form
                              id='replyForm'
                              onSubmit={(e) => handleSubmit(e, item.id)}
                              className='w-full flex flex-col items-end'
                            >
                              <textarea
                                id='comment'
                                rows='6'
                                value={commentForm}
                                onChange={handleInput}
                                className='my-3 px-4 w-full text-sm text-gray-900 border-0 rounded-md focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
                                placeholder={t('comments.writeComment')}
                                required
                              ></textarea>

                              <Button
                                type='submit'
                                primary
                                className='inline-flex justify-center items-center cursor-pointer text-center border border-transparent leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 shadow-sm text-white bg-slate-900 hover:bg-slate-700 dark:text-gray-50 dark:border-gray-800 dark:bg-slate-800 dark:hover:bg-slate-700 px-4 py-3 text-sm'
                              >
                                Submit
                              </Button>
                            </form>
                          )}
                        </article>

                        {item.reply && (
                          <article
                            key={item.id}
                            className='p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900'
                          >
                            <footer className='flex justify-between items-center mb-2'>
                              <div className='flex items-center'>
                                <p className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white'>
                                  <img
                                    className='mr-2 w-6 h-6 rounded-full'
                                    src='#'
                                    alt='userName'
                                  />
                                  User name
                                </p>
                                <p className='text-sm text-gray-600 dark:text-gray-400'>
                                  <time
                                    dateTime='2022-02-08'
                                    title='February 8th, 2022'
                                  >
                                    reply.addedAt
                                  </time>
                                </p>
                              </div>
                              <div>
                                <CommentMenu />
                              </div>
                            </footer>
                            <p className='text-gray-500 dark:text-gray-400'>
                              {item.reply}
                            </p>
                            {/* <div className='flex items-center mt-4 space-x-4'>
                      <button
                        onClick={() => toggleCommentInput(item.id)}
                        type='button'
                        className='flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400'
                      >
                        <svg
                          aria-hidden='true'
                          className='mr-1 w-4 h-4'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                          ></path>
                        </svg>
                        Reply
                      </button>
                    </div> */}
                            {/* {commentInputs[reply.id] && (
                          <form id='replyForm' onSubmit={(e) => handleSubmit(e, reply.id)} className='w-full flex flex-col items-end'>
                            <textarea
                              id='comment'
                              rows='6'
															value={commentForm}
															onChange={handleInput}
                              className='my-3 px-4 w-full text-sm text-gray-900 border-0 rounded-md focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
                              placeholder='Write a comment...'
                              required
                            ></textarea>

                          <Button
                            type='submit'
                            primary
                            className='inline-flex justify-center items-center cursor-pointer text-center border border-transparent leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 shadow-sm text-white bg-slate-900 hover:bg-slate-700 dark:text-gray-50 dark:border-gray-800 dark:bg-slate-800 dark:hover:bg-slate-700 px-4 py-3 text-sm'
                          >
                            Submit
                          </Button>
                        </form>
                      )} */}
                          </article>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </Title>
    </>
  )
}

export default ExtensionPage
