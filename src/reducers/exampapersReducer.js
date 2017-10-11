import * as types from '../constants/actionTypes'
import initialState from './initialState'

const exampaper = (state, action) => {
  switch (action.type) {
    case types.UPDATE_ITEM_ANSWER_LOCALLY: {
      const newExampaper = Object.assign({}, state)
      switch (action.itemType) {
        case 'selection': {
          const index = newExampaper.selections_relations.findIndex(selection => selection.selection.id == action.itemId)
          if (index >= 0) {
            newExampaper.selections_relations[index].user_answer = action.answer
          }
          break
        }
        case 'judge': {
          const index = newExampaper.judges_relations.findIndex(judge => judge.judge.id == action.itemId)
          if (index >= 0) {
            newExampaper.judges_relations[index].user_answer = action.answer
            // console.log(newExampaper);
          }
          break
        }
        case 'multiselection': {
          const index = newExampaper.multiselections_relations.findIndex(multiselection => multiselection.multiselection.id == action.itemId)
          if (index >= 0) {
            const origin_answer = (
                newExampaper.multiselections_relations[index].user_answer == null ||
                newExampaper.multiselections_relations[index].user_answer == ''
              )
                ? ''
                : newExampaper.multiselections_relations[index].user_answer

            const ansIndex = origin_answer.indexOf(action.answer)
            if (ansIndex >= 0) {
              newExampaper.multiselections_relations[index].user_answer =
                origin_answer.slice(0, ansIndex) +
                origin_answer.slice(ansIndex + 1, origin_answer.length)
            } else {
              newExampaper.multiselections_relations[index].user_answer = origin_answer + action.answer
            }
          }
          break
        }
        default:
          break
      }
      return Object.assign({}, newExampaper)
    }
    default:
      break
  }
}

const exampapers = (state, action) => {
  switch (action.type) {
    case types.SUBMIT_EXAMPAPER_SUCCESS: {
      const newExampaper = state.find(exampaper => exampaper.id == action.exampaperId)
      newExampaper.is_submitted = true
      const otherExampapers = state.filter(exampaper => exampaper.id != action.exampaperId)
      return [newExampaper, ...otherExampapers]
    }
    default:
      return state
  }
}

const exampapersReducer = (state = initialState.exampapers, action) => {
  switch (action.type) {
    case types.LOAD_EXAM_USER_EXAMPAPERS_SUCCESS:
      return Object.assign({}, state,
        { exampapers: [...action.exampapers] })
    case types.CREATE_EXAMPAPER_SUCCESS:
    case types.LOAD_EXAMPAPER_SUCCESS: {
      return Object.assign({}, state,
        { exampaper: action.exampaper })
    }
    case types.UPDATE_ITEM_ANSWER_LOCALLY:
      return Object.assign({}, state,
        { exampaper: exampaper(state.exampaper, action) }
      )
    case types.UPDATE_ITEM_ANSWER_SUCCESS:
      return state
    case types.SUBMIT_EXAMPAPER_SUCCESS:
      return Object.assign({}, state,
        { exampapers: exampapers(state.exampapers, action) }
      )

    default:
      return state
  }
}

export default exampapersReducer
