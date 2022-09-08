import React from 'react'
import Button from 'ui/Button'
import { nanoid } from 'nanoid'
import _isEmputy from 'lodash/isEmpty'

const ImageUpload = ({ files, setFiles, isMainImage }) => {
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
    <div className='bg-gray-200 p-4 border-2 border-dashed border-[#cbd5e0] relative'>
      <input type={files?.length >= 5 ? 'hidden' : 'file'} className='absolute top-0 left-0 opacity-0 cursor-pointer z-20 w-full h-full' onChange={uploadHandler} />
      <div className='flex flex-col justify-center items-center'>
        <div className='relative mb-4'>
          <Button type='button' className={`${files?.length >= 5 ? 'cursor-not-allowed' : ''}`} primary regular>
            {isMainImage && !_isEmputy(files) ? 'Reset Image' : 'Upload Images'}
          </Button>
        </div>

        <p className='main'>Supported files</p>
        <p className='info'>GIF, JPG, PNG</p>
      </div>
    </div>
  )
}

export default ImageUpload
