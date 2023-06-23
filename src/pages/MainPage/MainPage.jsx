import React, { useState } from 'react'
import Input from 'ui/Input'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import Button from 'ui/Button'
import _isEmpty from 'lodash/isEmpty'
import _filter from 'lodash/filter'
import Glider from 'react-glider'
import '../../glider.css'
import { useHistory } from 'react-router-dom'
import { sortByConstans } from 'redux/constants'
import ExtensionsCard from 'components/ExtensionsCard'
import _map from 'lodash/map'
import Title from 'components/Title'

const MainPage = ({ extensions, category }) => {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const history = useHistory()
  const extensionsWithoutCategory = _filter(extensions, (extension) => !extension.category)

  const searchSubmit = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (!_isEmpty(search)) {
      history.push(
        `/search?term=${search}&category=&sortBy=${sortByConstans.CREATED_AT}`,
      )
    } else {
      console.log('wrong')
    }
  }

  return (
    <Title title={t('titles.main')}>
      <div className='min-h-min-footer dark:bg-gray-900'>
        <div>
          <h1 className='text-center pt-16 font-extrabold text-3xl dark:text-white text-gray-700'>
            Extensions for Swetrix Analytics
          </h1>
          <form
            className='mt-5 mx-auto flex rounded-md !max-w-[360px] !w-full'
            onSubmit={searchSubmit}
          >
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
              className='-ml-px mb-2 mt-1 relative inline-flex items-center space-x-2 px-4 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 dark:bg-slate-900 dark:border-0 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
            >
              <MagnifyingGlassIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </button>
          </form>
        </div>
        <section>
          <div className='max-w-[1400px] mx-auto py-10 px-4 sm:px-6 lg:px-8'>
            <div className='mt-6 relative p-5'>
              {!_isEmpty(category) && (
                _map(category, (item) => {
                  const extensionForCategory = _filter(
                    extensions,
                    (extension) => extension.category?.name === item.name,
                  )
                  if (!_isEmpty(extensionForCategory)) {
                    return (
                      <div key={item.id} className='my-4'>
                        <div className='flex items-center justify-between'>
                          <h2 className='text-2xl font-bold tracking-tight text-gray-800 dark:text-white'>
                            {item.name}
                          </h2>
                          <Button onClick={() => {
                            history.push(
                              `/search?term=&category=${item.name}&sortBy=${sortByConstans.CREATED_AT}`,
                            )
                          }} text='See more' primary regular />
                        </div>
                        <Glider
                          hasArrows={extensionForCategory.length >= 5}
                          slidesToScroll={6}
                          resizeLock
                          exactWidth
                          itemWidth={210}
                        >
                          {_map(extensionForCategory, (extension) => (
                            <ExtensionsCard
                              key={extension.id}
                              id={extension.id}
                              name={extension.name}
                              stars={3}
                              downloads={extension.usersQuantity}
                              mainImage={extension.mainImage}
                              price={extension.price}
                              // companyLink='https://simpson.com'
                              companyName={extension.owner?.nickname || 'Unknown'} />
                          ))}
                        </Glider>
                      </div>
                    )
                  }
                })
              )}
            </div>
            {!_isEmpty(extensionsWithoutCategory) && (
              <div className='mt-6 relative p-5'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-2xl font-bold tracking-tight text-gray-800 dark:text-white'>
                    Other
                  </h2>
                  <Button onClick={() => {
                    history.push(
                      `/search?term=&category=&sortBy=${sortByConstans.CREATED_AT}`
                    )
                  }} text='See more' primary regular />
                </div>
                <Glider
                  hasArrows={extensionsWithoutCategory.length >= 5}
                  slidesToScroll={6}
                  resizeLock
                  exactWidth
                  itemWidth={210}
                >
                  {_map(extensionsWithoutCategory, (extension) => (
                    <ExtensionsCard
                      key={extension.id}
                      id={extension.id}
                      name={extension.name}
                      stars={3}
                      downloads={extension.usersQuantity}
                      mainImage={extension.mainImage}
                      price={extension.price}
                      // companyLink='https://simpson.com'
                      companyName={extension.owner?.nickname || 'Unknown'} />
                  ))}
                </Glider>
              </div>
            )}
          </div>
        </section>
      </div>
    </Title>
  )
}

export default MainPage
