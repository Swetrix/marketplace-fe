/* eslint-disable jsx-a11y/anchor-has-content, react/jsx-one-expression-per-line */
import React, { memo, Fragment, useEffect } from 'react'
import _map from 'lodash/map'
import Prism from 'prismjs'
import { useTranslation, Trans } from 'react-i18next'
import 'prismjs/themes/prism-tomorrow.css'

import Title from 'components/Title'
import Code from 'ui/Code'
import {
  extensionStructureExample, eventListenerBasicExample, addExportDataRowExample,
  removeExportDataRowExample, addPanelTabExample, removePanelTabExample,
} from './examples'

const contents = (t) => [{
  name: t('docs.titles.start'),
  id: 'docs-gs',
  content: [{
    name: t('docs.titles.whatAreExtensions'),
    id: 'docs-what',
  }, {
    name: t('docs.titles.howDoTheyWork'),
    id: 'docs-how',
  }],
}, {
  name: t('docs.titles.how'),
  id: 'docs-ht',
  content: [{
    name: t('docs.titles.test'),
    id: 'docs-test',
  }, {
    name: t('docs.titles.publish'),
    id: 'docs-pub',
  }],
}, {
  name: t('docs.titles.sdk'),
  id: 'docs-sdk',
  content: [{
    name: t('docs.titles.eventListeners'),
    id: 'docs-evl',
  }, {
    name: 'addExportDataRow',
    id: 'docs-edr',
  }, {
    name: 'removeExportDataRow',
    id: 'docs-redr',
  }, {
    name: 'addPanelTab',
    id: 'docs-apt',
  }, {
    name: 'removePanelTab',
    id: 'docs-rpt',
  }, {
    name: 'trackViews',
    id: 'docs-tv',
  }],
}]

const EXAMPLES_REPO_URL = 'https://github.com/Swetrix/extension-examples'

const Contents = ({ t }) => {
  const tContents = contents(t)

  return (
    <div className='lg:flex flex-1 items-start justify-center lg:order-2'>
      <h2 className='block lg:hidden text-3xl font-bold text-gray-900 dark:text-gray-50 tracking-tight'>
        {t('docs.contents')}
        :
      </h2>
      <ol className='mb-10 lg:mb-0 lg:sticky lg:top-10'>
        {_map(tContents, ({ name, id, content }) => (
          <Fragment key={id}>
            <li className='mt-3'>
              <a className='hover:underline text-2xl text-blue-600 dark:text-gray-50 font-bold' href={`#${id}`}>{name}</a>
            </li>
            <ol>
              {_map(content, ({ name: cname, id: cid }) => (
                <li key={cid}>
                  <a className='hover:underline text-lg text-blue-500 dark:text-gray-200 px-4' href={`#${cid}`}>{cname}</a>
                </li>
              ))}
            </ol>
          </Fragment>
        ))}
      </ol>
    </div>
  )
}

const CHeader = ({ id, name, addHr = true }) => (
  <>
    {addHr && (
      <hr className='mt-10 border-gray-200 dark:border-gray-600' />
    )}
    <h2 id={id} className='text-3xl font-bold text-gray-900 dark:text-gray-50 tracking-tight mt-2 -mb-5'>{name}</h2>
  </>
)

const CSection = ({ id, name }) => (
  <h3 id={id} className='text-2xl font-normal text-gray-900 dark:text-gray-50 tracking-tight mt-8'>{name}</h3>
)

