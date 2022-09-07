import React from 'react'
import _map from 'lodash/map'
import ImageItem from './ImageItem'

const ImageList = ({ files, removeFile }) => {
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

  return (
    <ul className='flex items-center justify-between flex-wrap'>
      {
        files && _map(files, (file, index) => (
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
