import * as types from '../constants/actionTypes'
import initialState from './initialState'

export default function semesterReducers (state = initialState.semesters, action) {
  switch (action.type) {
    case types.LOAD_SEMESTERS_SUCCESS:
      return action.semesters
    default:
      return state
  }
}
