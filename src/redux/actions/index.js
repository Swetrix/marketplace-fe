import { types } from './types'

export const structuredProject = (project) => ({
  type: types.STRUCTURED_PROJECT,
  payload: { project },
})
