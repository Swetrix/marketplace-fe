import React from 'react'
import Input from 'ui/Input'
import { SearchIcon } from '@heroicons/react/outline'

const MainPage = () => {
  return (
    <div>
      <div>
        <h1 className='text-center mt-16 font-extrabold text-3xl dark:text-white text-gray-700'>Extensions for Swetrix Analytics</h1>
        <div className='mt-5 mx-auto flex rounded-md shadow-sm !max-w-[360px] !w-full'>
          <Input
            type='text'
            label=''
            value=''
            placeholder='Search extensions for Swetrix Analytics'
            classNameInpit='!rounded-none !rounded-l-md'
            className='!w-full !max-w-full'
            onChange={() => { }}
            disabled={false}
            error={false}
          />
          <button
            type='button'
            className='-ml-px mb-2 mt-1 relative inline-flex items-center space-x-2 px-4 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
          >
            <SearchIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
          </button>
        </div>
      </div>
      <section>
        <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
          <h2 className='text-2xl font-bold tracking-tight text-gray-900'>Featured</h2>

          <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
            <div className='group relative'>
              <div className='w-full min-h-10 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none'>
                <img src='https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg' alt="Front of men&#039;s Basic Tee in black." className='w-full h-full object-center object-cover lg:w-full lg:h-full' />
              </div>
              <div className='mt-4 flex justify-between'>
                <div>
                  <h3 className='text-sm text-gray-700'>
                    <a href='/'>
                      <span aria-hidden='true' className='absolute inset-0' />
                      Pthon
                    </a>
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>decribe</p>
                </div>
                <p className='text-sm font-medium text-gray-900'>price</p>
              </div>
            </div>
            <div className='group relative'>
              <div className='w-full min-h-10 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none'>
                <img src='https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg' alt="Front of men&#039;s Basic Tee in black." className='w-full h-full object-center object-cover lg:w-full lg:h-full' />
              </div>
              <div className='mt-4 flex justify-between'>
                <div>
                  <h3 className='text-sm text-gray-700'>
                    <a href='/'>
                      <span aria-hidden='true' className='absolute inset-0' />
                      React sinipet
                    </a>
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>extensions for jsx</p>
                </div>
                <p className='text-sm font-medium text-gray-900'>$35</p>
              </div>
            </div>
            <div className='group relative'>
              <div className='w-full min-h-10 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none'>
                <img src='https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg' alt="Front of men&#039;s Basic Tee in black." className='w-full h-full object-center object-cover lg:w-full lg:h-full' />
              </div>
              <div className='mt-4 flex justify-between'>
                <div>
                  <h3 className='text-sm text-gray-700'>
                    <a href='/'>
                      <span aria-hidden='true' className='absolute inset-0' />
                      Js, jsx
                    </a>
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>extensions js</p>
                </div>
                <p className='text-sm font-medium text-gray-900'>$35</p>
              </div>
            </div>
            <div className='group relative'>
              <div className='w-full min-h-10 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none'>
                <img src='https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg' alt="Front of men&#039;s Basic Tee in black." className='w-full h-full object-center object-cover lg:w-full lg:h-full' />
              </div>
              <div className='mt-4 flex justify-between'>
                <div>
                  <h3 className='text-sm text-gray-700'>
                    <a href='/'>
                      <span aria-hidden='true' className='absolute inset-0' />
                      Basic Tee
                    </a>
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>Black</p>
                </div>
                <p className='text-sm font-medium text-gray-900'>$35</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MainPage
