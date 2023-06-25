import React from 'react'
import Button from '../../../../../ui/Button'
import { nanoid } from 'nanoid'
import _isString from 'lodash/isString'

const JsFileUpload = ({ disabled, files, setFiles, setIsBeenChanged }) => {
  const uploadHandler = async (event) => {
    const file = event.target.files[0]
    if (!file) return
    if (!_isString(files)) {
      if (file?.length >= 5) return
    }
    file.isUploading = true
    file.id = nanoid()
    const formData = new FormData()
    formData.append('file', file)
    setFiles(file)
    setIsBeenChanged(true)
  }

  return (
    <div className='dark:bg-slate-800 p-4 border-2 border-dashed border-gray-300 dark:border-slate-700/80 relative'>
      <input
        disabled={disabled}
        type='file'
        className='absolute top-0 left-0 opacity-0 cursor-pointer z-20 w-full h-full'
        onChange={uploadHandler}
        accept={'text/javascript'}
      />
      <div className='flex flex-col justify-center items-center'>
        <div className='relative mb-4'>
          <Button type='button' className={`${files?.length >= 5 ? 'cursor-not-allowed' : ''}`} primary regular>
            Upload File
          </Button>
        </div>
        <p className='flex text-sm font-medium text-gray-700 dark:text-gray-300'>
          Supported files
        </p>
        <p className='flex text-sm font-medium text-gray-700 dark:text-gray-300'>
          JavaScript
        </p>
      </div>
    </div>
  )
}

export default JsFileUpload
