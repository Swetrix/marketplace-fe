import HalfStarFinal from 'pages/photo/HalfStarFinal'
import React from 'react'

const ExtensionPage = () => {
  return (
    <div className='flex flex-col bg-gray-50 dark:bg-gray-800 py-6 px-4 sm:px-6 lg:px-8 min-h-min-footer-ad'>
      <div className='flex flex-row pt-6 pl-6'>
        <div className='flex justify-center items-center'>
          <img
            alt='Qries'
            src='https://www.qries.com/images/banner_logo.png'
            width='150'
            height='70'
          />
        </div>
        <div className='flex flex-col pl-12'>
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
              <HalfStarFinal />
              <HalfStarFinal />
              <HalfStarFinal />
              <HalfStarFinal />
              <HalfStarFinal />
            </div>
            <span> | </span>
            <p className='text-base text-gray-900 dark:text-gray-50'>9$</p>
          </div>
        </div>
        <div className='flex flex-row items-center pl-12'>
          <button
            className='rounded-md border !duration-300 transition-all w-full sm:max-w-[210px] h-12 flex items-center justify-center sm:mr-6 shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 border-transparent px-3'
            type='button'
          >
            Install
          </button>
        </div>
      </div>
      <div className='pl-5 pt-5 pb-20'>
        <div className='flex flex-row gap-6 pl-6 pt-10'>
          <img
            alt='Qries'
            src='https://agencyanalytics.com/cache/images/asset/bWFpbi9oZXJvL2dvb2dsZS1hbmFseXRpY3MucG5n?fm=webp&bg=E5E8EE00&fit=crop&w=1248&h=892&q=90&s=66f16484bbc296a33cee392a97e48193'
            width='200'
            height='100'
          />
          <img
            alt='Qries'
            src='https://ahrefs.com/blog/ru/wp-content/uploads/2022/02/Untitled-7.png'
            width='200'
            height='100'
          />
          <img
            alt='Qries'
            src='https://neilpatel.com/wp-content/uploads/2017/01/googleanalytics.png'
            width='200'
            height='100'
          />
          <img
            alt='Qries'
            src='https://neilpatel.com/wp-content/uploads/2017/01/image19-1.png'
            width='200'
            height='100'
          />
          <img
            alt='Qries'
            src='https://neilpatel.com/wp-content/uploads/2017/01/image12-3.png'
            width='200'
            height='100'
          />
        </div>
      </div>
      <div className='flex flex-row w-full pt-5 pl-6 pb-6 gap-5'>
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
          <div className='flex flex-row gap-5 flex-wrap w-full'>
            <p className='rounded-lg border-2 flex-nowrap pt-2 pl-2 pr-2 pb-2 text-gray-900 dark:text-gray-50'>
              API
            </p>
            <p className='rounded-lg border-2 flex-nowrap pt-2 pl-2 pr-2 pb-2 text-gray-900 dark:text-gray-50'>
              API Client
            </p>
            <p className='rounded-lg border-2 flex-nowrap pt-2 pl-2 pr-2 pb-2 text-gray-900 dark:text-gray-50'>
              API Testing
            </p>
            <p className='rounded-lg border-2 flex-nowrap pt-2 pl-2 pr-2 pb-2 text-gray-900 dark:text-gray-50'>
              GraphQL
            </p>
            <p className='rounded-lg border-2 flex-nowrap pt-2 pl-2 pr-2 pb-2 text-gray-900 dark:text-gray-50'>
              keybindings
            </p>
            <p className='rounded-lg border-2 flex-nowrap pt-2 pl-2 pr-2 pb-2 text-gray-900 dark:text-gray-50'>
              OpenAPI
            </p>
            <p className='rounded-lg border-2 flex-nowrap pt-2 pl-2 pr-2 pb-2 text-gray-900 dark:text-gray-50'>
              REST
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExtensionPage
