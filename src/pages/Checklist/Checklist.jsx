/* eslint-disable jsx-a11y/anchor-has-content, react/jsx-one-expression-per-line */
import React, { memo, Fragment } from 'react'
import _map from 'lodash/map'
import { useTranslation } from 'react-i18next'

import Title from 'components/Title'

const Checklist = () => {
  const { t } = useTranslation('common')

  return (
    <Title title={t('titles.checklist')}>
      <div className='bg-gray-50 dark:bg-slate-900'>
        <div className='w-11/12 md:w-4/5 mx-auto pb-16 pt-12 px-4 sm:px-6 lg:px-8 whitespace-pre-line'>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-50 tracking-tight'>
            {t('titles.checklist')}
          </h1>
          <p className='mt-4 text-lg text-gray-900 dark:text-gray-50 tracking-tight'>
            {t('checklist.desc')}
          </p>

          {_map(t('checklist.list', { returnObjects: true }), ({ title, desc }, index) => (
            <Fragment key={title}>
              <h3 className='text-2xl font-bold text-gray-900 dark:text-gray-50 tracking-tight mt-4'>
                {`${1 + index}. ${title}`}
              </h3>
              <p className='text-lg text-gray-900 dark:text-gray-50 tracking-tight'>
                {desc}
              </p>
            </Fragment>
          ))}

          <hr className='mt-10 mb-4 border-gray-200 dark:border-gray-600' />
          <p className='text-lg text-gray-900 dark:text-gray-50 tracking-tight'>
            <i>Last updated: November 25, 2022.</i>
          </p>
        </div>
      </div>
    </Title>
  )
}

export default memo(Checklist)
