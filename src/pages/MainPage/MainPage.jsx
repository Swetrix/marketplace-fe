import React, { useState } from 'react'
import Input from 'ui/Input'
import { SearchIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'
import Button from 'ui/Button'
import _isEmpty from 'lodash/isEmpty'
import Glider from 'react-glider'
import '../../glider.css'
import { useHistory } from 'react-router-dom'
import { sortByConstans } from 'redux/constants'
import ExtensionsCard from 'components/ExtensionsCard'
import Title from 'components/Title'
import _map from 'lodash/map'

const MainPage = ({ extensions }) => {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const history = useHistory()

  const searchSubmit = (e) => {
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
      <div className='dark:bg-gray-900'>
        <div>
          <h1 className='text-center pt-16 font-extrabold text-3xl dark:text-white text-gray-700'>
            Extensions for Swetrix Analytics
          </h1>
          <form
            className='mt-5 mx-auto flex rounded-md shadow-sm !max-w-[360px] !w-full'
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
              type='button'
              className='-ml-px mb-2 mt-1 relative inline-flex items-center space-x-2 px-4 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 dark:bg-gray-800 dark:border-0 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
            >
              <SearchIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </button>
          </form>
        </div>
        <section>
          <div className='max-w-[1400px] mx-auto py-10 px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center justify-between'>
              <h2 className='text-2xl font-bold tracking-tight text-gray-800 dark:text-white'>
                Featured
              </h2>
              <Button onClick={() => { }} text='See more' primary regular />
            </div>
            <div className='mt-6 relative p-5'>
              <Glider
                hasArrows
                slidesToScroll={6}
                scrollLock
                resizeLock
                exactWidth
                itemWidth={210}
              >
                {_map(extensions, (extension) => (
                  <ExtensionsCard
                    key={extension.id}
                    name={extension.name}
                    stars={3}
                    downloads={extension.installs}
                    imagePath={extension.mainImage}
                    price={extension.price}
                    companyLink='https://simpson.com'
                    companyName='Wimpson Or'
                  />
                ))}
                <ExtensionsCard
                  name='BackgroundCover'
                  stars={1}
                  downloads={640}
                  imagePath='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABuCAMAAADxhdbJAAAAOVBMVEVAAMDg4ECgoADg4IDgwAAAgMDgwEDAwIDAwEDAoECgoEDAwADggECggACggEDA3MDAoAD/+/D//wAc9NcrAAADGklEQVRoge2a25adIAxAR2koonNp//9jKyISIIBye+iSt5ml7pUdAsHjx8c73vEfje8/Q3GMjcXxkTRgHAbiNsZH2mSMT+NooHDjbG4KN84mU7hhNkHjRtncNG6UTaZxg2yCwY2xuRncGJvM4MbYtLgRNsHiRthkFjfCJsb1t6ldMjGNsckwrr9NhmV2twkurrfNzcX1tsk8XF+b4OO+u+I2H9c3eYZmCqGvTQhxPW1uIa6nTRbiOtoECrd1w1mX18zsaZNRuG42NxpXYPP3ncFonLhzr1svIJf1V26sJI7P+SH80yfAvGSJgsLlWXt6w/zC5zznYpxCnEyilniDCOpOmSSuAU5kWdMWmbq70PO6KHH1cPHELdeOGC8UsFdHiMLFxdJlU5usSkCpoIkTxi0ZVlRkIDRKRGsmodKupRmRoVCauFpcmnVzeQMP6BO5wckkKysyFuBBRMhJ41ANLNxn3RJ58YjitcRVT5UU6+E+EQg9xo9YDY9PKdZ9kXGhZ4rWI31c1YCgWY9EpgM8iXvioqzSDTfKmxcRzMMKkRePXO5/9koQczy08maCECp01c2yqcgLGLL2aanm5dJU5MWTHkvX+P53XWlHeeCy9AKm/ufDWJsWECTuwfTeo3CyC81pZzHOW5VbtdPg0DRDp7NLdBDSTpyrs1HqMG1ymxSnGqqrIMSZdJnqwNXQxiYQNNs3tLaJaUSrjtPXwmYGh6uhhU3yhIybsKYnS5rm9HydcDyCs+mrt0m8ufFxc7u3HhGa10C3x3m725eDu3TW2ozgwGtjrsWssncgVapNG9ThOqyGNjgntvOR4AhtYpPCXQ90+jTZIDz4G6h0uh8coGiAC2neBdLXWWMTfJXBs9CMkdXhgUsj20grdKnEgasy9zpGV0O5TcCxJR5zCa0LD+OS/bgJUNbgAKnMPeMMUFTixN3Zfc6Yit/Twai8dbA5hRbjLO3uDZ86fcU48WxiHwGKwlIA/WHDs/cxh84SHBR9lLIHKAtxZVpgXopu44VHbfgq+Iis4sszgOcHWajauMpvfcc73vGOJ+Mfb2wkd/LrZnAAAAAASUVORK5CYII='
                  price={0}
                  companyLink='https://swetrix.com'
                  companyName='Swetrix'
                />
                <ExtensionsCard
                  name='BackgroundCover'
                  stars={1}
                  downloads={640}
                  imagePath='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABuCAMAAADxhdbJAAAAOVBMVEVAAMDg4ECgoADg4IDgwAAAgMDgwEDAwIDAwEDAoECgoEDAwADggECggACggEDA3MDAoAD/+/D//wAc9NcrAAADGklEQVRoge2a25adIAxAR2koonNp//9jKyISIIBye+iSt5ml7pUdAsHjx8c73vEfje8/Q3GMjcXxkTRgHAbiNsZH2mSMT+NooHDjbG4KN84mU7hhNkHjRtncNG6UTaZxg2yCwY2xuRncGJvM4MbYtLgRNsHiRthkFjfCJsb1t6ldMjGNsckwrr9NhmV2twkurrfNzcX1tsk8XF+b4OO+u+I2H9c3eYZmCqGvTQhxPW1uIa6nTRbiOtoECrd1w1mX18zsaZNRuG42NxpXYPP3ncFonLhzr1svIJf1V26sJI7P+SH80yfAvGSJgsLlWXt6w/zC5zznYpxCnEyilniDCOpOmSSuAU5kWdMWmbq70PO6KHH1cPHELdeOGC8UsFdHiMLFxdJlU5usSkCpoIkTxi0ZVlRkIDRKRGsmodKupRmRoVCauFpcmnVzeQMP6BO5wckkKysyFuBBRMhJ41ANLNxn3RJ58YjitcRVT5UU6+E+EQg9xo9YDY9PKdZ9kXGhZ4rWI31c1YCgWY9EpgM8iXvioqzSDTfKmxcRzMMKkRePXO5/9koQczy08maCECp01c2yqcgLGLL2aanm5dJU5MWTHkvX+P53XWlHeeCy9AKm/ufDWJsWECTuwfTeo3CyC81pZzHOW5VbtdPg0DRDp7NLdBDSTpyrs1HqMG1ymxSnGqqrIMSZdJnqwNXQxiYQNNs3tLaJaUSrjtPXwmYGh6uhhU3yhIybsKYnS5rm9HydcDyCs+mrt0m8ufFxc7u3HhGa10C3x3m725eDu3TW2ozgwGtjrsWssncgVapNG9ThOqyGNjgntvOR4AhtYpPCXQ90+jTZIDz4G6h0uh8coGiAC2neBdLXWWMTfJXBs9CMkdXhgUsj20grdKnEgasy9zpGV0O5TcCxJR5zCa0LD+OS/bgJUNbgAKnMPeMMUFTixN3Zfc6Yit/Twai8dbA5hRbjLO3uDZ86fcU48WxiHwGKwlIA/WHDs/cxh84SHBR9lLIHKAtxZVpgXopu44VHbfgq+Iis4sszgOcHWajauMpvfcc73vGOJ+Mfb2wkd/LrZnAAAAAASUVORK5CYII='
                  price={0}
                  companyLink='https://swetrix.com'
                  companyName='Swetrix'
                />
              </Glider>
            </div>
          </div>
          <div className='max-w-[1400px] mx-auto py-10 px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center justify-between'>
              <h2 className='text-2xl font-bold tracking-tight text-gray-800 dark:text-white'>
                Popular
              </h2>
              <Button onClick={() => { }} text='See more' primary regular />
            </div>
            <div className='mt-6 relative p-5'>
              <Glider
                hasArrows
                slidesToScroll={6}
                scrollLock
                resizeLock
                exactWidth
                itemWidth={210}
              >
                <ExtensionsCard
                  name='Swetrix Analytics'
                  stars={3}
                  downloads={10}
                  imagePath='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_pweAjQS6GdD2bO4MB-PCUO-Cw5oUm9YTwQ&usqp=CAU'
                  price={9}
                  companyLink='https://simpson.com'
                  companyName='Wimpson Or'
                />
                <ExtensionsCard
                  name='BackgroundCover'
                  stars={1}
                  downloads={640}
                  imagePath='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABuCAMAAADxhdbJAAAAOVBMVEVAAMDg4ECgoADg4IDgwAAAgMDgwEDAwIDAwEDAoECgoEDAwADggECggACggEDA3MDAoAD/+/D//wAc9NcrAAADGklEQVRoge2a25adIAxAR2koonNp//9jKyISIIBye+iSt5ml7pUdAsHjx8c73vEfje8/Q3GMjcXxkTRgHAbiNsZH2mSMT+NooHDjbG4KN84mU7hhNkHjRtncNG6UTaZxg2yCwY2xuRncGJvM4MbYtLgRNsHiRthkFjfCJsb1t6ldMjGNsckwrr9NhmV2twkurrfNzcX1tsk8XF+b4OO+u+I2H9c3eYZmCqGvTQhxPW1uIa6nTRbiOtoECrd1w1mX18zsaZNRuG42NxpXYPP3ncFonLhzr1svIJf1V26sJI7P+SH80yfAvGSJgsLlWXt6w/zC5zznYpxCnEyilniDCOpOmSSuAU5kWdMWmbq70PO6KHH1cPHELdeOGC8UsFdHiMLFxdJlU5usSkCpoIkTxi0ZVlRkIDRKRGsmodKupRmRoVCauFpcmnVzeQMP6BO5wckkKysyFuBBRMhJ41ANLNxn3RJ58YjitcRVT5UU6+E+EQg9xo9YDY9PKdZ9kXGhZ4rWI31c1YCgWY9EpgM8iXvioqzSDTfKmxcRzMMKkRePXO5/9koQczy08maCECp01c2yqcgLGLL2aanm5dJU5MWTHkvX+P53XWlHeeCy9AKm/ufDWJsWECTuwfTeo3CyC81pZzHOW5VbtdPg0DRDp7NLdBDSTpyrs1HqMG1ymxSnGqqrIMSZdJnqwNXQxiYQNNs3tLaJaUSrjtPXwmYGh6uhhU3yhIybsKYnS5rm9HydcDyCs+mrt0m8ufFxc7u3HhGa10C3x3m725eDu3TW2ozgwGtjrsWssncgVapNG9ThOqyGNjgntvOR4AhtYpPCXQ90+jTZIDz4G6h0uh8coGiAC2neBdLXWWMTfJXBs9CMkdXhgUsj20grdKnEgasy9zpGV0O5TcCxJR5zCa0LD+OS/bgJUNbgAKnMPeMMUFTixN3Zfc6Yit/Twai8dbA5hRbjLO3uDZ86fcU48WxiHwGKwlIA/WHDs/cxh84SHBR9lLIHKAtxZVpgXopu44VHbfgq+Iis4sszgOcHWajauMpvfcc73vGOJ+Mfb2wkd/LrZnAAAAAASUVORK5CYII='
                  price={0}
                  companyLink='https://swetrix.com'
                  companyName='Swetrix'
                />
                <ExtensionsCard
                  name='Eslint'
                  stars={4}
                  downloads={130}
                  imagePath='data:image/jpeg;base64,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'
                  price={0}
                  companyLink='https://swetrix.com'
                  companyName='Swetrix'
                />
                <ExtensionsCard
                  name='Icon theme'
                  stars={5}
                  downloads={91}
                  imagePath='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt3tNqTnGluB7zadPe_PTbbN1Sqsu7A_yU4w&usqp=CAU'
                  price={0}
                  companyLink='https://anime.com'
                  companyName='Anime'
                />
                <ExtensionsCard
                  name='IntePicture'
                  stars={4}
                  downloads={601}
                  imagePath='data:image/png;base64,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'
                  price={0}
                  companyLink='https://swetrix.com'
                  companyName='Swetrix'
                />
                <ExtensionsCard
                  name='Docker'
                  stars={3}
                  downloads={600}
                  imagePath='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_pweAjQS6GdD2bO4MB-PCUO-Cw5oUm9YTwQ&usqp=CAU'
                  price={1000}
                  companyLink='https://microsoft.com'
                  companyName='Microsoft'
                />
                <ExtensionsCard
                  name='Swetrix Analytics'
                  stars={3}
                  downloads={10}
                  imagePath='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_pweAjQS6GdD2bO4MB-PCUO-Cw5oUm9YTwQ&usqp=CAU'
                  price={9}
                  companyLink='https://simpson.com'
                  companyName='Wimpson Or'
                />
                <ExtensionsCard
                  name='BackgroundCover'
                  stars={1}
                  downloads={640}
                  imagePath='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABuCAMAAADxhdbJAAAAOVBMVEVAAMDg4ECgoADg4IDgwAAAgMDgwEDAwIDAwEDAoECgoEDAwADggECggACggEDA3MDAoAD/+/D//wAc9NcrAAADGklEQVRoge2a25adIAxAR2koonNp//9jKyISIIBye+iSt5ml7pUdAsHjx8c73vEfje8/Q3GMjcXxkTRgHAbiNsZH2mSMT+NooHDjbG4KN84mU7hhNkHjRtncNG6UTaZxg2yCwY2xuRncGJvM4MbYtLgRNsHiRthkFjfCJsb1t6ldMjGNsckwrr9NhmV2twkurrfNzcX1tsk8XF+b4OO+u+I2H9c3eYZmCqGvTQhxPW1uIa6nTRbiOtoECrd1w1mX18zsaZNRuG42NxpXYPP3ncFonLhzr1svIJf1V26sJI7P+SH80yfAvGSJgsLlWXt6w/zC5zznYpxCnEyilniDCOpOmSSuAU5kWdMWmbq70PO6KHH1cPHELdeOGC8UsFdHiMLFxdJlU5usSkCpoIkTxi0ZVlRkIDRKRGsmodKupRmRoVCauFpcmnVzeQMP6BO5wckkKysyFuBBRMhJ41ANLNxn3RJ58YjitcRVT5UU6+E+EQg9xo9YDY9PKdZ9kXGhZ4rWI31c1YCgWY9EpgM8iXvioqzSDTfKmxcRzMMKkRePXO5/9koQczy08maCECp01c2yqcgLGLL2aanm5dJU5MWTHkvX+P53XWlHeeCy9AKm/ufDWJsWECTuwfTeo3CyC81pZzHOW5VbtdPg0DRDp7NLdBDSTpyrs1HqMG1ymxSnGqqrIMSZdJnqwNXQxiYQNNs3tLaJaUSrjtPXwmYGh6uhhU3yhIybsKYnS5rm9HydcDyCs+mrt0m8ufFxc7u3HhGa10C3x3m725eDu3TW2ozgwGtjrsWssncgVapNG9ThOqyGNjgntvOR4AhtYpPCXQ90+jTZIDz4G6h0uh8coGiAC2neBdLXWWMTfJXBs9CMkdXhgUsj20grdKnEgasy9zpGV0O5TcCxJR5zCa0LD+OS/bgJUNbgAKnMPeMMUFTixN3Zfc6Yit/Twai8dbA5hRbjLO3uDZ86fcU48WxiHwGKwlIA/WHDs/cxh84SHBR9lLIHKAtxZVpgXopu44VHbfgq+Iis4sszgOcHWajauMpvfcc73vGOJ+Mfb2wkd/LrZnAAAAAASUVORK5CYII='
                  price={0}
                  companyLink='https://swetrix.com'
                  companyName='Swetrix'
                />
                <ExtensionsCard
                  name='Eslint'
                  stars={4}
                  downloads={130}
                  imagePath='data:image/jpeg;base64,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'
                  price={0}
                  companyLink='https://swetrix.com'
                  companyName='Swetrix'
                />
                <ExtensionsCard
                  name='Icon theme'
                  stars={5}
                  downloads={91}
                  imagePath='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt3tNqTnGluB7zadPe_PTbbN1Sqsu7A_yU4w&usqp=CAU'
                  price={0}
                  companyLink='https://anime.com'
                  companyName='Anime'
                />
                <ExtensionsCard
                  name='IntePicture'
                  stars={4}
                  downloads={601}
                  imagePath='data:image/png;base64,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'
                  price={0}
                  companyLink='https://swetrix.com'
                  companyName='Swetrix'
                />
                <ExtensionsCard
                  name='Docker'
                  stars={3}
                  downloads={439}
                  imagePath='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_pweAjQS6GdD2bO4MB-PCUO-Cw5oUm9YTwQ&usqp=CAU'
                  price={1000}
                  companyLink='https://microsoft.com'
                  companyName='Microsoft'
                />
                <ExtensionsCard
                  name='Swetrix Analytics'
                  stars={3}
                  downloads={10}
                  imagePath='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_pweAjQS6GdD2bO4MB-PCUO-Cw5oUm9YTwQ&usqp=CAU'
                  price={9}
                  companyLink='https://simpson.com'
                  companyName='Wimpson Or'
                />
                <ExtensionsCard
                  name='BackgroundCover'
                  stars={1}
                  downloads={640}
                  imagePath='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABuCAMAAADxhdbJAAAAOVBMVEVAAMDg4ECgoADg4IDgwAAAgMDgwEDAwIDAwEDAoECgoEDAwADggECggACggEDA3MDAoAD/+/D//wAc9NcrAAADGklEQVRoge2a25adIAxAR2koonNp//9jKyISIIBye+iSt5ml7pUdAsHjx8c73vEfje8/Q3GMjcXxkTRgHAbiNsZH2mSMT+NooHDjbG4KN84mU7hhNkHjRtncNG6UTaZxg2yCwY2xuRncGJvM4MbYtLgRNsHiRthkFjfCJsb1t6ldMjGNsckwrr9NhmV2twkurrfNzcX1tsk8XF+b4OO+u+I2H9c3eYZmCqGvTQhxPW1uIa6nTRbiOtoECrd1w1mX18zsaZNRuG42NxpXYPP3ncFonLhzr1svIJf1V26sJI7P+SH80yfAvGSJgsLlWXt6w/zC5zznYpxCnEyilniDCOpOmSSuAU5kWdMWmbq70PO6KHH1cPHELdeOGC8UsFdHiMLFxdJlU5usSkCpoIkTxi0ZVlRkIDRKRGsmodKupRmRoVCauFpcmnVzeQMP6BO5wckkKysyFuBBRMhJ41ANLNxn3RJ58YjitcRVT5UU6+E+EQg9xo9YDY9PKdZ9kXGhZ4rWI31c1YCgWY9EpgM8iXvioqzSDTfKmxcRzMMKkRePXO5/9koQczy08maCECp01c2yqcgLGLL2aanm5dJU5MWTHkvX+P53XWlHeeCy9AKm/ufDWJsWECTuwfTeo3CyC81pZzHOW5VbtdPg0DRDp7NLdBDSTpyrs1HqMG1ymxSnGqqrIMSZdJnqwNXQxiYQNNs3tLaJaUSrjtPXwmYGh6uhhU3yhIybsKYnS5rm9HydcDyCs+mrt0m8ufFxc7u3HhGa10C3x3m725eDu3TW2ozgwGtjrsWssncgVapNG9ThOqyGNjgntvOR4AhtYpPCXQ90+jTZIDz4G6h0uh8coGiAC2neBdLXWWMTfJXBs9CMkdXhgUsj20grdKnEgasy9zpGV0O5TcCxJR5zCa0LD+OS/bgJUNbgAKnMPeMMUFTixN3Zfc6Yit/Twai8dbA5hRbjLO3uDZ86fcU48WxiHwGKwlIA/WHDs/cxh84SHBR9lLIHKAtxZVpgXopu44VHbfgq+Iis4sszgOcHWajauMpvfcc73vGOJ+Mfb2wkd/LrZnAAAAAASUVORK5CYII='
                  price={0}
                  companyLink='https://swetrix.com'
                  companyName='Swetrix'
                />
                <ExtensionsCard
                  name='Eslint'
                  stars={4}
                  downloads={130}
                  imagePath='data:image/jpeg;base64,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'
                  price={0}
                  companyLink='https://swetrix.com'
                  companyName='Swetrix'
                />
                <ExtensionsCard
                  name='Icon theme'
                  stars={5}
                  downloads={91}
                  imagePath='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt3tNqTnGluB7zadPe_PTbbN1Sqsu7A_yU4w&usqp=CAU'
                  price={0}
                  companyLink='https://anime.com'
                  companyName='Anime'
                />
                <ExtensionsCard
                  name='IntePicture'
                  stars={4}
                  downloads={601}
                  imagePath='data:image/png;base64,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'
                  price={0}
                  companyLink='https://swetrix.com'
                  companyName='Swetrix'
                />
                <ExtensionsCard
                  name='Docker'
                  stars={3}
                  downloads={600}
                  imagePath='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_pweAjQS6GdD2bO4MB-PCUO-Cw5oUm9YTwQ&usqp=CAU'
                  price={1000}
                  companyLink='https://microsoft.com'
                  companyName='Microsoft'
                />
              </Glider>
            </div>
          </div>
        </section>
      </div>
    </Title>
  )
}

export default MainPage
