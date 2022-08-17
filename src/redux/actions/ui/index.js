import { types } from './types'

const setTheme = (theme) => ({
  type: types.SET_THEME,
  payload: {
    theme,
  },
})

const UIActions = {
  setTheme,
}

export default UIActions
