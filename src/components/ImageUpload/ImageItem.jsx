import React from 'react'
import { DocumentIcon, TrashIcon } from '@heroicons/react/outline'

const ImageItem = ({ file, deleteFile }) => {
  return (
    <li
      className='rounded flex my-4 items-center px-5 py-4'
      key={file.name}
    >
      <DocumentIcon className='w-6 h-6' />
      <p>{file.name}</p>
      <div className='justify-self-end'>
        <div className='loading' />
        {file.isUploading && (
          <div className='w-6 h-6' onClick={() => deleteFile(file.name)}>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99' />
            </svg>
          </div>
        )}
        {!file.isUploading && (
          <TrashIcon
            onClick={() => deleteFile(file.name)}
          />
        )}
      </div>
    </li>
  )
}

export default ImageItem
