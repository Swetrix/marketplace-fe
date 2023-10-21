import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import Glider from 'react-glider'
import { useAlert } from '@blaumaus/react-alert'
import dayjs from 'dayjs'
import _find from 'lodash/find'
import _map from 'lodash/map'
import _isEmpty from 'lodash/isEmpty'
import _filter from 'lodash/filter'
import _ceil from 'lodash/ceil'
import cx from 'clsx'
import 'glider-js/glider.min.css'

import {
  installExtension,
  deleteInstallExtension,
  createComment,
  getComments,
  replyToComment,
  deleteComment,
  deleteReply,
  updateReply,
} from 'api'
import Button from 'ui/Button'
import Title from 'components/Title'
import { ENTRIES_PER_PAGE_COMMENTS, extensionStatuses } from 'redux/constants'
import StarsRaiting from 'ui/StarsRaiting'
import { Menu, Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import Pagination from 'ui/Pagination'
import Loader from 'ui/Loader'

const CommentMenu = ({ editItem, removeItem }) => {
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
                onClick={() => editItem()}
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
                onClick={() => removeItem()}
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

const NoComments = ({ t }) => (
  <p className='mt-5 text-center dark:text-gray-50'>
    {t('comments.nocomments')}
  </p>
)

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
  const alert = useAlert()
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
  const [commentInputs, setCommentInputs] = useState('')
  const [isEditReply, setEditReply] = useState('')
  const [commentForm, setCommentForm] = useState({ text: '', rating: 5, reply: '', editReply: '' })
  const [isLoadingComments, setLoadingComments] = useState(true)
  const [page, setPage] = useState(1)

  const pageAmount = useMemo(() => _ceil(comments.count / ENTRIES_PER_PAGE_COMMENTS), [comments.count])

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
        showError(err.message)
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
        showError(err.message)
      })
    setDeleteLoading(false)
  }

  const addComment = async ({ text, rating }) => {
    if (!authenticated) {
      showError('You must be logged in to add comments')
      return
    }

    await createComment(user.id, {
      extensionId: extension.id,
      text,
      rating,
    })
      .then((response) => {
        response.user = { nickname: user.nickname }
        response.replies = []
        setComments({
          comments: [...comments.comments, response],
          count: comments.count + 1,
        })
        setCommentForm({ text: '', rating: 5 })
        alert.success('Comment added successfully')
      })
      .catch(showError)
  }

  const replyComment = async (commentId, text) => {
    if (!authenticated) {
      showError('You must be logged in to reply to comments')
      return
    }

    await replyToComment(commentId, text)
      .then((response) => {
        response.user = { nickname: user.nickname }
        toggleCommentInput(commentId)
        setCommentForm({ text: '', rating: 5, reply: '' })
        setComments({
          comments: _map(comments.comments, (comment) =>
            comment.id === commentId ? { ...comment, replies: [...comment.replies, response] } : comment
          ),
          count: comments.count,
        })
        alert.success('Reply added successfully')
      })
      .catch(showError)
  }

  const editReply = async (commentId, replyId, text) => {
    if (!authenticated) {
      showError('You must be logged in to perform this action')
      return
    }

    await updateReply(replyId, text)
      .then((response) => {
        toggleEditReply(replyId)
        const updatedComments = _map(comments.comments, (comment) => {
          if (comment.id === commentId) {
            comment.replies = _map(comment.replies, (reply) => reply.id === replyId ? response : reply)
          }
          return comment
        })
        setComments({
          comments: updatedComments,
          count: comments.count,
        })
        alert.success('Reply to comment successfully changed')
      })
      .catch(showError)
  }

  const removeReply = async (commentId, replyId) => {
    if (!authenticated) {
      showError('You must be logged in to perform this action')
      return
    }

    await deleteReply(replyId)
      .then((response) => {
        console.log(response)
        const updatedComments = _map(comments.comments, (comment) => {
          if (comment.id === commentId) {
            comment.replies = _filter(comment.replies, (reply) => reply.id !== replyId)
          }
          return comment
        })
        setComments({
          comments: updatedComments,
          count: comments.count
        })
        alert.success('Reply to comment successfully deleted')
      })
      .catch(showError)
  }

  const getAllComments = useCallback(async (extensionId) => {
    setLoadingComments(true)
    await getComments(extensionId, ENTRIES_PER_PAGE_COMMENTS, (page - 1) * ENTRIES_PER_PAGE_COMMENTS)
      .then((response) => {
        setComments(response)
      })
      .catch((err) => {
        showError(`Error get a comments: ${err}`)
      })

    setLoadingComments(false)
  }, [page, setComments, showError])

  const removeComment = async (commentId) => {
    await deleteComment(commentId)
      .then((response) => {
        setComments({
          comments: _filter(comments.comments, (comment) => comment.id !== commentId),
          count: comments.count - 1,
        })
        alert.success('Comment successfully deleted')

      })
      .catch(showError)
  }

  const toggleCommentInput = (commentId) => {
    setCommentInputs((prevState) => prevState === commentId ? '' : commentId)
  }

  const toggleEditReply = (replyId, value = '') => {
    setCommentForm((prevState) => ({
      ...prevState,
      editReply: value,
    }))
    setEditReply((prevState) => prevState === replyId ? '' : replyId)
  }

  const handleSubmit = async (e, commentId, replyId) => {
    e.preventDefault()
    e.stopPropagation()
    const formId = e.target.id

    if (formId === 'mainForm') await addComment(commentForm)
    else if (formId === 'replyForm') replyComment(commentId, commentForm.reply)
    else if (formId === 'editReplyForm') editReply(commentId, replyId, commentForm.editReply)
  }

  const handleRating = (rating) => {
    setCommentForm(oldForm => ({
      ...oldForm,
      rating,
    }))
  }

  const handleInput = (event) => {
    const { target } = event

    setCommentForm(oldForm => ({
      ...oldForm,
      [target.name]: target.value,
    }))
  }

  useEffect(() => {
    getAllComments(extension.id)
  }, [page, extension.id, getAllComments])

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
                        Your extension is pending review and is currently not available to other users
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
                      <StarsRaiting disabled stars='3' />
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
                      {t('common.uninstall')}
                    </Button>
                  ) : (
                    <Button
                      type='button'
                      loading={installLoading}
                      regular
                      primary
                      onClick={install}
                    >
                      {t('common.install')}
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
            {extension.status === extensionStatuses.ACCEPTED && (
              <section className=' py-8 lg:py-16'>
                <div className='max-w-2xl mx-auto px-4'>
                  <div className='flex flex-col justify-start items-start mb-3'>
                    <h2 className='text-lg lg:text-2xl font-bold text-gray-900 dark:text-white'>
                      {t('comments.userReviews')}
                    </h2>
                  </div>
                  {isLoadingComments ? (
                    <Loader />
                  ) : (
                    <>
                      {authenticated && (
                        <form id='mainForm' onSubmit={handleSubmit} className='mb-6'>
                          <div className='flex flex-row items-center gap-1 mb-6'>
                            <StarsRaiting stars={commentForm.rating} onClick={handleRating} />
                          </div>
                          <div className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
                            <label htmlFor='comment' className='sr-only'>
                              {t('comments.writeComment')}
                            </label>
                            <textarea
                              id='comment'
                              value={commentForm.text}
                              name='text'
                              onChange={handleInput}
                              rows='6'
                              className='px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
                              placeholder={t('comments.writeComment')}
                              required
                            />
                          </div>
                          <div className='flex justify-end'>
                            <Button
                              type='submit'
                              primary
                              className='inline-flex justify-center items-center cursor-pointer text-center border border-transparent leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 shadow-sm text-white bg-slate-900 hover:bg-slate-700 dark:text-gray-50 dark:border-gray-800 dark:bg-slate-800 dark:hover:bg-slate-700 px-4 py-3 text-sm'
                            >
                              {t('common.submit')}
                            </Button>
                          </div>
                        </form>
                      )}
                      {_isEmpty(comments.comments) ? (
                        <NoComments t={t} />
                      ) : (
                        <div>
                          {_map(comments.comments, (item) => {
                            const commentDate = language === 'en'
                              ? dayjs(item.addedAt).locale(language).format('MMMM D, YYYY')
                              : dayjs(item.addedAt).locale(language).format('D MMMM, YYYY')

                            return (
                              <div key={item.id}>
                                <div className='py-2 mb-6 text-base'>
                                  <div className='flex justify-between items-center mb-2'>
                                    <div className='flex items-center'>
                                      <p className='mr-3 text-sm text-gray-900 dark:text-white'>
                                        {item.user.nickname}
                                      </p>
                                      <p className='text-sm text-gray-600 dark:text-gray-400'>
                                        <time
                                          dateTime={dayjs(item.addedAt).format('YYYY-MM-DD hh:mm:ss')}
                                          title={commentDate}
                                        >
                                          {commentDate}
                                        </time>
                                      </p>
                                    </div>
                                    <div>
                                      <CommentMenu removeItem={() => removeComment(item.id)} />
                                    </div>
                                  </div>
                                  <div className='my-2'>
                                    <StarsRaiting stars={item.rating} disabled />
                                  </div>
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
                                  {commentInputs === item.id && (
                                    <form
                                      id='replyForm'
                                      onSubmit={(e) => handleSubmit(e, item.id)}
                                      className='w-full flex flex-col items-end'
                                    >
                                      <textarea
                                        id='comment'
                                        rows='6'
                                        value={commentForm.reply}
                                        name='reply'
                                        onChange={handleInput}
                                        className='my-3 px-4 w-full text-sm text-gray-900 border-0 rounded-md focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
                                        placeholder={t('comments.writeComment')}
                                        required
                                      />
                                      <Button
                                        type='submit'
                                        primary
                                        className='inline-flex justify-center items-center cursor-pointer text-center border border-transparent leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 shadow-sm text-white bg-slate-900 hover:bg-slate-700 dark:text-gray-50 dark:border-gray-800 dark:bg-slate-800 dark:hover:bg-slate-700 px-4 py-3 text-sm'
                                      >
                                        {t('common.submit')}
                                      </Button>
                                    </form>
                                  )}
                                </div>

                                {!_isEmpty(item.replies) && (
                                  <div>
                                    {_map(item.replies, (reply) => {
                                      const replyDate = language === 'en'
                                        ? dayjs(reply.addedAt).locale(language).format('MMMM D, YYYY')
                                        : dayjs(reply.addedAt).locale(language).format('D MMMM, YYYY')

                                      return (
                                        <article
                                          key={reply.id}
                                          className='ml-3 lg:ml-12 text-base rounded-lg'
                                        >
                                          <footer className='flex justify-between items-center mb-2'>
                                            <div className='flex items-center'>
                                              <p className='mr-3 text-sm text-gray-900 dark:text-white'>
                                                {reply.user.nickname}
                                              </p>
                                              <p className='text-sm text-gray-600 dark:text-gray-400'>
                                                <time
                                                  dateTime={dayjs(reply.addedAt).format('YYYY-MM-DD hh:mm:ss')}
                                                  title={replyDate}
                                                >
                                                  {replyDate}
                                                </time>
                                              </p>
                                            </div>
                                            <div>
                                              <CommentMenu editItem={() => toggleEditReply(reply.id, reply.text)} removeItem={() => removeReply(item.id, reply.id)} />
                                            </div>
                                          </footer>
                                          {isEditReply === reply.id ? (
                                            <form
                                              id='editReplyForm'
                                              onSubmit={(e) => handleSubmit(e, item.id, reply.id)}
                                              className='w-full flex flex-col items-end'
                                            >
                                              <textarea
                                                id='comment'
                                                rows='6'
                                                value={commentForm.editReply}
                                                name='editReply'
                                                onChange={handleInput}
                                                className='my-3 px-4 w-full text-sm text-gray-900 border-0 rounded-md focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
                                                placeholder={t('comments.editReply')}
                                                required
                                              />
                                              <div className='flex gap-2'>
                                                <Button
                                                  onClick={() => toggleEditReply(reply.id, '')}
                                                  className='inline-flex justify-center items-center cursor-pointer text-center border border-transparent leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 shadow-sm text-white bg-slate-900 hover:bg-slate-700 dark:text-gray-50 dark:border-gray-800 dark:bg-slate-800 dark:hover:bg-slate-700 px-4 py-3 text-sm'
                                                  danger
                                                >
                                                  {t('common.cancel')}
                                                </Button>
                                                <Button
                                                  type='submit'
                                                  primary
                                                  className='inline-flex justify-center items-center cursor-pointer text-center border border-transparent leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 shadow-sm text-white bg-slate-900 hover:bg-slate-700 dark:text-gray-50 dark:border-gray-800 dark:bg-slate-800 dark:hover:bg-slate-700 px-4 py-3 text-sm'
                                                >
                                                  {t('common.submit')}
                                                </Button>
                                              </div>
                                            </form>
                                          ) : (
                                            <p className='text-gray-500 dark:text-gray-400'>
                                              {reply.text}
                                            </p>
                                          )}
                                        </article>
                                      )
                                    })}
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {pageAmount > 1 && (
                  <div className='mt-2'>
                    <Pagination
                      page={page}
                      setPage={setPage}
                      pageAmount={pageAmount || 0}
                      total={comments.count}
                      limit={ENTRIES_PER_PAGE_COMMENTS}
                    />
                  </div>
                )}
              </section>
            )}
          </div>
        </div>
      </Title>
    </>
  )
}

export default ExtensionPage
