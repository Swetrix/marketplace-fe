/* eslint-disable react/forbid-prop-types */
import React, {
  useState, useEffect, useMemo, memo, useCallback,
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
import { nanoid } from 'nanoid'
import {
  ExclamationIcon,
} from '@heroicons/react/outline'

import Title from 'components/Title'

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
import MainImageUpload from './components/Uploaders/MainImageUpload'
import _isString from 'lodash/isString'
import AdditionalImageUpload from './components/Uploaders/AdittionalImageUpload'
import JsFileUpload from './components/Uploaders/JsFileUpload'
import CodeEditor from '../../../components/CodeEditor'
import JsList from './components/Lists/JsList'
import ImageList from './components/Lists/ImageList'

const MAX_NAME_LENGTH = 50
const FILE_TYPE = {
  MAIN_IMAGE: 'mainImage',
  ADDITIONAL_IMAGES: 'additionalImages',
  FILE: 'file',
}
const VERSION_TYPE = {
  NOTHING: '',
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'major',
}
const VERSION_TYPE_LIST = [
  {
    value: VERSION_TYPE.NOTHING,
    label: 'Nothing',
  },
  {
    value: VERSION_TYPE.PATCH,
    label: 'Patch',
  },
  {
    value: VERSION_TYPE.MINOR,
    label: 'Minor',
  },
  {
    value: VERSION_TYPE.MAJOR,
    label: 'Major',
  },
]

const ExtensionSettings = ({
  updateExtensionFailed, createNewExtensionFailed, newExtension, extensionDelete, deleteExtensionFailed,
  loadExtensions, isLoading, showError, removeExtension, user, isPublishExtension, publishExtensions,
  setExtensions,
}) => {
  const { t } = useTranslation('common')
  const { pathname } = useLocation()
  const { id } = useParams()
  const isSettings = !_isEmpty(id) && (_replace(routes.extension_settings, ':id', id) === pathname)
  const extension = useMemo(() => _find(publishExtensions, p => p.id === id) || {}, [id, publishExtensions])
  const history = useHistory()
  const [form, setForm] = useState({
    name: '',
    additionalImages: [],
    mainImageUrl: '',
    version: '',
    price: 0,
    file: {},
    category: null,
  })
  const [validated, setValidated] = useState(false)
  const [errors, setErrors] = useState({})
  const [beenSubmitted, setBeenSubmitted] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [extensionDeleting, setExtensionDeleting] = useState(false)
  const [extensionSaving, setExtensionSaving] = useState(false)

  const [isBeenChanged, setIsBeenChanged] = useState(false)
  const [categories, setCategories] = useState([])
  const [isEditCode, setIsEditCode] = useState(false)
  const [isWarningCodeSave, setIsWarningCodeSave] = useState(false)
  const [code, setCode] = useState('')

  useEffect(() => {
    if (isWarningCodeSave){
      setTimeout(()=> setIsWarningCodeSave(false), 4000)
    }
  }, [isWarningCodeSave])

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
          category: extension.category?.name,
        })
      }
    }
  }, [user, extension, isLoading, isSettings, history, showError, extensionDeleting, t])

  const loadExtensionsFile = useCallback(async () => {
    await fetch(`${process.env.REACT_APP_CDN_URL}file/${form.fileURL}`)
      .then(response => response.text())
      .then(text => setCode(text))
      .catch(error => console.log(error))
  }, [form.fileURL])

  const javascriptFileReader = useCallback(() => {
    const reader = new FileReader()
    reader.readAsText(form.file)
    reader.onload = () => {
      setCode(reader.result)
    }
    reader.onerror = () => {
      setCode('Your file have not been read')
    }
  }, [form.file])

  useEffect(() => {
    if (isEditCode) {
      if (!isBeenChanged) {
        loadExtensionsFile()
      } else {
        javascriptFileReader()
      }
    }
  }, [form.fileURL, form.file, isEditCode, isBeenChanged, loadExtensionsFile, javascriptFileReader])

  const onChangeCodeValue = (value) => setCode(value)

  const onClickEditCode = () => setIsEditCode(true)

  const onClickSaveCode = () => {
    const editingFile = new File([code], form.file?.name ? form.file?.name : form.fileURL, { type: 'text/javascript' })
    editingFile.isUploading = true
    editingFile.id = nanoid()
    setForm((items) => ({ ...items, file: editingFile }))
    setIsEditCode(false)
    setIsBeenChanged(true)
  }

  const removeFile = (rFiles, type) => {
    setForm((items) => {
      switch (type) {
        case FILE_TYPE.MAIN_IMAGE:
          return {
            ...items,
            mainImage: {},
            mainImageUrl: '',
          }
        case FILE_TYPE.ADDITIONAL_IMAGES:
          return {
            ...items,
            additionalImages: _filter(items.additionalImages, file => {
              return file?.files?.isUploading ? file.files.id !== rFiles.id : file !== rFiles
            }),
          }
        case FILE_TYPE.FILE:
          setIsEditCode(false)
          return {
            ...items,
            file: {},
            fileURL: ''
          }
        default:
          return items
      }
    })
  }

  const onSubmit = async (data) => {
    if (!extensionSaving) {
      setExtensionSaving(true)
      try {
        const formData = new FormData()
        formData.append('name', data.name)
        if (!_isString(data.mainImage)) {
          data.mainImage && formData.append('mainImage', data.mainImage)
        }
        if (!_isString(data.file)) {
          !_isEmpty(data.file) && formData.append('file', data.file)
        }
        _forEach(data.additionalImages, (file) => {
          if (!_isString(file)) {
            formData.append('additionalImages', file?.files)
          } else {
            formData.append('additionalImagesCdn', file)
          }
        })
        data.description && formData.append('description', data.description)
        if (data.category) {
          const categoryID = _find(categories, ({ name }) => name === form.category)?.id
          categoryID && formData.append('categoryID', categoryID)
        }
        if (isSettings) {
          if (data.version !== extension.version) {
            formData.append('version', data.version)
          } else {
            formData.append('version', '')
          }
          await updateExtension(id, formData)
            .then(() => {
              newExtension(t('extension.settings.updated'))
            })
        } else {
          await createExtension(formData)
            .then(() => {
              trackCustom('EXTENSION_CREATED')
              newExtension(t('extension.settings.created'))
            })
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

    if (form.version !== '' && _isString(form.fileUrl)) {
      allErrors.version = 'please upload a new or edit file to update the version'
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

    if (!isEditCode) {
      if (validated) {
        onSubmit(form)
      }
    }else{
      setIsWarningCodeSave(true)
      showError(t('extension.settings.noSaveCode'))
    }

  }

  const onCancel = () => history.push(isSettings ? _replace(routes.extension, ':id', id) : routes.dashboard)

  const title = isSettings ? `${t('extension.settings.settings')} ${form.name}` : t('extension.settings.create')

  const fileReader = (file) => window.URL.createObjectURL(file)

  return (
    <Title title={title}>
      <div
        className={cx('min-h-min-footer bg-gray-50 dark:bg-gray-800 flex flex-col py-6 px-4 sm:px-6 lg:px-8', {
          'pb-40': isSettings,
        })}
      >
        <form className='max-w-7xl w-full mx-auto' onSubmit={handleSubmit}>
          <h2 className='mt-2 text-xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50'>
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
          {isSettings && (
            <Select
              name='version'
              id='version'
              title={form.version || 'Select a changes'}
              label={t('extension.settings.version')}
              hint={(
                <span>
                  This is the version identifier your customers will see when they install or upgrade to this version of your extension.
                  <br />
                  It should be specified using
                  {' '}
                  <a href='https://semver.org/' className='dark:text-indigo-400 text-indigo-700' target='_blank' rel='noopener noreferrer'>SemVer</a>
                  .
                  {''}
                  <br />
                  Please upload or update file before changing version.
                  By default, the latest version is selected.
                </span>
              )}
              className='mt-4 mb-4'
              items={VERSION_TYPE_LIST}
              keyExtractor={item => item.value}
              labelExtractor={item => item.label}
              onSelect={(version) => setForm((oldForm) => {
                switch (version) {
                  case VERSION_TYPE_LIST[0].label:
                    return {
                      ...oldForm,
                      version: VERSION_TYPE_LIST[0].value,
                    }
                  case VERSION_TYPE_LIST[1].label:
                    return {
                      ...oldForm,
                      version: VERSION_TYPE_LIST[1].value,
                    }
                  case VERSION_TYPE_LIST[2].label:
                    return {
                      ...oldForm,
                      version: VERSION_TYPE_LIST[2].value,
                    }
                  case VERSION_TYPE_LIST[3].label:
                    return {
                      ...oldForm,
                      version: VERSION_TYPE_LIST[3].value,
                    }
                  default:
                    return oldForm
                }
              })}
              error={beenSubmitted ? errors.version : null}
            />
          )}
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
            <MainImageUpload
              files={form.mainImage}
              disabled={showDelete}
              setFiles={(files) => {
                setForm((items) => ({ ...items, mainImage: files, mainImageUrl: fileReader(files) }))
              }}
            />
            <ImageList
              disabled={showDelete}
              isMainImage
              files={form.mainImage}
              url={form.mainImageUrl}
              removeFile={(file) => removeFile(file, FILE_TYPE.MAIN_IMAGE)}
            />
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
            <AdditionalImageUpload
              disabled={showDelete}
              files={form.additionalImages}
              setFiles={(files) => {
                setForm((items) => ({ ...items, additionalImages: [...items.additionalImages, { files: files, url: fileReader(files) }] }))
              }}
            />
            <ImageList
              disabled={showDelete}
              files={form.additionalImages}
              removeFile={(file) => removeFile(file, FILE_TYPE.ADDITIONAL_IMAGES)}
            />
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
            <JsFileUpload
              disabled={showDelete}
              files={form.file}
              setFiles={(files) => setForm((items) => ({ ...items, file: files, fileURL: files.name }))}
              removeFile={(file) => removeFile(file, FILE_TYPE.FILE)}
              fileType='javascript'
              setIsBeenChanged={setIsBeenChanged}
            />
            <JsList
              file={form.file}
              fileURL={form.fileURL}
              disabled={showDelete}
              isCodeEditing={isEditCode}
              handleEditMode={onClickEditCode}
              removeFile={(file) => removeFile(file, FILE_TYPE.FILE)}
            />
            <p className='mt-2 text-sm text-gray-500 dark:text-gray-300 whitespace-pre-line'>
              The extension .js file.
            </p>
          </div>

          {isEditCode && <CodeEditor isWarningCodeSave={isWarningCodeSave} code={code} onChangeCodeValue={onChangeCodeValue} onClickSaveCode={onClickSaveCode} />}
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
          onSubmit={(e) => {
            e.stopPropagation()
            e.preventDefault()
            onDelete()
          }}
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
  showError: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  isPublishExtension: PropTypes.bool.isRequired,
}

export default memo(withAuthentication(ExtensionSettings, auth.authenticated))
