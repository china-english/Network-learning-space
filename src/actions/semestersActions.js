import fetch from 'isomorphic-fetch'

import {ajaxCallError} from './ajaxStatusActions'

import {SERVER_URL} from '../constants/config'
import * as types from '../constants/actionTypes'
import {checkHttpStatus, parseJSON} from '../businessLogic/utils'

export const loadSemestersSuccess = (semesters) => {
  return { type: types.LOAD_SEMESTERS_SUCCESS, semesters }
}

export const loadSemesters = () => {
  let url = `${SERVER_URL}/api/v1/semesters/`
  return dispatch => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((semesters) => {
        dispatch(loadSemestersSuccess(semesters))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}
