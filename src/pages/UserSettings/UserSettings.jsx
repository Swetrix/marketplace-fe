import React, {
  useState, useEffect, memo,
} from 'react'
import { useSelector } from 'react-redux'
import _size from 'lodash/size'
import _isEmpty from 'lodash/isEmpty'
import _keys from 'lodash/keys'
import PropTypes from 'prop-types'
import Title from 'components/Title'
import Input from 'ui/Input'
import Button from 'ui/Button'
import Modal from 'ui/Modal'
import {
  isValidEmail, isValidPassword, MIN_PASSWORD_CHARS,
} from 'utils/validator'

const UserSettings = ({
  onSubmit, t,
}) => {
  const { user } = useSelector(state => state.auth)

  const [form, setForm] = useState({
    email: user.email || '',
    nickname: user.nickname || '',
  })
  const [validated, setValidated] = useState(false)
  const [errors, setErrors] = useState({})
  const [beenSubmitted, setBeenSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const validate = () => {
    const allErrors = {}

    if (!isValidEmail(form.email)) {
      allErrors.email = t('auth.common.badEmailError')
    }

    if (_size(form.password) > 0 && !isValidPassword(form.password)) {
      allErrors.password = t('auth.common.xCharsError', { amount: MIN_PASSWORD_CHARS })
    }

    if (form.password !== form.repeat) {
      allErrors.repeat = t('auth.common.noMatchError')
    }

    if (_size(form.nickname) < 3) {
      allErrors.nickname = t('auth.common.xCharsError', { amount: 3 })
    }

    const valid = _isEmpty(_keys(allErrors))

    setErrors(allErrors)
    setValidated(valid)
  }

  useEffect(() => {
    validate()
  }, [form]) // eslint-disable-line

  const handleInput = event => {
    const { target } = event
    const value = target.type === 'checkbox' ? target.checked : target.value

    setForm(prevForm => ({
      ...prevForm,
      [target.name]: value,
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    e.stopPropagation()
    setBeenSubmitted(true)

    if (validated) {
      onSubmit(form)
    }
  }

  return (
    <Title title={t('titles.profileSettings')}>
      <div className='min-h-min-footer bg-gray-50 dark:bg-slate-900 flex flex-col py-6 px-4 sm:px-6 lg:px-8'>
        <form className='max-w-7xl w-full mx-auto' onSubmit={handleSubmit}>
          <div className='flex items-end justify-between'>
            <h2 className='mt-2 text-3xl font-bold text-gray-900 dark:text-gray-50'>
              {t('titles.profileSettings')}
            </h2>
            <a
              className='bg-indigo-500 dark:bg-indigo-600 text-gray-300 rounded hover:bg-indigo-600 dark:hover:bg-indigo-700 px-4 py-2 text-sm font-medium ml-3'
              href={`${process.env.REACT_APP_FE_URL}settings`}
              target='_blank'
              rel='noopener noreferrer'
            >
              {t('profileSettings.other')}
            </a>
          </div>
          <h3 className='mt-2 text-lg font-bold text-gray-900 dark:text-gray-50'>
            {t('profileSettings.general')}
          </h3>
          <Input
            name='email'
            id='email'
            type='email'
            label={t('auth.common.email')}
            value={form.email}
            placeholder='you@example.com'
            className='mt-4'
            disabled
          // onChange={handleInput}
          // error={beenSubmitted ? errors.email : null}
          />
          <Input
            name='nickname'
            id='nickname'
            type='text'
            label='Nickname'
            value={form.nickname}
            placeholder='you name'
            className='mt-4'
            onChange={handleInput}
            error={beenSubmitted ? errors.nickname : null}
          />
          <hr className='mt-5 border-gray-200 dark:border-gray-600' />
          <div className='flex justify-between mt-4'>
            <Button
              large
              primary
              type='submit'
            >
              {t('profileSettings.update')}
            </Button>
          </div>
        </form>
        <Modal
          onClose={() => { setError('') }}
          closeText={t('common.gotIt')}
          type='error'
          title={t('common.error')}
          message={error}
          isOpened={Boolean(error)}
        />
      </div>
    </Title>
  )
}

UserSettings.propTypes = {
  t: PropTypes.func.isRequired,
}

export default memo(UserSettings)
