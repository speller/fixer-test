import { call, put, takeLatest } from 'redux-saga/effects'
import { ACTION_LOGIN, ACTION_LOGIN_FAIL, ACTION_LOGIN_SUCCESS } from './constants'
import axios from 'axios'
import { putFailAction } from './utils'

function * loginWorker(action) {
  try {
    const response = yield call(
      axios,
      {
        url: '',
        baseURL: config.wpApiUrl,
        method: httpMethod,
        data: httpMethod === 'post' ? {...payload} : {},
        params: httpMethod === 'get' ? {...payload} : {},
        transformRequest: [(data, headers) => {
          let body = []
          for (const name in data) {
            body.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]))
          }
          headers['Content-Type'] = 'application/x-www-form-urlencoded'
          return body.join('&')
        }],
        headers: headers,
      }
    )
    const result = response.data
    let r
    if (isArray(result)) {
      for (const resItem of result) {
        if (resItem.err === 0) {
          r = resItem
          break
        }
      }
    } else {
      r = result
    }
    if (!r) {
      throw new Error('Can not find user profile')
    }
    yield put({
      type: ACTION_LOGIN_SUCCESS,
      payload: {
        email: r.mail,
        countryId: r.country_id,
        id: r.id,
        uniqueId: r.unique_id,
        pmCompany: r.pm_company,
      },
    })
  } catch (e) {
    yield putFailAction(ACTION_LOGIN_FAIL, e)
  }
}



export default [
  function * () {
    // register watchForLogin action worker
    yield takeLatest(ACTION_LOGIN, loginWorker)
  },
]