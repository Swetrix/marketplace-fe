import { combineReducers } from 'redux'
import theme from './theme'
import extensions from './extensions'
import search from './search'

export default combineReducers({
  theme,
  extensions,
  search,
})
