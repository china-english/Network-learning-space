import * as types from '../constants/actionTypes'
import initialState from './initialState'

export default function knowledgeReducers (state = initialState.knowledgeList, action) {
  switch (action.type) {
    case types.LOAD_SUBJECT_KNOWLEDGE_SUCCESS:
      return Object.assign([], action.knowledgeList)
    case types.CREATE_KNOWLEDGE_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.knowledge)
      ]
    case types.UPDATE_KNOWLEDGE_SUCCESS:
      return [
        ...state.filter(knowledge => knowledge.id !== action.knowledge.id),
        Object.assign({}, action.knowledge)
      ]
    case types.DELETE_KNOWLEDGE_SUCCESS:
      return [
        ...state.filter(knowledge => knowledge.id !== action.knowledge.id)
      ]
    default:
      return state
  }
}
