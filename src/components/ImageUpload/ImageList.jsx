import React from 'react'
import _map from 'lodash/map'
import { deleteFile } from 'api/cnd'
import ImageItem from './ImageItem'

const ImageList = ({ files, removeFile }) => {
  const deleteFileHandler = async (_name) => {
    await deleteFile(_name)
      .then((res) => {
        console.log(res)
        removeFile(_name)
      })
      .catch((err) => console.error(err))
  }

  return (
    <ul className='file-list'>
      {
        files && _map(files, f => (
          <ImageItem
            key={f.name}
            file={f}
            deleteFile={deleteFileHandler}
          />
        ))
      }
    </ul>
  )
}

export default ImageList
