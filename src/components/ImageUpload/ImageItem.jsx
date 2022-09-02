import React from 'react'
import { DocumentIcon, TrashIcon } from '@heroicons/react/outline'

const ImageItem = ({ file, deleteFile }) => {
  return (
    <li
      className='rounded flex my-4 items-center px-5 py-4'
      key={file?.name || file.filename}
    >
      {file.isUploading
        ? <DocumentIcon className='w-6 h-6' />
        : (
          <img className='w-10 h-8' alt={file.filename} src={`${process.env.REACT_APP_CDN_API_URL}file/${file.filename}`} />
        )}
      <p>{file?.name || file.filename}</p>
      <TrashIcon
        className='w-6 h-6 cursor-pointer'
        onClick={() => deleteFile(file)}
      />
    </li>
  )
}

export default ImageItem
