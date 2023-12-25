import React from 'react'
import _map from 'lodash/map'

const StarsRaiting = ({ stars = 0, disabled = false, onClick }) => {
  let currentStars = 0
  const [selectedStars, setSelectedStars] = React.useState(currentStars)

  if (stars) {
    currentStars = stars
  } else {
    currentStars = selectedStars
  }

  const handleStar = (index) => {
    if (!disabled) {
      setSelectedStars(index + 1)
      onClick(index + 1)
    }
  }

  return (
    <div className='flex flex-row flex-wrap justify-between max-w-[75px] w-full'>
      {_map(Array(5), (_, index) =>
        currentStars > index ? (
          <svg
            key={index}
            xmlns='http://www.w3.org/2000/svg'
            className={`w-[14px] h-[14px] text-yellow-400 ${
              disabled ? '' : ' dark:text-yellow-600 dark:hover:text-yellow-400 hover:text-yellow-200'
            }`}
            fill='currentColor'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='2'
            onClick={() => handleStar(index)}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
            />
          </svg>
        ) : (
          <svg
            key={index}
            xmlns='http://www.w3.org/2000/svg'
            className={`w-[14px] h-[14px] text-yellow-200  dark:text-yellow-600  ${
              disabled ? '' : 'dark:hover:text-yellow-400 hover:text-yellow-300'
            }`}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='2'
            onClick={() => handleStar(index)}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
            />
          </svg>
        ),
      )}
    </div>
  )
}

export default StarsRaiting
