import * as types from '../constants/actionTypes'
import initialState from './initialState'

export default function subjectsReducer (state = initialState.subjects, action) {
  switch (action.type) {
    case types.LOAD_SUBJECTS_SUCCESS:
      return action.subjects
    default:
      return state
  }
}
