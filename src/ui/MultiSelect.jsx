import React, { useState } from 'react'
import _map from 'lodash/map'

const MultiSelect = ({ onRemove, onSelect, items, labelExtractor, keyExtractor, label, hint }) => {
  const [selected, setSelected] = useState(false)
  return (
    <div className='w-full flex flex-col items-center mx-auto'>
      <div className='w-full'>
        <div className='flex flex-col items-center relative'>
          <div className='w-full  '>
            <div className='my-2 p-1 flex border border-gray-200 bg-white rounded '>
              <div className='flex flex-auto flex-wrap'>
                {_map(label, (item) => (
                  <div key={keyExtractor ? keyExtractor(item) : item} className='flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-indigo-700 bg-indigo-100 border border-indigo-300 '>
                    <div className='text-xs font-normal leading-none max-w-full flex-initial'>{labelExtractor ? labelExtractor(item) : item}</div>
                    <div className='flex flex-auto flex-row-reverse'>
                      <div onClick={() => onRemove(item)}>
                        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='feather feather-x cursor-pointer hover:text-indigo-400 rounded-full w-4 h-4 ml-2'>
                          <line x1='18' y1='6' x2='6' y2='18'></line>
                          <line x1='6' y1='6' x2='18' y2='18'></line>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200 '>
                <button onClick={() => setSelected(!selected)} className='cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='feather feather-chevron-up w-4 h-4'>
                    <polyline points='18 15 12 9 6 15'></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {selected && (
            <div className=' shadow top-100 bg-white z-40 w-full lef-0 rounded max-h-select overflow-y-auto '>
              <div className='flex flex-col w-full'>
                {_map(items, (item) => (
                  <div key={keyExtractor ? keyExtractor(item) + 'select' : item + 'select'} onClick={() => onSelect(item)} className='cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-indigo-100'>
                    <div className='flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-indigo-100'>
                      <div className='w-full items-center flex'>
                        <div className='mx-2 leading-6'>{labelExtractor ? labelExtractor(item) : item}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {hint && (
          <p className='mt-2 text-sm text-gray-500 dark:text-gray-300 whitespace-pre-line'>{hint}</p>
      )}
    </div>
  )
}

export default MultiSelect