const Docs = () => {
  const { t } = useTranslation('common')

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <Title title={t('titles.docs')}>
      <div className='bg-gray-50 dark:bg-gray-800'>
        <div className='w-11/12 mx-auto pb-16 pt-12 px-4 sm:px-6 lg:w-11/12 lg:px-8 lg:flex'>
          <Contents t={t} />
          <div className='flex-1 lg:order-1 whitespace-pre-line'>
            <h1 className='text-4xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tight'>
              {t('titles.docs')}
            </h1>

            {/* Getting Started */}
            <CHeader id='docs-gs' name={t('docs.titles.start')} addHr={false} />

            {/* What are the extensions? */}
            <CSection id='docs-what' name={t('docs.titles.whatAreExtensions')} />
            <p className='text-lg text-gray-900 dark:text-gray-50 tracking-tight'>
              {t('docs.contents.whatAreExtensions')}
            </p>

            {/* How do they work? */}
            <CSection id='docs-how' name={t('docs.titles.howDoTheyWork')} />
            <p className='text-lg text-gray-900 dark:text-gray-50 tracking-tight'>
              {t('docs.contents.howDoTheyWork')}
            </p>
            <Code text={extensionStructureExample} language='javascript' />
            <p className='text-lg text-gray-900 dark:text-gray-50 tracking-tight'>
              <Trans
                t={t}
                i18nKey='docs.contents.exampleLink'
                components={{
                  url: <a href={EXAMPLES_REPO_URL} className='hover:underline hover:opacity-80 text-indigo-600 dark:text-indigo-400' target='_blank' rel='noopener noreferrer' />,
                }}
              />
            </p>

            {/* How to.. */}
            <CHeader id='docs-ht' name={t('docs.titles.how')} />

            {/* Test an extension */}
            <CSection id='docs-test' name={t('docs.titles.test')} />
            <p className='text-lg text-gray-900 dark:text-gray-50 tracking-tight'>
              {t('docs.contents.test')}
            </p>

            {/* Publish an extension */}
            <CSection id='docs-pub' name={t('docs.titles.publish')} />
            <p className='text-lg text-gray-900 dark:text-gray-50 tracking-tight'>
              {t('docs.contents.publish')}
            </p>

            {/* SDK documentation */}
            <CHeader id='docs-sdk' name={t('docs.titles.sdk')} />

            {/* Event listeners */}
            <CSection id='docs-evl' name={t('docs.titles.eventListeners')} />
            <p className='text-lg text-gray-900 dark:text-gray-50 tracking-tight'>
              {t('docs.contents.eventListeners')}
            </p>
            <Code text={eventListenerBasicExample} language='javascript' />
            <div className='text-lg text-gray-900 dark:text-gray-50 tracking-tight'>
              {t('docs.contents.eventListenersList.desc')}
              <div className='mb-5'>
                <ul className='ml-10'>
                  <li><b>load</b> - {t('docs.contents.eventListenersList.load')}</li>
                  <li className='mt-1'><b>timeupdate</b> - {t('docs.contents.eventListenersList.timeupdate')}</li>
                  <li className='mt-1'><b>filtersupdate</b> - {t('docs.contents.eventListenersList.filtersupdate')}</li>
                  <li className='mt-1'><b>projectinfo</b> - {t('docs.contents.eventListenersList.projectinfo')}</li>
                </ul>
              </div>
            </div>

            {/* addExportDataRow */}
            <CSection id='docs-edr' name='addExportDataRow' />
            <p className='text-lg text-gray-900 dark:text-gray-50 tracking-tight'>
              {t('docs.contents.addExportDataRow')}
            </p>
            <Code text={addExportDataRowExample} language='javascript' />

            {/* removeExportDataRow */}
            <CSection id='docs-redr' name='removeExportDataRow' />
            <p className='text-lg text-gray-900 dark:text-gray-50 tracking-tight'>
              {t('docs.contents.removeExportDataRow')}
            </p>
            <Code text={removeExportDataRowExample} language='javascript' />

            {/* addPanelTab */}
            <CSection id='docs-apt' name='addPanelTab' />
            <p className='text-lg text-gray-900 dark:text-gray-50 tracking-tight'>
              {t('docs.contents.addPanelTab')}
            </p>
            <Code text={addPanelTabExample} language='javascript' />
            <div className='text-lg text-gray-900 dark:text-gray-50 tracking-tight'>
              {t('docs.contents.supportedPanelsList.desc')}
              <div className='mb-5'>
                <ul className='ml-10'>
                  <li><b>cc</b> - {t('docs.contents.supportedPanelsList.cc')}</li>
                  <li className='mt-1'><b>pg</b> - {t('docs.contents.supportedPanelsList.pg')}</li>
                  <li className='mt-1'><b>lc</b> - {t('docs.contents.supportedPanelsList.lc')}</li>
                  <li className='mt-1'><b>ref</b> - {t('docs.contents.supportedPanelsList.ref')}</li>
                  <li className='mt-1'><b>dv</b> - {t('docs.contents.supportedPanelsList.dv')}</li>
                  <li className='mt-1'><b>br</b> - {t('docs.contents.supportedPanelsList.br')}</li>
                  <li className='mt-1'><b>os</b> - {t('docs.contents.supportedPanelsList.os')}</li>
                  <li className='mt-1'><b>so</b> - {t('docs.contents.supportedPanelsList.so')}</li>
                  <li className='mt-1'><b>me</b> - {t('docs.contents.supportedPanelsList.me')}</li>
                  <li className='mt-1'><b>ca</b> - {t('docs.contents.supportedPanelsList.ca')}</li>
                </ul>
              </div>
            </div>

            {/* removePanelTab */}
            <CSection id='docs-rpt' name='removePanelTab' />
            <p className='text-lg text-gray-900 dark:text-gray-50 tracking-tight'>
              {t('docs.contents.removePanelTab')}
            </p>
            <Code text={removePanelTabExample} language='javascript' />

            <hr className='mt-10 mb-4 border-gray-200 dark:border-gray-600' />
            <div className='text-lg text-gray-900 dark:text-gray-50 tracking-tight'>
              <i>Last updated: November 24, 2022.</i><br />
              <div>
                - Initial documentation release.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Title>
  )
}

export default memo(Docs)
