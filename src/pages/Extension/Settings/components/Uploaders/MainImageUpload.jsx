import React from 'react'
import Button from '../../../../../ui/Button'
import _isEmpty from 'lodash/isEmpty'

const MainImageUpload = ({files, setFiles, disabled }) => {
  const uploadHandler = (event) => {
    const file = event.target.files[0]
    if (!file) return
    file.isUploading = true
    const formData = new FormData()
    formData.append('file', file)
    setFiles(file)
  }

  return (
    <div className='dark:bg-slate-800 p-4 border-2 border-dashed border-gray-300 dark:border-slate-700/80 relative'>
      <input
        disabled={disabled}
        type='file'
        className='absolute top-0 left-0 opacity-0 cursor-pointer z-20 w-full h-full'
        onChange={uploadHandler}
        accept={ 'image/jpeg, image/jpg, image/png' }
      />
      <div className='flex flex-col justify-center items-center'>
        <div className='relative mb-4'>
          <Button type='button' primary regular>
            {!_isEmpty(files) ? 'Reset Image' : 'Upload Images'}
          </Button>
        </div>
        <p className='flex text-sm font-medium text-gray-700 dark:text-gray-200'>Supported files</p>
        <p className='flex text-sm font-medium text-gray-700 dark:text-gray-200'>
          JPG and PNG images
        </p>
      </div>
    </div>
  )
}

export default MainImageUpload
