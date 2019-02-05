import { call, put, takeLatest } from 'redux-saga/effects'
import {
  ACTION_LOGIN,
  ACTION_LOGIN_FAIL,
  ACTION_LOGIN_SUCCESS,
  ACTION_REGISTER,
  ACTION_REGISTER_FAIL,
  ACTION_REGISTER_SUCCESS
} from './constants'
import axios from 'axios'
import { putFailAction } from './utils'

const BASE_URL = 'http://localhost:5000'

function * loginWorker(action) {
  try {
    const response = yield call(
      axios,
      {
        url: '/Authentication/AjaxLogin',
        baseURL: BASE_URL,
        method: 'post',
        data: {...action.payload},
      }
    )
    const result = response.data
    if (result && result.success) {
      yield put({
        type: ACTION_LOGIN_SUCCESS,
      })
    } else {
      yield putFailAction(ACTION_LOGIN_FAIL, {message: result.reason ?? 'unknown error'})
    }
  } catch (e) {
    yield putFailAction(ACTION_LOGIN_FAIL, e)
  }
}


function * registerWorker(action) {
  try {
    const response = yield call(
      axios,
      {
        url: '/Authentication/AjaxRegister',
        baseURL: BASE_URL,
        method: 'post',
        data: {...action.payload},
      }
    )
    const result = response.data
    if (result && result.success) {
      yield put({
        type: ACTION_REGISTER_SUCCESS,
      })
    } else {
      yield putFailAction(ACTION_REGISTER_FAIL, {message: result.reason ?? 'unknown error'})
    }
  } catch (e) {
    yield putFailAction(ACTION_REGISTER_FAIL, e)
  }
}



export default [
  function * () {
    yield takeLatest(ACTION_LOGIN, loginWorker)
  },
  function * () {
    yield takeLatest(ACTION_REGISTER, registerWorker)
  },
]