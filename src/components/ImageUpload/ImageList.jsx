import React from 'react'
import _map from 'lodash/map'
import _isEmputy from 'lodash/isEmpty'
import ImageItem from './ImageItem'

const ImageList = ({ files, removeFile, isMainImage, isFile }) => {
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

  if (_isEmputy(files)) {
    return null
  }

  if (isFile) {
    return (
    <ul className='flex items-center justify-between flex-wrap'>
      <ImageItem
          file={files}
          deleteFile={() => deleteFileHandler(files)}
        />
    </ul>
    )
  }


  return (
    <ul className='flex items-center justify-between flex-wrap'>
      {
      isMainImage && !_isEmputy(files) ? (
        <ImageItem
          file={files}
          deleteFile={() => deleteFileHandler(files)}
        />
      )
        : files && _map(files, (file, index) => (
          <ImageItem
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
