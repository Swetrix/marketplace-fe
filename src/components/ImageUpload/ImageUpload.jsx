import React from 'react'
import PropTypes from 'prop-types'
import Button from 'ui/Button'
import { nanoid } from 'nanoid'
import _isEmputy from 'lodash/isEmpty'

const ImageUpload = ({ files, setFiles, isMainImage, fileType }) => {
  const uploadHandler = async (event) => {
    const file = event.target.files[0]
    if (!file) return
    if (file?.length >= 5) return
    file.isUploading = true
    file.id = nanoid()
    const formData = new FormData()
    formData.append('file', file)
    setFiles(file)
  }

  return (
    <div className='bg-gray-200 dark:bg-gray-700 p-4 border-2 border-dashed border-[#cbd5e0] dark:border-gray-750 relative'>
      <input
        type={files?.length >= 5 ? 'hidden' : 'file'}
        className='absolute top-0 left-0 opacity-0 cursor-pointer z-20 w-full h-full'
        onChange={uploadHandler}
        accept={fileType === 'image' ? 'image/jpeg, image/jpg, image/png' : 'text/javascript'}
      />
      <div className='flex flex-col justify-center items-center'>
        <div className='relative mb-4'>
          <Button type='button' className={`${files?.length >= 5 ? 'cursor-not-allowed' : ''}`} primary regular>
            {isMainImage && !_isEmputy(files) ? 'Reset Image' : 'Upload Images'}
          </Button>
        </div>

        <p className='flex text-sm font-medium text-gray-700 dark:text-gray-200'>Supported files</p>
        <p className='flex text-sm font-medium text-gray-700 dark:text-gray-200'>
          {fileType === 'image' ? 'JPG and PNG images' : 'JavaScript'}
        </p>
      </div>
    </div>
  )
}

ImageUpload.propTypes = {
  files: PropTypes.array,
  setFiles: PropTypes.func,
  isMainImage: PropTypes.bool,
  fileType: PropTypes.oneOf(['image', 'javascript']),
}

ImageUpload.defaultProps = {
  files: [],
  setFiles: () => {},
  isMainImage: false,
  fileType: 'image',
}

export default ImageUpload
