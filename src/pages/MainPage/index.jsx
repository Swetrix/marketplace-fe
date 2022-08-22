import React from 'react'
import Input from 'ui/Input'
import { SearchIcon, DownloadIcon } from '@heroicons/react/outline'
import Button from 'ui/Button'

const MainPage = () => {
  return (
    <div className='dark:bg-gray-900'>
      {/* test */}
      <div>
        <h1 className='text-center pt-16 font-extrabold text-3xl dark:text-white text-gray-700'>Extensions for Swetrix Analytics</h1>
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
        <div className='max-w-[1400px] mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold tracking-tight text-gray-800 dark:text-white'>Featured</h2>
            <Button onClick={() => {}} text='See more' primary regular />
          </div>
          <div className='mt-6 flex items-center justify-between'>
            <div className='group max-w-[210px] relative border rounded-sm p-3 bg-gray-100 dark:bg-gray-800 dark:border-gray-900  shadow-md'>
              <div className='h-28 w-28 mx-auto aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none'>
                <img src='https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg' alt="Front of men&#039;s Basic Tee in black." className='w-full h-full object-center object-cover lg:w-full lg:h-full' />
              </div>
              <div className='mt-4'>
                <h3 className='text-center text-lg font-semibold leading-5 text-gray-700 dark:text-gray-300'>
                  <a href='/'>
                    Power Platform Conne
                  </a>
                </h3>
                <div className='flex items-center justify-between mt-2'>
                  <div className='flex flex-col'>
                    <p className='dark:text-gray-400 text-gray-500 text-sm leading-[10px]'>
                      Swetrix
                    </p>
                    <a href='https://swetrix.com' className='dark:text-indigo-400 cursor-pointer text-indigo-500 font-semibold border-0 text-sm'>
                      swetrix.com
                    </a>
                  </div>
                  <div className='flex items-center'>
                    <DownloadIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                    <p className='pl-1 text-gray-400'>231k</p>
                  </div>
                </div>
                <div className='flex justify-between items-center mt-1'>
                  <div className='flex items-center'>
                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />

                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />

                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />

                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />

                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />
                  </div>
                  <div>
                    <p className='text-indigo-700 dark:text-indigo-500 font-semibold'>
                      free
                    </p>
                    <span className='sr-only'>pricing</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='group max-w-[210px] relative border rounded-sm p-3 bg-gray-100 dark:bg-gray-800 dark:border-gray-900  shadow-md'>
              <div className='h-28 w-28 mx-auto aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none'>
                <img src='https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg' alt="Front of men&#039;s Basic Tee in black." className='w-full h-full object-center object-cover lg:w-full lg:h-full' />
              </div>
              <div className='mt-4'>
                <h3 className='text-center text-lg font-semibold leading-5 text-gray-700 dark:text-gray-300'>
                  <a href='/'>
                    Power Platform Conne
                  </a>
                </h3>
                <div className='flex items-center justify-between mt-2'>
                  <div className='flex flex-col'>
                    <p className='dark:text-gray-400 text-gray-500 text-sm leading-[10px]'>
                      Swetrix
                    </p>
                    <a href='https://swetrix.com' className='dark:text-indigo-400 cursor-pointer text-indigo-500 font-semibold border-0 text-sm'>
                      swetrix.com
                    </a>
                  </div>
                  <div className='flex items-center'>
                    <DownloadIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                    <p className='pl-1 text-gray-400'>231k</p>
                  </div>
                </div>
                <div className='flex justify-between items-center mt-1'>
                  <div className='flex items-center'>
                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />

                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />

                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />

                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />

                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />
                  </div>
                  <div>
                    <p className='text-indigo-700 dark:text-indigo-500 font-semibold'>
                      free
                    </p>
                    <span className='sr-only'>pricing</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='group max-w-[210px] relative border rounded-sm p-3 bg-gray-100 dark:bg-gray-800 dark:border-gray-900  shadow-md'>
              <div className='h-28 w-28 mx-auto aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none'>
                <img src='https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg' alt="Front of men&#039;s Basic Tee in black." className='w-full h-full object-center object-cover lg:w-full lg:h-full' />
              </div>
              <div className='mt-4'>
                <h3 className='text-center text-lg font-semibold leading-5 text-gray-700 dark:text-gray-300'>
                  <a href='/'>
                    Power Platform Conne
                  </a>
                </h3>
                <div className='flex items-center justify-between mt-2'>
                  <div className='flex flex-col'>
                    <p className='dark:text-gray-400 text-gray-500 text-sm leading-[10px]'>
                      Swetrix
                    </p>
                    <a href='https://swetrix.com' className='dark:text-indigo-400 cursor-pointer text-indigo-500 font-semibold border-0 text-sm'>
                      swetrix.com
                    </a>
                  </div>
                  <div className='flex items-center'>
                    <DownloadIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                    <p className='pl-1 text-gray-400'>231k</p>
                  </div>
                </div>
                <div className='flex justify-between items-center mt-1'>
                  <div className='flex items-center'>
                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />

                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />

                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />

                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />

                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />
                  </div>
                  <div>
                    <p className='text-indigo-700 dark:text-indigo-500 font-semibold'>
                      free
                    </p>
                    <span className='sr-only'>pricing</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='group max-w-[210px] relative border rounded-sm p-3 bg-gray-100 dark:bg-gray-800 dark:border-gray-900  shadow-md'>
              <div className='h-28 w-28 mx-auto aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none'>
                <img src='https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg' alt="Front of men&#039;s Basic Tee in black." className='w-full h-full object-center object-cover lg:w-full lg:h-full' />
              </div>
              <div className='mt-4'>
                <h3 className='text-center text-lg font-semibold leading-5 text-gray-700 dark:text-gray-300'>
                  <a href='/'>
                    Power Platform Conne
                  </a>
                </h3>
                <div className='flex items-center justify-between mt-2'>
                  <div className='flex flex-col'>
                    <p className='dark:text-gray-400 text-gray-500 text-sm leading-[10px]'>
                      Swetrix
                    </p>
                    <a href='https://swetrix.com' className='dark:text-indigo-400 cursor-pointer text-indigo-500 font-semibold border-0 text-sm'>
                      swetrix.com
                    </a>
                  </div>
                  <div className='flex items-center'>
                    <DownloadIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                    <p className='pl-1 text-gray-400'>231k</p>
                  </div>
                </div>
                <div className='flex justify-between items-center mt-1'>
                  <div className='flex items-center'>
                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />

                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />

                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />

                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />

                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />
                  </div>
                  <div>
                    <p className='text-indigo-700 dark:text-indigo-500 font-semibold'>
                      free
                    </p>
                    <span className='sr-only'>pricing</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='group max-w-[210px] relative border rounded-sm p-3 bg-gray-100 dark:bg-gray-800 dark:border-gray-900  shadow-md'>
              <div className='h-28 w-28 mx-auto aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none'>
                <img src='https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg' alt="Front of men&#039;s Basic Tee in black." className='w-full h-full object-center object-cover lg:w-full lg:h-full' />
              </div>
              <div className='mt-4'>
                <h3 className='text-center text-lg font-semibold leading-5 text-gray-700 dark:text-gray-300'>
                  <a href='/'>
                    Power Platform Conne
                  </a>
                </h3>
                <div className='flex items-center justify-between mt-2'>
                  <div className='flex flex-col'>
                    <p className='dark:text-gray-400 text-gray-500 text-sm leading-[10px]'>
                      Swetrix
                    </p>
                    <a href='https://swetrix.com' className='dark:text-indigo-400 cursor-pointer text-indigo-500 font-semibold border-0 text-sm'>
                      swetrix.com
                    </a>
                  </div>
                  <div className='flex items-center'>
                    <DownloadIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                    <p className='pl-1 text-gray-400'>231k</p>
                  </div>
                </div>
                <div className='flex justify-between items-center mt-1'>
                  <div className='flex items-center'>
                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />

                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />

                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />

                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />

                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />
                  </div>
                  <div>
                    <p className='text-indigo-700 dark:text-indigo-500 font-semibold'>
                      free
                    </p>
                    <span className='sr-only'>pricing</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='group max-w-[210px] relative border rounded-sm p-3 bg-gray-100 dark:bg-gray-800 dark:border-gray-900  shadow-md'>
              <div className='h-28 w-28 mx-auto aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none'>
                <img src='https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg' alt="Front of men&#039;s Basic Tee in black." className='w-full h-full object-center object-cover lg:w-full lg:h-full' />
              </div>
              <div className='mt-4'>
                <h3 className='text-center text-lg font-semibold leading-5 text-gray-700 dark:text-gray-300'>
                  <a href='/'>
                    Power Platform Conne
                  </a>
                </h3>
                <div className='flex items-center justify-between mt-2'>
                  <div className='flex flex-col'>
                    <p className='dark:text-gray-400 text-gray-500 text-sm leading-[10px]'>
                      Swetrix
                    </p>
                    <a href='https://swetrix.com' className='dark:text-indigo-400 cursor-pointer text-indigo-500 font-semibold border-0 text-sm'>
                      swetrix.com
                    </a>
                  </div>
                  <div className='flex items-center'>
                    <DownloadIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                    <p className='pl-1 text-gray-400'>231k</p>
                  </div>
                </div>
                <div className='flex justify-between items-center mt-1'>
                  <div className='flex items-center'>
                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />

                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />

                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />

                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />

                    <img alt='' className='h-3' src='https://cdn.vsassets.io/v/M207_20220810.1/_content/FullStar.svg' />
                  </div>
                  <div>
                    <p className='text-indigo-700 dark:text-indigo-500 font-semibold'>
                      free
                    </p>
                    <span className='sr-only'>pricing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MainPage
