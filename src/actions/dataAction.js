import fetch from 'isomorphic-fetch'
import {push} from 'react-router-redux'

import {SERVER_URL} from '../constants/config'
import {checkHttpStatus, parseJSON} from '../businessLogic/utils'
import {
  DATA_FETCH_PROTECTED_DATA_REQUEST,
  DATA_RECEIVE_PROTECTED_DATA
} from '../constants/actionTypes'
import {authLoginUserFailure} from './authActions'

export function dataReceiveProtectedData (data) {
  return {
    type: DATA_RECEIVE_PROTECTED_DATA,
    payload: {
      data
    }
  }
}

export function dataFetchProtectedDataRequest () {
  return {
    type: DATA_FETCH_PROTECTED_DATA_REQUEST
  }
}

export function dataFetchProtectedData (token) {
  return (dispatch) => {
    dispatch(dataFetchProtectedDataRequest())
    return fetch(`${SERVER_URL}/api/v1/getdata/`, {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        Authorization: `JWT ${token}`
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        dispatch(dataReceiveProtectedData(response.data))
      })
      .catch(error => {
        if (error.response.status === 401) {
          dispatch(authLoginUserFailure(error))
          dispatch(push('/login'))
        }
      })
  }
}
