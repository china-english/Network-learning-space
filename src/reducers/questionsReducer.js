import * as types from '../constants/actionTypes'
import initialState from './initialState'

export default function questionsReducer (state = initialState.questions, action) {
  switch (action.type) {
    case types.LOAD_QUESTION_TYPE_LIST_SUCCESS:
      return Object.assign({}, state, { questionTypeList: action.questionTypeList })
    case types.LOAD_QUESTION_SUCCESS:
      return Object.assign({}, state, { question: action.question })
    case types.LOAD_TESTPAPERS_TITLES_SUCCESS:
      return Object.assign({}, state, { testpapersTitles: action.testpapersTitles })
    case types.LOAD_KNOWLEDGE_QUESTIONS_SUCCESS:
      return Object.assign({}, state, { knowledgeQuestionsRelations: action.knowledgeQuestionsRelations })
    case types.LOAD_QUESTION_TESTPAPERS_SUCCESS:
      return Object.assign({}, state, { testpapersQuestionsRelations: action.testpapersQuestionsRelations })
    case types.UPDATE_QUESTIONS_PAGE_NUMBER:
      return Object.assign({}, state, { current_page_number: action.page })
    case types.DELETE_QUESTION_TESTPAPERS_SUCCESS:
      return Object.assign({}, state,
        {
          testpapersQuestionsRelations: [
            ...state.testpapersQuestionsRelations.filter(
              testpapersQuestionsRelation => testpapersQuestionsRelation.id !== action.testpapersQuestionsRelation.id)
          ]
        }
      )
    case types.DELETE_KNOWLEDGE_QUESTION_SUCCESS:
      return Object.assign({}, state,
        {
          knowledgeQuestionsRelations: [
            ...state.knowledgeQuestionsRelations.filter(
              knowledgeQuestionsRelation => knowledgeQuestionsRelation.id !== action.knowledgeQuestionsRelation.id)
          ]
        }
      )
    case types.LOAD_QUESTIONS_SUCCESS:
      return Object.assign({}, state, {
        questions: action.questions.results,
        previous: action.questions.previous,
        next: action.questions.next,
        count: action.questions.count
      })
    case types.CHANGE_QUESTION_PREVIEW_TYPE:
      return Object.assign({}, state, {
        questionsPreviewType: action.questionsPreviewType
      })
    case types.LOAD_ENG_QUESTION_TYPE_LIST:
      return Object.assign({}, state, {
        engQuestionTypeList: action.engQuestionTypeList
      })
    case types.LOAD_ENG_BLANKS_SUCCESS:
      return Object.assign({}, state, {
        engBlanks: action.engBlanks
      })

    default:
      return state
  }
}
