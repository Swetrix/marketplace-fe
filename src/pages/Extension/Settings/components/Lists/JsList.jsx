import React from 'react'
import { TrashIcon, PencilAltIcon } from '@heroicons/react/outline'
import Button from '../../../../../ui/Button'
import { subStr } from '../../../../../utils/subStr'
import _isEmpty from 'lodash/isEmpty'

const JsList = ({
  file,
  fileURL,
  removeFile,
  disabled,
  handleEditMode,
  isCodeEditing
}) => {

  if (_isEmpty(file) && _isEmpty(fileURL)) return null

  if (file?.name || fileURL !== '') {
    return (
      <div className='flex justify-between flex-col sm:flex-row mt-4'>
        <p className='dark:text-gray-200 text-center border-2 mb-2 sm:mb-0 border-indigo-200 dark:border-indigo-700 bg-indigo-200 dark:bg-indigo-600 rounded px-0 sm:px-4 py-1'>
          {file?.name ? file.name : fileURL ? subStr(fileURL, 20) : fileURL}
        </p>
        <div className='flex mw-full sm: justify-between'>
          {!isCodeEditing && (
            <Button
              secondary
              regular
              onClick={() => handleEditMode()}
            >
              <PencilAltIcon className='w-4 h-4 cursor-pointer'/>
            </Button>
          )}

            <Button
              className='ml-2'
              semiDanger
              regular
              onClick={() => {
              if (!disabled) return removeFile(file)
            }}>
            <TrashIcon className='w-4 h-4 cursor-pointer'/>
          </Button>
        </div>
      </div>
    )
  }
}

export default JsList
