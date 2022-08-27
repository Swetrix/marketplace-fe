import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Input from 'ui/Input'
import { SearchIcon } from '@heroicons/react/outline'
import Dropdown from 'ui/Dropdown'
import { sortBy, category } from 'redux/constants'
import _values from 'lodash/values'
import ExtensionsCard from 'components/ExtensionsCard'
import _map from 'lodash/map'

const testData = [{
  createdAt: '2022-08-26T01:17:18.876Z', name: 'Marcella Goyette', description: 'aspernatur velit ab', imagePath: 'http://loremflickr.com/640/480/transport', companyLink: 'http://parched-watercress.org', companyName: 'Cummings and Sons', stars: 60, downloads: 81, price: 18, id: '1',
}, {
  createdAt: '2022-08-26T07:24:27.069Z', name: 'Peter Kilback', description: 'omnis autem incidunt', imagePath: 'http://loremflickr.com/640/480/people', companyLink: 'https://ultimate-step-mother.biz', companyName: 'Schaefer LLC', stars: 61, downloads: 44, price: 88, id: '2',
}, {
  createdAt: '2022-08-26T03:55:25.567Z', name: 'Olive Mohr DVM', description: 'aut facilis soluta', imagePath: 'http://loremflickr.com/640/480/people', companyLink: 'https://corrupt-raisin.name', companyName: 'Paucek, Romaguera and Schowalter', stars: 68, downloads: 54, price: 32, id: '3',
}, {
  createdAt: '2022-08-26T01:32:37.589Z', name: 'Minnie Kemmer', description: 'culpa asperiores non', imagePath: 'http://loremflickr.com/640/480/sports', companyLink: 'http://shadowy-curio.com', companyName: 'Connelly and Sons', stars: 18, downloads: 94, price: 25, id: '4',
}, {
  createdAt: '2022-08-25T21:36:42.477Z', name: 'Mr. George Heller', description: 'et dolore cum', imagePath: 'http://loremflickr.com/640/480/transport', companyLink: 'https://crooked-faith.net', companyName: 'Kub and Sons', stars: 63, downloads: 18, price: 90, id: '5',
}, {
  createdAt: '2022-08-26T07:23:33.526Z', name: 'Natasha Lueilwitz', description: 'unde quis fugiat', imagePath: 'http://loremflickr.com/640/480/sports', companyLink: 'http://bossy-documentation.info', companyName: 'Zboncak, Rowe and Wiza', stars: 7, downloads: 24, price: 58, id: '6',
}, {
  createdAt: '2022-08-26T02:37:05.141Z', name: 'Leo Jacobs', description: 'maiores ratione assumenda', imagePath: 'http://loremflickr.com/640/480/food', companyLink: 'https://giant-princess.net', companyName: 'Witting LLC', stars: 57, downloads: 71, price: 42, id: '7',
}, {
  createdAt: '2022-08-26T12:39:48.376Z', name: 'Hugh Fadel', description: 'tempora voluptatem nemo', imagePath: 'http://loremflickr.com/640/480/sports', companyLink: 'http://putrid-apse.com', companyName: 'Flatley - Daniel', stars: 22, downloads: 68, price: 31, id: '8',
}, {
  createdAt: '2022-08-26T00:06:39.266Z', name: 'Albert Hudson DDS', description: 'dolore iure sint', imagePath: 'http://loremflickr.com/640/480/people', companyLink: 'https://worthless-ladle.org', companyName: 'Wisoky LLC', stars: 66, downloads: 89, price: 75, id: '9',
}, {
  createdAt: '2022-08-26T04:51:45.492Z', name: 'Perry Stehr', description: 'aut eligendi consequatur', imagePath: 'http://loremflickr.com/640/480/food', companyLink: 'http://plump-vaccine.org', companyName: 'Wolf LLC', stars: 93, downloads: 96, price: 79, id: '10',
}, {
  createdAt: '2022-08-25T21:37:33.768Z', name: 'Angelica Ritchie', description: 'rerum quos quae', imagePath: 'http://loremflickr.com/640/480/technics', companyLink: 'https://favorable-coonskin.org', companyName: 'Erdman, Parker and Aufderhar', stars: 70, downloads: 71, price: 72, id: '11',
}, {
  createdAt: '2022-08-25T19:51:56.933Z', name: 'Donnie Lakin', description: 'consectetur sit et', imagePath: 'http://loremflickr.com/640/480/city', companyLink: 'https://cylindrical-pomelo.info', companyName: 'Gorczany, Hoppe and Champlin', stars: 29, downloads: 74, price: 25, id: '12',
}, {
  createdAt: '2022-08-25T19:02:15.329Z', name: 'Clara Boyer', description: 'sint praesentium ratione', imagePath: 'http://loremflickr.com/640/480/transport', companyLink: 'https://mortified-barstool.com', companyName: 'Bechtelar Group', stars: 2, downloads: 94, price: 2, id: '13',
}, {
  createdAt: '2022-08-25T21:26:45.731Z', name: 'Sylvia Schmitt', description: 'architecto adipisci molestiae', imagePath: 'http://loremflickr.com/640/480/fashion', companyLink: 'https://handsome-coordinator.org', companyName: 'Medhurst, Herzog and Hackett', stars: 5, downloads: 80, price: 71, id: '14',
}, {
  createdAt: '2022-08-26T17:33:39.292Z', name: 'Marion Hartmann', description: 'natus id quasi', imagePath: 'http://loremflickr.com/640/480/abstract', companyLink: 'https://ripe-sunshine.org', companyName: 'Wolf - Littel', stars: 67, downloads: 13, price: 84, id: '15',
}, {
  createdAt: '2022-08-25T19:44:04.512Z', name: 'Stanley Cormier', description: 'repellat nulla explicabo', imagePath: 'http://loremflickr.com/640/480/people', companyLink: 'http://lean-trove.com', companyName: 'Marquardt - Lakin', stars: 80, downloads: 46, price: 93, id: '16',
}, {
  createdAt: '2022-08-26T06:11:52.565Z', name: 'Spencer Quigley', description: 'perspiciatis et quis', imagePath: 'http://loremflickr.com/640/480/food', companyLink: 'https://informal-lipid.name', companyName: 'Hermiston - Braun', stars: 84, downloads: 82, price: 73, id: '17',
}, {
  createdAt: '2022-08-25T22:22:49.044Z', name: 'Victoria Hettinger', description: 'rem dolorum harum', imagePath: 'http://loremflickr.com/640/480/nature', companyLink: 'http://rubbery-communion.biz', companyName: 'Koss - Rempel', stars: 36, downloads: 18, price: 14, id: '18',
}, {
  createdAt: '2022-08-26T00:57:36.891Z', name: 'Terrence Tillman', description: 'commodi ea porro', imagePath: 'http://loremflickr.com/640/480/sports', companyLink: 'https://revolving-meeting.org', companyName: 'Hirthe - Schultz', stars: 50, downloads: 69, price: 93, id: '19',
}, {
  createdAt: '2022-08-26T14:20:14.821Z', name: 'Ms. Johnathan Jacobs', description: 'accusantium laborum aut', imagePath: 'http://loremflickr.com/640/480/technics', companyLink: 'https://creamy-abolishment.name', companyName: 'Jones - Heathcote', stars: 89, downloads: 31, price: 83, id: '20',
}, {
  createdAt: '2022-08-26T17:29:45.963Z', name: 'Miss Rita Johns', description: 'officia soluta ad', imagePath: 'http://loremflickr.com/640/480/cats', companyLink: 'http://far-off-ascot.net', companyName: 'Sanford and Sons', stars: 15, downloads: 45, price: 42, id: '21',
}]

