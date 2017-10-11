
import type { Action } from '../actions/types'
import initialState from './initialState'
import * as types from '../constants/actionTypes'

export type State = {
  assessments: Array<Object>,
  selectedAssessment: ?Object,
  selectedAssessmentRelation: ?Object,
  selectedEvaluation: ?Object,
  activatedPeopleScoresCount: 0,
  activatedSchoolsScoresCount: 0,
  evaluationPeopleList: Array<Object>,
  evaluationSchoolsList: Array<Object>,
  evaluationResults: Array<Object>,
}

export default function (state: State = initialState.assessments, action: Action): State {
  switch (action.type) {
    case types.LOAD_ASSESSMENTS_SUCCESS: {
      return Object.assign({}, state, {
        assessments: action.assessments
      })
    }
    case types.LOAD_ASSESSMENT_SUCCESS: {
      return Object.assign({}, state, {
        selectedAssessment: action.assessment
      })
    }
    case types.LOAD_ASSESSMENT_RELATION_SUCCESS: {
      return Object.assign({}, state, {
        selectedAssessmentRelation: action.relation
      })
    }
    case types.LOAD_EVALUATION_SUCCESS: {
      return Object.assign({}, state, {
        selectedEvaluation: action.evaluation
      })
    }
    case types.LOAD_EVALUATION_RESULTS_SUCCESS: {
      return Object.assign({}, state, {
        evaluationResults: action.results
      })
    }
    case types.CLEAN_ASSESSMENT_RELATION: {
      return Object.assign({}, state, {
        selectedAssessmentRelation: null
      })
    }
    case types.LOAD_ACTIVATED_PEOPLE_SCORES_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        activatedPeopleScoresCount: action.count,
      })
    }
    case types.LOAD_ACTIVATED_SCHOOLS_SCORES_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        activatedSchoolsScoresCount: action.count,
      })
    }
    case types.CREATE_PERSON_SCORE_RELATION_SUCCESS:
    case types.CREATE_SCHOOL_SCORE_RELATION_SUCCESS:
    case types.ACTIVATE_SCORES_SUCCESS:
    default:
      return state
  }
}
