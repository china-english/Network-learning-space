import * as types from '../constants/actionTypes'
import initialState from './initialState'

const exam = (state = initialState.exams.exam, action) => {
  switch (action.type) {
    // case types.LOAD_EXAM_SUCCESS:
    // {
    //   const oldExams = state.filter(exams => exams.id != action.exams.id);
    //   return [...oldExams, action.exam];
    // }
    // case types.UPDATE_EXAM_RELATED_EXAMPAPERS:
    // {
    //   const oldExams = state.filter(exams => exams.id != action.exampaper.examId);
    //   const newExams = state.filter(exams => exams.id == action.exampaper.examId);
    //   let newExam = newExams[0];
    //   newExam.exampapers.push(action.exampaper.id);
    //   return [...oldExams, newExam];
    // }
    // case types.LOAD_EXAM_PIVOT_BY_PARTY_SUCCESS:
    // {
    //   // const modifiedExam = state.filter(exams => exams.id == action.payload.examId);
    //   // const newExam = ...modifiedExam
    //   return state;
    // }
    case types.CREATE_BOILERPLATE_SUCCESS:
    case types.UPDATE_BOILERPLATE_SUCCESS: {
      return Object.assign({}, state, {
        boilerplate: action.boilerplate
      })
    }
    default:
      return state
  }
}
//
// const examsReducer = (state = initialState.exams, action) => {
//   switch (action.type) {
//     case types.LOAD_EXAMS_SUCCESS:
//       return action.exams;
//     case types.LOAD_EXAM_SUCCESS:
//       return exam(state, action);
//     case types.UPDATE_EXAM_RELATED_EXAMPAPERS:
//       return exam(state, action);
//     case types.LOAD_EXAM_PIVOT_BY_PARTY_SUCCESS:
//       return exam(state, action);
//     default:
//       return state;
//   }
// };

const examsReducer = (state = initialState.exams, action) => {
  switch (action.type) {
    case types.LOAD_EXAMS_SUCCESS:
      return Object.assign({}, state, {
        exams: action.exams.results,
        previous: action.exams.previous,
        next: action.exams.next,
        count: action.exams.count
      })
    case types.UPDATE_EXAMS_PAGE_NUMBER:
      return Object.assign({}, state, { current_page_number: action.page })
    case types.LOAD_EXAM_SUCCESS:
      return Object.assign({}, state, {
        exam: action.exam
      })
    case types.CREATE_EXAM_SUCCESS:
      return Object.assign({}, state, {
        exam: action.exam
      })
    case types.UPDATE_EXAM_SUCCESS:
      return Object.assign({}, state, {
        exam: action.exam
      })
    case types.HIDE_EXAM_SUCCESS:
      return Object.assign({}, state, {
        exam: initialState.exams.exam
      })
    case types.LOAD_KSFS_SUCCESS:
      return Object.assign({}, state, {
        KSFS: action.KSFS
      })
    case types.CREATE_BOILERPLATE_SUCCESS:
    case types.UPDATE_BOILERPLATE_SUCCESS:
      return Object.assign({}, state, {
        exam: exam(state.exam, action)
      })
    case types.LOAD_EXAM_PIVOT_BY_PARTY_SUCCESS:
      return state
    default:
      return state
  }
}

export default examsReducer
