import React from 'react'
import Input from 'ui/Input'
import { SearchIcon } from '@heroicons/react/outline'
import Dropdown from 'ui/Dropdown'
import { sortBy, category } from 'redux/constants'
import _values from 'lodash/values'

const testData = [
  {
    id: 1,
    name: 'Extension 1',
    description: 'This is the first extension',
    category: 'category 1',
    version: '1.0.0',
    stars: 4,
    downloads: 100,
    createdAt: '2020-01-01',
    updatedAt: '2020-01-01',
    price: '$0.00',
  },
]

const Search = () => {
  const [search, setSearch] = React.useState('')

  return (
    <div className='dark:bg-gray-900 py-10'>
      <div className='mx-auto max-w-6xl'>
        <form className='flex rounded-md shadow-sm !max-w-[360px] !w-full' onSubmit={() => {}}>
          <Input
            type='text'
            label=''
            value={search}
            placeholder='Search extensions for Swetrix Analytics'
            classNameInpit='!rounded-none !rounded-l-md'
            className='!w-full !max-w-full'
            onChange={(e) => setSearch(e.target.value)}
            disabled={false}
            error={false}
          />
          <button
            type='submit'
            className='-ml-px mb-2 mt-1 relative inline-flex items-center space-x-2 px-4 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
          >
            <SearchIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
          </button>
        </form>
        <div className='flex items-center justify-between mt-5'>
          <div>
            <span className='text-gray-700 dark:text-gray-300 text-lg font-medium'>1538 Results</span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='mr-5'>
              <span className='mr-3 dark:text-gray-200'>Showing:</span>
              <Dropdown
                items={_values(category)}
                title={category.all}
                buttonClassName='flex items-center w-full rounded-md border border-gray-300 shadow-sm px-1 md:px-2 py-1 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 dark:text-gray-50 dark:border-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600'
                selectItemClassName='text-gray-700 block px-2 py-1 text-base cursor-pointer hover:bg-gray-200 dark:text-gray-50 dark:border-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600'
                onSelect={() => {}}
              />
            </div>
            <div>
              <span className='mr-3  dark:text-gray-200'>Sort By:</span>
              <Dropdown
                items={_values(sortBy)}
                title={sortBy.relevance}
                buttonClassName='flex items-center w-full rounded-md border border-gray-300 shadow-sm px-1 md:px-2 py-1 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 dark:text-gray-50 dark:border-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600'
                selectItemClassName='text-gray-700 block px-2 py-1 text-base cursor-pointer hover:bg-gray-200 dark:text-gray-50 dark:border-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600'
                onSelect={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
