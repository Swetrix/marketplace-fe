import React from 'react'
import Button from 'ui/Button'
import { PlusIcon } from '@heroicons/react/outline'
import { uploadFile } from 'api/cnd'

const ImageUpload = ({ files, setFiles, removeFile }) => {
  const uploadHandler = async (event) => {
    const file = event.target.files[0]
    if (!file) return
    file.isUploading = true
    setFiles([...files, file])

    // upload file
    const formData = new FormData()
    formData.append('file', file)
    formData.append('token', process.env.REACT_APP_CDN_API_TOKEN)

    await uploadFile(formData)
      .then((res) => {
        console.log(res)
        file.isUploading = false
        setFiles([...files, file])
      })
      .catch((err) => {
        // inform the user
        console.error(err)
        removeFile(file.name)
      })
  }

  return (
    <div className='bg-gray-200 p-4 border-2 border-dashed border-[#cbd5e0] relative'>
      <input type='file' className='absolute top-0 left-0 opacity-0 cursor-pointer z-20 w-full h-full' onChange={uploadHandler} />
      <div className='flex flex-col justify-center items-center'>
        <div className='relative mb-6'>
          <Button primary>
            <PlusIcon className='w-6 h-6 mr-3' />
            Upload
          </Button>
        </div>

        <p className='main'>Supported files</p>
        <p className='info'>PDF, JPG, PNG</p>
      </div>
    </div>
  )
}

export default ImageUpload
