import React from 'react'
import { DocumentIcon, TrashIcon } from '@heroicons/react/outline'
import cx from 'clsx'
import _isString from 'lodash/isString'
import Button from '../../ui/Button'

const ImageItem = ({ file, deleteFile, disabled, url, isFile }) => {
  const subStr = (string, len) => {
    if (string.length > len) {
      return `${string.substring(0, len)}...`
    }
    return string
  }

  if (isFile) {
    return (
      <li
        className={cx('flex my-2 max-w-sm mx-auto items-center px-2 py-3 relative', {
          'border-2 border-indigo-200 dark:border-indigo-500 bg-indigo-200 dark:bg-indigo-400 rounded': file?.isUploading,
        })}
        key={file?.name || file?.filename || file}
      >
        <div className='flex items-center mx-auto pr-10'>
          <DocumentIcon className='h-5 w-5 text-gray-700 mr-2' />
          <p>{subStr(file?.name || file, 33)}</p>
          <Button primary  className='absolute top-[6px] right-1'>
            <TrashIcon className='w-4 h-4 cursor-pointer'
              onClick={() => {
                if (!disabled) return deleteFile(file)
              }}
            />
          </Button>
        </div>
      </li>
    )
  }

  return (
    <li
      className='flex my-2 max-w-sm mx-auto items-center px-2 py-3 relative'
      key={file?.name || file?.filename || file}
    >
      <div className='relative'>
        <img className='max-w-xs max-h-[200px]' alt={file} src={!_isString(file) ? url : `${process.env.REACT_APP_CDN_URL}file/${file}`} />
        <Button secondary regular className='absolute top-1 right-1'
          onClick={() => {
            if (!disabled) return deleteFile(file)
          }}>
          <TrashIcon className='w-4 h-4 cursor-pointer' />
        </Button>
      </div>
    </li>
  )
}

export default ImageItem
