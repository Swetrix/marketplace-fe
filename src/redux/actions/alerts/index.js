import { types } from './types'

export const alertsActions = {
  accountUpdated(message, type = 'success') {
    return {
      type: types.ACCOUNT_UPDATED,
      payload: { message, type },
    }
  },

  clearAlerts() {
    return {
      type: types.CLEAR_ALERTS,
    }
  },

  newExtension(message, type = 'success') {
    return {
      type: types.CREATE_NEW_EXTENSION_SUCCESS,
      payload: { message, type },
    }
  },

  extensionDeleted(message, type = 'success') {
    return {
      type: types.CREATE_NEW_EXTENSION_SUCCESS,
      payload: { message, type },
    }
  },

}
