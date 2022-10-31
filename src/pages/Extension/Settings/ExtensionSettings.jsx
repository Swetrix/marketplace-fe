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
import _keys from 'lodash/keys'
import _toNumber from 'lodash/toNumber'
import _filter from 'lodash/filter'
import _forEach from 'lodash/forEach'
import PropTypes from 'prop-types'
import { ExclamationIcon } from '@heroicons/react/outline'

import Title from 'components/Title'
import ImageUpload from 'components/ImageUpload/ImageUpload'
import ImageList from 'components/ImageUpload/ImageList'

import { withAuthentication, auth } from 'hoc/protected'
import {
  createExtension, updateExtension, deleteExtension, getCategories,
} from 'api'
import Input from 'ui/Input'
import Textarea from 'ui/Textarea'
import Button from 'ui/Button'
import Checkbox from 'ui/Checkbox'
import Modal from 'ui/Modal'
import Select from 'ui/Select'
import { trackCustom } from 'utils/analytics'
import routes from 'routes'

const MAX_NAME_LENGTH = 50
const MAX_VERSION_LENGTH = 6

const ExtensionSettings = ({
  updateExtensionFailed, createNewExtensionFailed, newExtension, extensionDelete, deleteExtensionFailed,
  loadExtensions, isLoading, extensions, showError, removeExtension, user, isPublishExtension, publishExtensions,
}) => {
  const { t } = useTranslation('common')
  const { pathname } = useLocation()
  const { id } = useParams()
  const isSettings = !_isEmpty(id) && (_replace(routes.extension_settings, ':id', id) === pathname)
  const extension = useMemo(() => _find([...extensions, publishExtensions], p => p.id === id) || {}, [extensions, id, publishExtensions])
  const history = useHistory()
  const [form, setForm] = useState({
    name: '',
    additionalImages: [],
    price: 0,
    category: null,
  })
  const [validated, setValidated] = useState(false)
  const [errors, setErrors] = useState({})
  const [beenSubmitted, setBeenSubmitted] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [extensionDeleting, setExtensionDeleting] = useState(false)
  const [extensionSaving, setExtensionSaving] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories()
      .then(({ categories: resCategories }) => {
        setCategories(resCategories)
      })
      .catch(() => {
        showError(t('apiNotifications.somethingWentWrong'))
      })
  }, [showError]) // eslint-disable-line react-hooks/exhaustive-deps

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
        })
      }
    }
  }, [user, extension, isLoading, isSettings, history, showError, extensionDeleting, t])

  const removeFile = (rFiles, isMainImage, isFile) => {
    setForm((items) => {
      if (isFile) {
        return {
          ...items,
          file: {},
        }
      }
      if (isMainImage) {
        return {
          ...items,
          mainImage: {},
        }
      }
      return {
        ...items,
        additionalImages: _filter(items.additionalImages, file => {
          return file.isUploading ? file.id !== rFiles.id : file.filename !== rFiles.filename
        }),
      }
    })
  }

  const onSubmit = async (data) => {
    if (!extensionSaving) {
      setExtensionSaving(true)
      try {
        const formData = new FormData()
        formData.append('name', data.name)
        data.mainImage && formData.append('mainImage', data.mainImage)
        data.file && formData.append('file', data.file)
        _forEach(data.additionalImages, (file) => {
          formData.append('additionalImages', file)
        })
        formData.append('version', data.version)
        data.description && formData.append('description', data.description)
        if (data.category) {
          const categoryID = _find(categories, ({ name }) => name === form.category)?.id
          categoryID && formData.append('categoryID', categoryID)
        }
        if (isSettings) {
          await updateExtension(id, formData)
          newExtension(t('extension.settings.updated'))
        } else {
          await createExtension(formData)
          trackCustom('EXTENSION_CREATED')
          newExtension(t('extension.settings.created'))
        }

        loadExtensions(isPublishExtension)
        history.push(routes.dashboard)
      } catch (e) {
        console.error(e, 'error in extension settings')
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

    if (_size(form.version) > MAX_VERSION_LENGTH) {
      allErrors.version = t('extension.settings.pxCharsError', { amount: MAX_VERSION_LENGTH })
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

    if (target.name === 'price') {
      setForm({
        ...form,
        [target.name]: _toNumber(value),
      })
      return
    }

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
          <Input
            name='name'
            id='name'
            type='text'
            label={t('extension.settings.name')}
            hint={'Your extension\'s name without slogans or phrases (e.g. JSON Exporter, Map Beautifier).'}
            value={form.name}
            placeholder='My awesome extension'
            className='mt-4'
            onChange={handleInput}
            error={beenSubmitted ? errors.name : null}
          />
          <Textarea
            name='description'
            id='description'
            type='text'
            label={t('extension.settings.description')}
            value={form.description || ''}
            placeholder={'My extension does blah blah blah, it provides such great features as blah and blah.'}
            hint={'Here you should describe your extension in details. What does it do? How does it work? Add a features list, changelog, or whatever else you think best describes it.'}
            className='mt-4'
            onChange={handleInput}
            error={beenSubmitted ? errors.description : null}
          />
          <Input
            name='version'
            id='version'
            type='text'
            hint={(
              <span>
                This is the version identifier your customers will see when they install or upgrade to this version of your extension.
                <br />
                It should be specified using
                {' '}
                <a href='https://semver.org/' className='dark:text-indigo-400 text-indigo-700' target='_blank' rel='noopener noreferrer'>SemVer</a>
                .
              </span>
            )}
            label={t('extension.settings.version')}
            value={form.version || ''}
            placeholder='0.0.1'
            className='mt-4 mb-4'
            onChange={handleInput}
            error={beenSubmitted ? errors.version : null}
          />
          {/* <Input
            name='price'
            id='price'
            type='number'
            label={t('extension.settings.price')}
            value={`${form.price}` || ''}
            placeholder='0 (free), 1 (1$), 2 (2$)'
            className='mb-4'
            onChange={handleInput}
            error={beenSubmitted ? errors.price : null}
          /> */}
          <Select
            title={form.category || 'Select a category'}
            label={t('extension.settings.category')}
            hint='Select a category your extension belongs to.'
            className='w-full'
            items={categories}
            keyExtractor={item => item.id}
            labelExtractor={item => item.name}
            onSelect={(category) => setForm({ ...form, category })}
          />
          <div>
            <div className='flex text-sm font-medium text-gray-700 dark:text-gray-200 mt-4'>
              {t('extension.settings.mainImage')}
            </div>
            <ImageUpload
              files={form.mainImage}
              setFiles={(files) => {
                setForm((items) => ({ ...items, mainImage: files }))
              }}
              removeFile={(file) => removeFile(file, true)}
              isMainImage
            />
            <ImageList isMainImage files={form.mainImage} removeFile={(file) => removeFile(file, true)} />
            <p className='mt-2 text-sm text-gray-500 dark:text-gray-300 whitespace-pre-line'>
              The primary visual identity of your app.
              <br />
               - Please use a square image of at least <b>150x150</b> dimensions.
              <br />
                - The image <b>should not</b> be larger than <b>1000x1000</b> pixels.
            </p>
          </div>
          <div>
            <div className='flex text-sm font-medium text-gray-700 dark:text-gray-200 mt-4'>
              {t('extension.settings.additionalImages')}
            </div>
            <ImageUpload
              files={form.additionalImages}
              setFiles={(files) => {
                setForm((items) => ({ ...items, additionalImages: [...items.additionalImages, files] }))
              }}
              removeFile={removeFile}
            />
            <ImageList files={form.additionalImages} removeFile={removeFile} />
            <p className='mt-2 text-sm text-gray-500 dark:text-gray-300 whitespace-pre-line'>
              Add up to 5 images to display on your extension&apos;s summary page.
              <br />
              Most customers will decide to try an extension based off its gallery images.
              <br />
              <br />
              We recommend at least one screenshot which shows the extension on a site, and another which shows a closeup of the extensions visual components.
              <br />
              You can also create a sequence of images which walk the customer through the features of the app like slides in a slide deck.
              <br />
              - Avoid full screenshots as most customers will not be able to determine where the app appears.
              <br />
              - Trim excessive empty space around slide decks.
            </p>
          </div>
          <div>
            <div className='flex text-sm font-medium text-gray-700 dark:text-gray-200 mt-4'>
              The extension .js file
            </div>
            <ImageUpload
              files={form.file}
              setFiles={(files) => {
                setForm((items) => ({ ...items, file: files }))
              }}
              removeFile={removeFile}
              fileType='javascript'
            />
            <ImageList isFile files={form.file} removeFile={(file) => removeFile(file, false, true)} />
            <p className='mt-2 text-sm text-gray-500 dark:text-gray-300 whitespace-pre-line'>
              The extension .js file.
            </p>
          </div>
          {isSettings ? (
            <>
              <Checkbox
                checked={Boolean(form.active)}
                onChange={handleInput}
                name='active'
                id='active'
                className='mt-4'
                label={t('extension.settings.enabled')}
                hint={t('extension.settings.enabledHint')}
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
