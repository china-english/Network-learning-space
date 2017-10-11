// @flow
import * as types from '../constants/actionTypes'

export type Action =
  // routeActions
  // { type: types.PUSH_NEW_ROUTE, route: string }
  //   | { type: types.POP_ROUTE }
  //   | { type: types.POP_TO_ROUTE, route: string }
  //   | { type: types.REPLACE_ROUTE, route: string }
  //   | { type: types.REPLACE_OR_PUSH_ROUTE, route: string }
  // assessmentsActions
  { type: types.LOAD_ASSESSMENTS_SUCCESS, assessments: Array<Object> }
  | { type: types.LOAD_ASSESSMENT_SUCCESS, assessment: Object }
  | { type: types.LOAD_ASSESSMENT_RELATION_SUCCESS, relation: Object }
  | { type: types.CLEAN_ASSESSMENT_RELATION }
  | { type: types.LOAD_EVALUATION_SUCCESS, evaluation: Object }
  | { type: types.LOAD_EVALUATION_RESULTS_SUCCESS, results: Array<Object> }
  | { type: types.CREATE_PERSON_SCORE_RELATION_SUCCESS, personScoreRelation: Object }
  | { type: types.CREATE_SCHOOL_SCORE_RELATION_SUCCESS, schoolScoreRelation: Object }
  | { type: types.ACTIVATE_SCORES_SUCCESS }
  | { type: types.LOAD_ACTIVATED_PEOPLE_SCORES_COUNT_SUCCESS }
  | { type: types.LOAD_ACTIVATED_SCHOOLS_SCORES_COUNT_SUCCESS }
  // supervisionsActions
  | { type: types.LOAD_SUPERVISIONS_SUCCESS, supervisions: Array<Object> }
  | { type: types.RELOAD_SELECTED_SUPERVISION_SUCCESS, selectedSupervision: Object }
  | { type: types.EDIT_SUPERVISION_SUCCESS, selectedSupervision: Object }
  | { type: types.CLEAN_SELECTED_SUPERVISION_SUCCESS }
  | { type: types.EDIT_SUPERVISION_PERSON_RELATION_SUCCESS, personRelationCreated: Object }
  | { type: types.EDIT_SUPERVISION_SCHOOL_RELATION_SUCCESS, schoolRelationCreated: Object }
  | { type: types.EDIT_SUPERVISION_PROGRESS_SUCCESS, progressCreated: Object }

export type Dispatch = (action: Action | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