const Search = () => {
  const params = new URLSearchParams(window.location.search)
  const [search, setSearch] = React.useState(params.get('term'))
  const [filterCategory, setFilterCategory] = React.useState(params.get('category'))
  const [filterSortBy, setFilterSortBy] = React.useState(params.get('sortBy'))

  const history = useHistory()

  useEffect(() => {
    history.push(`/search?term=${search}&category=${filterCategory}&sortBy=${filterSortBy}`)
  }, [search, filterCategory, filterSortBy, history])

  return (
    <div className='dark:bg-gray-900 py-10 px-2 sm:px-10'>
      <div className='mx-auto max-w-7xl'>
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
        <div className='flex items-center justify-between mt-8'>
          <div>
            <span className='text-gray-500 dark:text-gray-300 text-lg font-medium'>1538 Results</span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='mr-5'>
              <span className='mr-3 dark:text-gray-200'>Showing:</span>
              <Dropdown
                items={_values(category)}
                title={filterCategory}
                buttonClassName='flex items-center w-full rounded-md border border-gray-300 shadow-sm px-1 md:px-2 py-1 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 dark:text-gray-50 dark:border-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600'
                selectItemClassName='text-gray-700 block px-2 py-1 text-base cursor-pointer hover:bg-gray-200 dark:text-gray-50 dark:border-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600'
                onSelect={setFilterCategory}
              />
            </div>
            <div>
              <span className='mr-3  dark:text-gray-200'>Sort By:</span>
              <Dropdown
                items={_values(sortBy)}
                title={filterSortBy}
                buttonClassName='flex items-center w-full rounded-md border border-gray-300 shadow-sm px-1 md:px-2 py-1 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 dark:text-gray-50 dark:border-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600'
                selectItemClassName='text-gray-700 block px-2 py-1 text-base cursor-pointer hover:bg-gray-200 dark:text-gray-50 dark:border-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600'
                onSelect={setFilterSortBy}
              />
            </div>
          </div>
        </div>
        <div className='flex items-center flex-wrap justify-center md:justify-between mt-4 gap-1'>
          {_map(testData, ((item) => (
            <ExtensionsCard key={item.id} name={item.name} stars={item.stars} downloads={item.downloads} price={item.price} companyLink={item.companyLink} companyName={item.companyName} imagePath={item.imagePath} />
          )))}
        </div>
      </div>
    </div>
  )
}

export default Search
