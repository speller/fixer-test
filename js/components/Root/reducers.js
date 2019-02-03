import {ACTION_LOGIN_SUCCESS, ACTION_LOGOUT} from './constants'


export default function(state = {}, action) {
  switch (action.type) {
    case ACTION_LOGIN_SUCCESS:
      return {
        ...state,
        auth: {...action.payload},
      }

    case ACTION_LOGOUT:
      return {
        ...state,
        auth: null,
        user: null,
      }

    default:
      return {...state}
  }
}