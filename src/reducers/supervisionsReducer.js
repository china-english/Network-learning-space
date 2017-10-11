import type { Action } from '../actions/types'
import * as types from '../constants/actionTypes'

export type State = {
  supervisions: Array<Object>,
  selectedSupervision: ?Object,
}

const initialState = {
  supervisions: [],
  selectedSupervision: null,
}

export default function (state: State = initialState, action: Action): State {
  switch (action.type) {
    case types.LOAD_SUPERVISIONS_SUCCESS: {
      return Object.assign({}, state, {
        supervisions: action.supervisions,
      })
    }
    case types.EDIT_SUPERVISION_SUCCESS: {
      return Object.assign({}, state, {
        selectedSupervision: action.selectedSupervision,
      })
    }
    case types.RELOAD_SELECTED_SUPERVISION_SUCCESS: {
      return Object.assign({}, state, {
        selectedSupervision: action.selectedSupervision,
      })
    }
    case types.CLEAN_SELECTED_SUPERVISION_SUCCESS: {
      return Object.assign({}, state, {
        selectedSupervision: null
      })
    }
    default:
      return state
  }
}
