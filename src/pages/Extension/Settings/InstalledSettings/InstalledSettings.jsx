import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { installExtension, deleteInstallExtension } from 'api'
import { useParams, useHistory } from 'react-router-dom'

import _find from 'lodash/find'
import _filter from 'lodash/filter'
import _map from 'lodash/map'

import routes from 'routes'

import Input from '../../../../ui/Input'
import Button from '../../../../ui/Button'


const InstalledSettings = ({ extensions, setInstallExtensions, generateError }) => {
  const { id } = useParams()
  const history = useHistory()
  const { t } = useTranslation()
  const extension = useMemo(() => _find(extensions, (extension) => extension.id === id), [extensions, id])
  const [idValue, setIdValue] = useState(extension?.projectId || '')

  const handleInput = (event) => {
    setIdValue(event.target.value)
  }

  const onSubmit = () => {
    if (idValue === extension?.projectId || idValue === '') {
      generateError(t('ExtensionSettings.errors.sameId'))
      return
    }

    installExtension(id, idValue)
      .then((response) => {
        if (response.status === 200) {
          const newExtensions = _filter(extensions, (extension) => extension.id !== id)
          setInstallExtensions(_map(newExtensions, (extension) => {
            if (extension.id === id) {
              return { ...extension, projectId: idValue }
            }
            return extension
          }
          ))
          history.push(routes.extensionSettings)
        }
      })
      .catch((error) => {
        generateError(error?.message || error)
      })
  }

  const onDelete = async () => {
    try {
      await deleteInstallExtension(id)
      setInstallExtensions(_filter(extensions, (extension) => extension.id !== id))
      history.push(routes.dashboard)
    } catch (error) {
      generateError(error?.message || error)
    }
  }

  return (
    <div className='min-h-min-footer bg-gray-50 dark:bg-slate-900 flex flex-col py-6 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl w-full mx-auto'>
        <Input
          onChange={handleInput}
          value={idValue}
          name='name'
          id='name'
          type='text'
          hint='Search your project in ID, if you want to install extension.'
          label="Project's ID"
        />
        <div className='flex justify-between mt-8 h-20 sm:h-min'>
          <div className='flex flex-wrap items-center'>
            <Button className='mr-2 border-indigo-100 dark:text-gray-50 dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600' primary regular onClick={onSubmit}>
              {t('common.save')}
            </Button>
            <Button type='submit' danger regular onClick={onDelete}>
              {t('common.uninstall')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstalledSettings
