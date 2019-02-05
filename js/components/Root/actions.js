import { ACTION_SET_PAGE, PAGE_LOGIN, PAGE_REGISTER } from './constants'

export function showLoginPage () {
  return { 
    type: ACTION_SET_PAGE,
    payload: PAGE_LOGIN,
  }
}

export function showRegisterPage () {
  return {
    type: ACTION_SET_PAGE,
    payload: PAGE_REGISTER,
  }
}

