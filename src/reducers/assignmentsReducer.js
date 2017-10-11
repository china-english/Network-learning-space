import * as types from '../constants/actionTypes'
import initialState from './initialState'

const assignments = (state, action) => {
  switch (action.type) {
    case types.LOAD_ASSIGNMENT_SUCCESS:
      {
        console.log(action)
      }
    case types.CREATE_ASSIGNMENT_SUCCESS:
      {
      // const oldExams = state.filter(exams => exams.id != action.exams.id);
      // return [...oldExams, action.exam];
        return state
      }
    case types.UPDATE_ASSIGNMENT_SUCCESS:
      {
      // const oldExams = state.filter(exams => exams.id != action.exampaper.examId);
      // const newExams = state.filter(exams => exams.id == action.exampaper.examId);
      // let newExam = newExams[0];
      // newExam.exampapers.push(action.exampaper.id);
      // return [...oldExams, newExam];
        return state
      }
    case types.DELETE_ASSIGNMENT_SUCCESS:
      {
      // const modifiedExam = state.filter(exams => exams.id == action.payload.examId);
      // const newExam = ...modifiedExam
        return state
      }
    default:
      return state
  }
}

const assignmentsReducer = (state = initialState.assignments, action) => {
  switch (action.type) {
    case types.LOAD_ASSIGNMENTS_SUCCESS:
      return Object.assign({}, state, {assignments: action.assignments})
    case types.LOAD_ASSIGNMENT_SUCCESS:
      return Object.assign({}, state, {assignment: action.assignment})
    case types.LOAD_ASSIGNMENT_SUBMISSIONS_SUCCESS:
      return Object.assign({}, state, {submissions: action.submissions})
    case types.LOAD_ASSIGNMENT_REVIEWS_SUCCESS:
      return Object.assign({}, state, {reviews: action.reviews})
    case types.UPDATE_ASSIGNMENT_SUCCESS:
      return assignments(state, action)
    case types.DELETE_ASSIGNMENT_SUCCESS:
      return assignments(state, action)
    default:
      return state
  }
}

export default assignmentsReducer
