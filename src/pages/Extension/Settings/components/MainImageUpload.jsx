import React from 'react'
import _isString from 'lodash/isString'
import Button from '../../../../ui/Button'
import _isEmpty from 'lodash/isEmpty'

const MainImageUpload = ({ fileReader, files, setFiles, isMainImage, fileType, disabled }) => {
  const uploadHandler = (event) => {
    console.log(event.target.files)
    fileReader(event.target.files)
  }

  return (
    <div className='bg-gray-200 dark:bg-gray-700 p-4 border-2 border-dashed border-[#cbd5e0] dark:border-gray-750 relative'>
      <input
        disabled={disabled}
        type={_isString(files) ? 'file' : files?.length >= 5 ? 'hidden' : 'file'}
        className='absolute top-0 left-0 opacity-0 cursor-pointer z-20 w-full h-full'
        onChange={uploadHandler}
        accept={ 'image/jpeg, image/jpg, image/png' }
      />
      <div className='flex flex-col justify-center items-center'>
        <div className='relative mb-4'>
          <Button type='button' className={_isString(files) ? '' : `${files?.length >= 5 ? 'cursor-not-allowed' : ''}`} primary regular>
            {isMainImage && !_isEmpty(files) ? 'Reset Image' : 'Upload Images'}
          </Button>
        </div>
        <p className='flex text-sm font-medium text-gray-700'>Supported files</p>
        <p className='flex text-sm font-medium text-gray-700'>
          {fileType === 'image' ? 'JPG and PNG images' : 'JavaScript'}
        </p>
      </div>
    </div>
  )
}

export default MainImageUpload
