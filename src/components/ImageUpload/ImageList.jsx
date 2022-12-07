import React from 'react'
import _map from 'lodash/map'
import _isEmpty from 'lodash/isEmpty'
import ImageItem from './ImageItem'

const ImageList = ({ files, removeFile, isMainImage, isFile, disabled, url }) => {

  if (_isEmpty(files?.files || files)) {
    return null
  }

  if (isFile) {
    return (
    <ul className='flex items-center justify-between flex-wrap'>
      <ImageItem
          disabled={disabled}
          file={files}
          isFile={isFile}
          deleteFile={() => removeFile(files)}
        />
    </ul>
    )
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
