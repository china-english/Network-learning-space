'use strict'

import fetch from 'isomorphic-fetch'

import { SERVER_URL } from '../constants/config'
import { checkHttpStatus, parseJSON } from '../businessLogic/utils'

import * as types from '../constants/actionTypes'
import type { Action, ThunkAction } from './types'
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions'

/**
 * evaluations and supervisions relations
 */

export const loadSupervisionsSuccess = (supervisions: Array<Object>): Action => {
  return {type: types.LOAD_SUPERVISIONS_SUCCESS, supervisions}
}

export const editSupervisionSuccess = (selectedSupervision: Object): Action => {
  return {type: types.EDIT_SUPERVISION_SUCCESS, selectedSupervision}
}

export const reloadSelectedSupervisionSuccess = (selectedSupervision: Object): Action => {
  return {type: types.RELOAD_SELECTED_SUPERVISION_SUCCESS, selectedSupervision}
}

export const cleanSupervisionSuccess = (): Action => {
  return {type: types.CLEAN_SELECTED_SUPERVISION_SUCCESS}
}

// export const loadSupervisionSuccess = (supervision: Object): Action => {
//   return {type: types.LOAD_SUPERVISION_SUCCESS, supervision}
// }

export const loadSupervisions = (year: number = 0): ThunkAction => {
  return (dispatch) => {
    dispatch(beginAjaxCall())
    const yearParam = year > 0 ? `?year=${year}` : ``
    return fetch(`${SERVER_URL}/api/v1/supervisions/${yearParam}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(supervisions => {
        dispatch(loadSupervisionsSuccess(supervisions))
        return supervisions
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw(error)
      })
  }
}

export const editSupervision = (supervision: Object): ThunkAction => {
  console.log(supervision['id'])
  const url = supervision['id'] === undefined
    ? `${SERVER_URL}/api/v1/supervisions/`
    : `${SERVER_URL}/api/v1/supervisions/${supervision['id']}/`
  const method = supervision['id'] === undefined ? 'POST' : 'PUT'
  return (dispatch, getState) => {
    return fetch(url, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${getState().auth.token}`
      },
      body: JSON.stringify(
        supervision
      )
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(supervision => {
        dispatch(editSupervisionSuccess(supervision))
        return supervision
      })
      .catch(error => {
        console.log(error)
        dispatch(ajaxCallError())
        throw(error)
      })
  }
}

export const reloadSelectedSupervision = (supervision: Object): ThunkAction => {
  console.log(supervision['id'])
  const url = supervision['id'] === undefined
    ? `${SERVER_URL}/api/v1/supervisions/`
    : `${SERVER_URL}/api/v1/supervisions/${supervision['id']}/`
  const method = supervision['id'] === undefined ? 'POST' : 'PUT'
  return (dispatch, getState) => {
    return fetch(url, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${getState().auth.token}`
      },
      body: JSON.stringify(
        supervision
      )
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(supervision => {
        dispatch(editSupervisionSuccess(supervision))
        return supervision
      })
      .catch(error => {
        console.log(error)
        dispatch(ajaxCallError())
        throw(error)
      })
  }
}
