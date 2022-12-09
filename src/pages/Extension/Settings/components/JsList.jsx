import React from 'react'
import { TrashIcon, PencilAltIcon } from '@heroicons/react/outline'
import Button from '../../../../ui/Button'

const JsList = ({
  file,
  fileURL,
  removeFile,
  disabled,
  handleEditMode,
  isCodeEditing
}) => {

  if (file?.name || fileURL !== '') {
    return (
      <div className='flex justify-between mt-4'>
        <p>
          {file?.name ? file.name : fileURL}
        </p>
        <div>
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
              primary
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
