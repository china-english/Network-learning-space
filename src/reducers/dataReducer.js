import {createReducer} from '../businessLogic/utils'
import {
  DATA_RECEIVE_PROTECTED_DATA,
  DATA_FETCH_PROTECTED_DATA_REQUEST
} from '../constants/actionTypes'
import initialState from './initialState'

export default createReducer(initialState.data, {
  [DATA_RECEIVE_PROTECTED_DATA]: (state, payload) => {
    return Object.assign({}, state, {
      data: payload.data,
      isFetching: false
    })
  },
  [DATA_FETCH_PROTECTED_DATA_REQUEST]: (state) => {
    return Object.assign({}, state, {
      isFetching: true
    })
  }
})
