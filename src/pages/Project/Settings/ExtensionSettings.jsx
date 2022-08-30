/* eslint-disable react/forbid-prop-types */
import React, {
  useState, useEffect, useMemo, memo,
} from 'react'
import { useLocation, useHistory, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import cx from 'clsx'
import _isEmpty from 'lodash/isEmpty'
import _size from 'lodash/size'
import _replace from 'lodash/replace'
import _find from 'lodash/find'
import _join from 'lodash/join'
import _isString from 'lodash/isString'
import _split from 'lodash/split'
import _keys from 'lodash/keys'
import _map from 'lodash/map'
import _includes from 'lodash/includes'
import PropTypes from 'prop-types'
import { ExclamationIcon } from '@heroicons/react/outline'

import Title from 'components/Title'
import { withAuthentication, auth } from 'hoc/protected'
import {
  createExtension, updateExtension, deleteExtension,
} from 'api'
import Input from 'ui/Input'
import Button from 'ui/Button'
import Checkbox from 'ui/Checkbox'
import Modal from 'ui/Modal'
import { nanoid } from 'utils/random'
import { trackCustom } from 'utils/analytics'
import routes from 'routes'

const MAX_NAME_LENGTH = 50
const MAX_ORIGINS_LENGTH = 300
const MAX_IPBLACKLIST_LENGTH = 300

const ExtensionSettings = ({
  updateExtensionFailed, createNewExtensionFailed, newExtension, extensionDelete, deleteExtensionFailed,
  loadExtensions, isLoading, extensions, showError, removeExtension, user, isPublishExtension, publishExtensions,
}) => {
  const { t } = useTranslation('common')
  const { pathname } = useLocation()
  const { id } = useParams()
  const extension = useMemo(() => _find([...extensions, ..._map(publishExtensions, (item) => item.extension)], p => p.id === id) || {}, [extensions, id, publishExtensions])
  const isSettings = !_isEmpty(id) && (_replace(routes.extension_settings, ':id', id) === pathname)
  const history = useHistory()

  const [form, setForm] = useState({
    name: '',
    id: id || nanoid(),
    public: false,
  })
  const [validated, setValidated] = useState(false)
  const [errors, setErrors] = useState({})
  const [beenSubmitted, setBeenSubmitted] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [extensionDeleting, setExtensionDeleting] = useState(false)
  const [extensionSaving, setExtensionSaving] = useState(false)

  useEffect(() => {
    if (!user.isActive) {
      showError(t('extension.settings.verify'))
      history.push(routes.dashboard)
    }

    if (!isLoading && isSettings && !extensionDeleting) {
      if (_isEmpty(extension) || extension?.uiHidden) {
        showError(t('extension.noExist'))
        history.push(routes.dashboard)
      } else {
        setForm({
          ...extension,
          ipBlacklist: _isString(extension.ipBlacklist) ? extension.ipBlacklist : _join(extension.ipBlacklist, ', '),
          origins: _isString(extension.origins) ? extension.origins : _join(extension.origins, ', '),
        })
      }
    }
  }, [user, extension, isLoading, isSettings, history, showError, extensionDeleting, t])

  const onSubmit = async (data) => {
    if (!extensionSaving) {
      setExtensionSaving(true)
      try {
        const formalisedData = {
          ...data,
          origins: _isEmpty(data.origins) ? null : _map(_split(data.origins, ','), (origin) => {
            try {
              if (_includes(origin, 'localhost')) {
                return origin
              }
              return new URL(origin).host
            } catch (e) {
              return origin
            }
          }),
          ipBlacklist: _isEmpty(data.ipBlacklist) ? null : _split(data.ipBlacklist, ','),
        }
        if (isSettings) {
          await updateExtension(id, formalisedData)
          newExtension(t('extension.settings.updated'))
        } else {
          await createExtension(formalisedData)
          trackCustom('extension_CREATED')
          newExtension(t('extension.settings.created'))
        }

        loadExtensions(isPublishExtension)
        history.push(routes.dashboard)
      } catch (e) {
        if (isSettings) {
          updateExtensionFailed(e)
        } else {
          createNewExtensionFailed(e)
        }
      } finally {
        setExtensionSaving(false)
      }
    }
  }

  const onDelete = async () => {
    setShowDelete(false)
    if (!extensionDeleting) {
      setExtensionDeleting(true)
      try {
        await deleteExtension(id)
        removeExtension(id, isPublishExtension)
        extensionDelete(t('extension.settings.deleted'))
        history.push(routes.dashboard)
      } catch (e) {
        deleteExtensionFailed(e)
      } finally {
        setExtensionDeleting(false)
      }
    }
  }

  const validate = () => {
    const allErrors = {}

    if (_isEmpty(form.name)) {
      allErrors.name = t('extension.settings.noNameError')
    }

    if (_size(form.name) > MAX_NAME_LENGTH) {
      allErrors.name = t('extension.settings.pxCharsError', { amount: MAX_NAME_LENGTH })
    }

    if (_size(form.origins) > MAX_ORIGINS_LENGTH) {
      allErrors.origins = t('extension.settings.oxCharsError', { amount: MAX_ORIGINS_LENGTH })
    }

    if (_size(form.ipBlacklist) > MAX_IPBLACKLIST_LENGTH) {
      allErrors.ipBlacklist = t('extension.settings.oxCharsError', { amount: MAX_IPBLACKLIST_LENGTH })
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

    setForm(oldForm => ({
      ...oldForm,
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

  const onCancel = () => {
    history.push(isSettings ? _replace(routes.extension, ':id', id) : routes.dashboard)
  }

  const title = isSettings ? `${t('extension.settings.settings')} ${form.name}` : t('extension.settings.create')

  return (
    <Title title={title}>
      <div
        className={cx('min-h-min-footer bg-gray-50 dark:bg-gray-800 flex flex-col py-6 px-4 sm:px-6 lg:px-8', {
          'pb-40': isSettings,
        })}
      >
        <form className='max-w-7xl w-full mx-auto' onSubmit={handleSubmit}>
          <h2 className='mt-2 text-3xl font-bold text-gray-900 dark:text-gray-50'>
            {title}
          </h2>
          <h3 className='mt-2 text-lg font-bold text-gray-900 dark:text-gray-50'>
            {t('profileSettings.general')}
          </h3>
          <Input
            name='name'
            id='name'
            type='text'
            label={t('extension.settings.name')}
            value={form.name}
            placeholder='My awesome extension'
            className='mt-4'
            onChange={handleInput}
            error={beenSubmitted ? errors.name : null}
          />
          <Input
            name='id'
            id='id'
            type='text'
            label={t('extension.settings.pid')}
            value={form.id}
            className='mt-4'
            onChange={handleInput}
            error={beenSubmitted ? errors.id : null}
            disabled
          />
          {isSettings ? (
            <>
              <Input
                name='origins'
                id='origins'
                type='text'
                label={t('extension.settings.origins')}
                hint={t('extension.settings.originsHint')}
                value={form.origins || ''}
                className='mt-4'
                onChange={handleInput}
                error={beenSubmitted ? errors.origins : null}
              />
              <Input
                name='ipBlacklist'
                id='ipBlacklist'
                type='text'
                label={t('extension.settings.ipBlacklist')}
                hint={t('extension.settings.ipBlacklistHint')}
                value={form.ipBlacklist || ''}
                className='mt-4'
                onChange={handleInput}
                error={beenSubmitted ? errors.ipBlacklist : null}
                isBeta
              />
              <Checkbox
                checked={Boolean(form.active)}
                onChange={handleInput}
                name='active'
                id='active'
                className='mt-4'
                label={t('extension.settings.enabled')}
                hint={t('extension.settings.enabledHint')}
              />
              <Checkbox
                checked={Boolean(form.public)}
                onChange={handleInput}
                name='public'
                id='public'
                className='mt-4'
                label={t('extension.settings.public')}
                hint={t('extension.settings.publicHint')}
              />
              <div className='flex justify-between mt-8 h-20 sm:h-min'>
                <div className='flex flex-wrap items-center'>
                  <Button className='mr-2 border-indigo-100 dark:text-gray-50 dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600' onClick={onCancel} secondary regular>
                    {t('common.cancel')}
                  </Button>
                  <Button type='submit' loading={extensionSaving} primary regular>
                    {t('common.save')}
                  </Button>
                </div>
                <div className='flex flex-wrap items-center justify-end'>
                  <Button className='ml-2' onClick={() => !extensionDeleting && setShowDelete(true)} loading={extensionDeleting} danger semiSmall>
                    <ExclamationIcon className='w-5 h-5 mr-1' />
                    {t('extension.settings.delete')}
                  </Button>
                </div>
              </div>
              <hr className='mt-2 sm:mt-5' />
            </>
          ) : (
            <p className='text-gray-500 dark:text-gray-300 italic mt-1 mb-4 text-sm'>
              {t('extension.settings.createHint')}
            </p>
          )}

          {!isSettings && (
            <div>
              <Button className='mr-2 border-indigo-100 dark:text-gray-50 dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600' onClick={onCancel} secondary regular>
                {t('common.cancel')}
              </Button>
              <Button type='submit' loading={extensionSaving} primary regular>
                {t('common.save')}
              </Button>
            </div>
          )}
        </form>
        <Modal
          onClose={() => setShowDelete(false)}
          onSubmit={onDelete}
          submitText={t('extension.settings.delete')}
          closeText={t('common.close')}
          title={t('extension.settings.qDelete')}
          message={t('extension.settings.deleteHint')}
          submitType='danger'
          type='error'
          isOpened={showDelete}
        />
      </div>
    </Title>
  )
}

ExtensionSettings.propTypes = {
  updateExtensionFailed: PropTypes.func.isRequired,
  createNewExtensionFailed: PropTypes.func.isRequired,
  newExtension: PropTypes.func.isRequired,
  extensionDelete: PropTypes.func.isRequired,
  deleteExtensionFailed: PropTypes.func.isRequired,
  loadExtensions: PropTypes.func.isRequired,
  extensions: PropTypes.arrayOf(PropTypes.object).isRequired,
  showError: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  isPublishExtension: PropTypes.bool.isRequired,
}

export default memo(withAuthentication(ExtensionSettings, auth.authenticated))
