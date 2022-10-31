import { types } from 'redux/actions/ui/types'

const getInitialState = () => {
  return {
    offset: 0,
    limit: 18,
  }
}

// eslint-disable-next-line default-param-last
const searchReducer = (state = getInitialState(), { type, payload }) => {
  switch (type) {
    case types.SET_OFFSET: {
      const { offset } = payload

      return {
        ...state,
        offset,
      }
    }

    default:
      return state
  }
}

export default searchReducer
