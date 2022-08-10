import { types } from 'redux/actions/types'

const initialState = {
  project: null,
}

// eslint-disable-next-line default-param-last
const structuredReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.STRUCTURED_PROJECT:
      return {
        ...state,
        project: payload.project,
      }
    default:
      return state
  }
}

export default structuredReducer
