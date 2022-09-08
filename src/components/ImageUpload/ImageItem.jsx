import React from 'react'
import { DocumentIcon, TrashIcon } from '@heroicons/react/outline'
import cx from 'clsx'

const ImageItem = ({ file, deleteFile }) => {
  const subStr = (string, len) => {
    if (string.length > len) {
      return `${string.substring(0, len)}...`
    }
    return string
  }

  return (
    <li
      className={cx('flex my-2 max-w-sm mx-auto items-center px-2 py-3', {
        'border-2 border-indigo-200 dark:border-indigo-500 bg-indigo-200 dark:bg-indigo-400 rounded': file.isUploading,
      })}
      key={file?.name || file.filename}
    >
      {file.isUploading
        ? (
          <div className='flex items-center mx-auto'>
            <DocumentIcon className='h-5 w-5 text-gray-700 mr-2' />
            <p>{subStr(file?.name || file.filename, 33)}</p>
            <TrashIcon
              className='w-5 h-5 cursor-pointer text-gray-700 ml-2'
              onClick={() => deleteFile(file)}
            />
          </div>
        )
        : (
          <div className='relative'>
            <img className='max-w-xs max-h-[200px]' alt={file.filename} src={`file/${file.filename}`} />
            <TrashIcon
              className='w-6 h-6 cursor-pointer absolute top-0 right-0 bg-white border-2 p-1 rounded-sm border-gray-900'
              onClick={() => deleteFile(file)}
            />
          </div>
        )}
    </li>
  )
}

export default ImageItem
