import { ACTION_LOGIN_SUCCESS, ACTION_LOGOUT, ACTION_SET_PAGE } from './constants'

export default function(state = {}, action) {
  switch (action.type) {
    case ACTION_SET_PAGE:
      return {
        ...state,
        page: action.payload,
      }
    
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