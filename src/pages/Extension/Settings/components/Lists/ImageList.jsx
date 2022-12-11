import React from 'react'
import _map from 'lodash/map'
import _isEmpty from 'lodash/isEmpty'
import _isString from 'lodash/isString'
import Button from '../../../../../ui/Button'
import { TrashIcon } from '@heroicons/react/outline'

const ImageItem = ({ file, deleteFile, disabled, url }) => {
  return (
    <li
      className='flex my-2 max-w-sm mx-auto items-center sm:px-2 py-3 relative'
      key={file?.name || file?.filename || file}
    >
      <div className='relative'>
        <img className='max-w-xs w-full max-h-[200px]' alt={file} src={!_isString(file) ? url : `${process.env.REACT_APP_CDN_URL}file/${file}`} />
        <div className='!absolute !top-1 !right-1'>
          <Button danger small
            onClick={() => {
              if (!disabled) return deleteFile(file)
            }}>
            <TrashIcon className='w-4 h-4 cursor-pointer' />
          </Button>
        </div>
      </div>
    </li>
  )
}

const ImageList = ({ files, removeFile, isMainImage, disabled, url }) => {

  if (_isEmpty(files?.files || files)) {
    return null
  }

  return (
    <ul className='flex items-center flex-wrap'>
      {
      isMainImage && !_isEmpty(files) ? (
        <ImageItem
          disabled={disabled}
          file={files}
          url={url}
          deleteFile={() => removeFile(files)}
        />
      )
        : !_isEmpty(files) && _map(files, (file, index) => (
          <ImageItem
            disabled={disabled}
            key={index + (file?.id || file)}
            file={file?.files || file}
            url={file?.url}
            deleteFile={() => removeFile(file.files || file)}
          />
        ))
      }
    </ul>
  )
}

export default ImageList
