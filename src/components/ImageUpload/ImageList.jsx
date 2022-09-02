import React from 'react'
import _map from 'lodash/map'
import { deleteFile } from 'api/cnd'
import ImageItem from './ImageItem'

const ImageList = ({ files, removeFile }) => {
  const deleteFileHandler = async (file) => {
    if (!file.isUploading) {
      await deleteFile(file.filename)
        .then(() => {
          removeFile(file.filename)
        })
        .catch((err) => console.error(err))
    } else {
      removeFile(file.name)
    }
  }

  return (
    <ul className='file-list'>
      {
        files && _map(files, file => (
          <ImageItem
            key={file?.name || file.filename}
            file={file}
            deleteFile={() => deleteFileHandler(file)}
          />
        ))
      }
    </ul>
  )
}

export default ImageList
