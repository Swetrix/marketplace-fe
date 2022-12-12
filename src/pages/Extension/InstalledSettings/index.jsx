import React, { useCallback, useEffect, useState } from 'react'
import _map from 'lodash/map'
import Select from '../../../ui/Select'
import Checkbox from '../../../ui/Checkbox'
import Title from '../../../components/Title'
import Input from '../../../ui/Input'
import Button from '../../../ui/Button'
import { ExclamationIcon } from '@heroicons/react/outline'
import { debounce } from 'lodash'

const testArr = [
  '02424xsxjh678089653879',
  '0242467xsxs9653879',
  'vhvdbdjvk98940-3-skmx',
  'cjdhjvchskc840-02=4cks',
  'chbcjd988cdbnj3vhjbkcs',
  'chbcjd98scf2800cshjbkcs',
  'kjbvodb8929omdn2tcqp',
  'cusv9c890-3mvc3cb-20',
  'vd787v090l3p7v7809-0v',
  'cjbsknc9s7697708mcsl-987',
  'jcdbcydcdhjnm-0-9094fcbjsk',
  'cdkncdbc39090',
  'cjbdhcbdjn0894703incjd',
  'cjbxsb77jn0894703incjd',
]

const InstalledSettings = () => {
  const [allProject, setAllProjects] = useState([])
  const [idValue, setIdValue] = useState('')
  const [checkboxChanges, setCheckBoxChanges] = useState([])

  useEffect(() => {
    console.log(idValue)
    const foundProject = testArr.filter(item => item.includes(idValue))
    setAllProjects(foundProject)
  }, [idValue])

  const handleInput = (event) => {
    setIdValue(event.target.value)
  }

  return (
    <div className='min-h-min-footer max-w-7xl mx-auto pt-10'>
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
            <Button className='mr-2 border-indigo-100 dark:text-gray-50 dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600' primary regular>
              {/* {t('common.cancel')} */}
              Save
            </Button>
            <Button type='submit' danger regular>
              {/* {t('common.save')} */}
              Uninstall
            </Button>
          </div>
        </div>
    </div>
  )
}

export default InstalledSettings
