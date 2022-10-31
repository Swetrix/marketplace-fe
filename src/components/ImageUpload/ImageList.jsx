import React from 'react'
import _map from 'lodash/map'
import _isEmpty from 'lodash/isEmpty'
import ImageItem from './ImageItem'

const ImageList = ({ files, removeFile, isMainImage, isFile, disabled }) => {
  const deleteFileHandler = async (file) => {
    if (!file.isUploading) {
      removeFile(file)
    //   await deleteFile(file.filename)
    //     .then(() => {
    //       removeFile(file.filename)
    //     })
    //     .catch((err) => console.error(err))
    } else {
      removeFile(file)
    }
  }

  if (_isEmpty(files)) {
    return null
  }

  if (isFile) {
    return (
    <ul className='flex items-center justify-between flex-wrap'>
      <ImageItem
          disabled={disabled}
          file={files}
          deleteFile={() => deleteFileHandler(files)}
        />
    </ul>
    )
  }


  return (
    <ul className='flex items-center justify-between flex-wrap'>
      {
      isMainImage && !_isEmpty(files) ? (
        <ImageItem
          disabled={disabled}
          file={files}
          deleteFile={() => deleteFileHandler(files)}
        />
      )
        : files && _map(files, (file, index) => (
          <ImageItem
            disabled={disabled}
            key={index + (file?.name || file.filename)}
            file={file}
            deleteFile={() => deleteFileHandler(file)}
          />
        ))
      }
    </ul>
  )
}

export default ImageList
