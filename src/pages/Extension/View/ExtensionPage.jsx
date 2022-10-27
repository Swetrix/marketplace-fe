import React from 'react'
import StarsRaiting from 'ui/StarsRaiting'
import Glider from 'react-glider'
import '../../../glider.css'

const ExtensionPage = () => {
  return (
    <div className='flex flex-col bg-gray-50 dark:bg-gray-800 py-6 px-4 sm:px-6 lg:px-8 min-h-min-footer-ad extensionPageGlider'>
      <div className='flex flex-col justify-between items-start pt-6 pl-6'>
        <div className='flex items-end'>
          <div className='flex justify-center items-center'>
            <img
              alt='Qries'
              src='https://www.qries.com/images/banner_logo.png'
              width='150'
              height='70'
            />
          </div>
          <div className='flex items-start flex-col pl-12'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50 break-words'>
              Swetrix Analytics
            </h2>
            <div className='flex flex-row gap-4 items-center'>
              <p className='font-semibold text-lg text-gray-900 dark:text-gray-50'>
                Simpson
              </p>
              <span> | </span>
              <p className='text-base text-gray-900 dark:text-gray-50'>
                61k installs
              </p>
              <span> | </span>
              <div className='flex flex-row items-center gap-1'>
                <StarsRaiting stars='3.5' />
              </div>
              <span> | </span>
              <p className='text-base text-gray-900 dark:text-gray-50'>9$</p>
            </div>
          </div>
          <div className='flex flex-row items-end pl-12'>
            <button
              className='rounded-md border !duration-300 transition-all w-full sm:max-w-[210px] h-9 flex items-center justify-center sm:mr-6 shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 border-transparent px-3'
              type='button'
            >
              Install
            </button>
          </div>
        </div>
        <div className='w-full max-w-[1200px] py-4'>
          <Glider
            hasArrows
            slidesToScroll={1}
            slidesToShow={2}
            scrollLock
            resizeLock
            // exactWidth
            rewind
          >
            <div className='glider-block border-2 border-white rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-900'>
              <img
                height='320'
                alt='Qries'
                className='rounded-lg'
                src='https://agencyanalytics.com/cache/images/asset/bWFpbi9oZXJvL2dvb2dsZS1hbmFseXRpY3MucG5n?fm=webp&bg=E5E8EE00&fit=crop&w=1248&h=892&q=90&s=66f16484bbc296a33cee392a97e48193'
              />
            </div>
            <div className='glider-block border-2 border-white rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-900'>
              <img
                height='320'
                alt='Qries'
                className='rounded-lg'
                src='https://ahrefs.com/blog/ru/wp-content/uploads/2022/02/Untitled-7.png'
              />
            </div>
            <div className='glider-block border-2 border-white rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-900'>
              <img
                height='320'
                alt='Qries'
                className='rounded-lg'
                src='https://neilpatel.com/wp-content/uploads/2017/01/googleanalytics.png'
              />
            </div>
            <div className='glider-block border-2 border-white rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-900'>
              <img
                height='320'
                alt='Qries'
                className='rounded-lg'
                src='https://neilpatel.com/wp-content/uploads/2017/01/image19-1.png'
              />
            </div>
            <div className='glider-block border-2 border-white rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-900'>
              <img
                height='320'
                alt='Qries'
                className='rounded-lg'
                src='https://neilpatel.com/wp-content/uploads/2017/01/image12-3.png'
              />
            </div>
          </Glider>
        </div>
      </div>
      <div className='flex flex-row w-full pt-5 pl-6 pb-6 gap-3'>
        <div className='relative bg-white dark:bg-gray-750 pt-5 px-4 min-h-72 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden pb-5'>
          <div className='flex items-center justify-between mb-2'>
            <h3 className='flex items-center text-lg leading-6 font-semibold text-gray-900 dark:text-gray-50'>
              Description
            </h3>
          </div>
          <p className='text-lg dark:text-gray-50'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
            deleniti reprehenderit alias quas consequuntur, rerum ea nam aliquid
            excepturi sint, est eligendi delectus! Quidem laboriosam,
            consequatur nihil corrupti officiis nostrum.
          </p>
        </div>
        <div className='relative bg-white dark:bg-gray-750 pt-5 px-4 min-h-72 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden pb-12'>
          <div className='flex items-center justify-between mb-2'>
            <h3 className='flex items-center text-lg leading-6 font-semibold text-gray-900 dark:text-gray-50'>
              Tags
            </h3>
          </div>
          <div className='flex flex-row gap-3 flex-wrap w-full'>
            <p className='rounded-lg border-2 flex-nowrap py-1 px-3 text-gray-900 dark:text-gray-50'>
              API
            </p>
            <p className='rounded-lg border-2 flex-nowrap py-1 px-3 text-gray-900 dark:text-gray-50'>
              API Client
            </p>
            <p className='rounded-lg border-2 flex-nowrap py-1 px-3 text-gray-900 dark:text-gray-50'>
              API Testing
            </p>
            <p className='rounded-lg border-2 flex-nowrap py-1 px-3 text-gray-900 dark:text-gray-50'>
              GraphQL
            </p>
            <p className='rounded-lg border-2 flex-nowrap py-1 px-3 text-gray-900 dark:text-gray-50'>
              keybindings
            </p>
            <p className='rounded-lg border-2 flex-nowrap py-1 px-3 text-gray-900 dark:text-gray-50'>
              OpenAPI
            </p>
            <p className='rounded-lg border-2 flex-nowrap py-1 px-3 text-gray-900 dark:text-gray-50'>
              REST
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExtensionPage
