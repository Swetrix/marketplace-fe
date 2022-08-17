import { types } from './types'

export const errorsActions = {
  loginFailed(error) {
    return {
      type: types.LOGIN_FAILED,
      payload: { error },
    }
  },

  signupFailed(error) {
    return {
      type: types.SIGN_UP_FAILED,
      payload: { error },
    }
  },

  updateProfileFailed(error) {
    return {
      type: types.UPDATE_USER_PROFILE_FAILED,
      payload: { error },
    }
  },

  genericError(error) {
    return {
      type: types.GENERIC_ERROR,
      payload: { error },
    }
  },

  clearErrors() {
    return {
      type: types.CLEAR_ERRORS,
    }
  },
}
