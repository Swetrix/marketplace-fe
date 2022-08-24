import { put, call } from 'redux-saga/effects'
import _map from 'lodash/map'
import _isString from 'lodash/isString'
import Debug from 'debug'

import UIActions from 'redux/actions/ui'

import { ENTRIES_PER_PAGE_DASHBOARD } from 'redux/constants'
import {
  getPublishExtensions, getOverallStats, getLiveVisitors,
} from '../../../api'

const debug = Debug('swetrix:rx:s:load-projects')

export default function* loadPublishExtensions({ payload: { take = ENTRIES_PER_PAGE_DASHBOARD, skip = 0 } }) {
  try {
    yield put(UIActions.setProjectsLoading(true, true))

    let {
      // eslint-disable-next-line prefer-const
      results, totalMonthlyEvents, total,
    } = yield call(getPublishExtensions, take, skip)
    const projectsWithShared = _map(results, (project) => {
      return {
        ...project,
        project: {
          ...project.project,
          shared: true,
        },
      }
    })
    const pids = _map(projectsWithShared, ({ project }) => project.id)
    let overall

    try {
      overall = yield call(getOverallStats, pids)
    } catch (e) {
      debug('failed to overall stats: %s', e)
    }

    results = _map(projectsWithShared, res => ({
      ...res,
      project: {
        ...res.project,
        overall: overall?.[res.project.id],
      },
    }))

    yield put(UIActions.setExtensions(results, true))
    yield put(UIActions.setTotalMonthlyEvents(totalMonthlyEvents))
    yield put(UIActions.setTotal(total, true))

    const liveStats = yield call(getLiveVisitors, pids)
    yield put(UIActions.setLiveStats(liveStats, true))
  } catch ({ message }) {
    if (_isString(message)) {
      yield put(UIActions.setExtensionsError(message))
    }
    debug('failed to load projects: %s', message)
  }
}
