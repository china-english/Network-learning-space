import {createReducer} from '../businessLogic/utils'
import {
  AUTH_LOGIN_USER_REQUEST,
  AUTH_LOGIN_USER_SUCCESS,
  AUTH_LOGIN_USER_FAILURE,
  AUTH_LOGOUT_USER,
  LOAD_PERSON_INFO
} from '../constants/actionTypes'
import jwtDecode from 'jwt-decode'

import initialState from './initialState'

export default createReducer(initialState.auth, {
  [AUTH_LOGIN_USER_REQUEST]: (state) => {
    return Object.assign({}, state, {
      isAuthenticating: true,
      statusText: null
    })
  },
  [AUTH_LOGIN_USER_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: true,
      token: payload.token,
      username: jwtDecode(payload.token).username,
      statusText: 'You have been successfully logged in.'
    })
  },
  [AUTH_LOGIN_USER_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: false,
      token: null,
      username: null,
      statusText: `Authentication Error: ${payload.status} ${payload.statusText}`
    })
  },
  [AUTH_LOGOUT_USER]: (state) => {
    return Object.assign({}, state, {
      isAuthenticated: false,
      token: null,
      username: null,
      statusText: 'You have been successfully logged out.'
    })
  },
  [LOAD_PERSON_INFO]: (state, payload) => {
    return Object.assign({}, state, {
      person: payload.person
    })
  }
})
