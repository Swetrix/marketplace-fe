import React from 'react'
import { TrashIcon } from '@heroicons/react/outline'
import Button from '../../../../ui/Button'

const JsList = ({
  file,
  fileURL,
  removeFile,
  disabled,
}) => {

  if (file?.name || fileURL !== '') {
    return (
      <div className='flex justify-between mt-4'>
        <p>
          {file?.name ? file.name : fileURL}
        </p>
        <Button primary regular>

          <TrashIcon className='w-4 h-4 cursor-pointer'
                     onClick={() => {
                       if (!disabled) return removeFile(file)
                     }}
          />
        </Button>
      </div>
    )
  }
}

export default JsList
