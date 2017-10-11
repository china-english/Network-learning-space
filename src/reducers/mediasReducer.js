
import * as types from '../constants/actionTypes'
import initialState from './initialState'

const videoRecords = (state, action) => {
  switch (action.type) {
    case types.SET_VIDEO_FAVORITE_SUCCESS:
    case types.CANCEL_VIDEO_FAVORITE_SUCCESS:
    case types.SET_USER_VIDEO_WATCH_LATER_SUCCESS:
    case types.CANCEL_USER_VIDEO_WATCH_LATER_SUCCESS:
    case types.EDIT_VIDEO_RECORD_SUCCESS: {
      console.log(action.videoRecord)
      const oldVideoRecords = state.filter(videoRecord => videoRecord.id != action.videoRecord.id)
      return [...oldVideoRecords, action.videoRecord]
    }
    default:
      return state
  }
}

const mediasReducer = (state = initialState.medias, action) => {
  switch (action.type) {
    case types.LOAD_VIDEOS_SUCCESS: {
      return Object.assign({}, state, {
        videos: action.videos.results,
        previous: action.videos.previous,
        next: action.videos.next,
        count: action.videos.count
      }
      )
    }
    case types.LOAD_TED_RANDOM_VIDEOS_SUCCESS: {
      return Object.assign({}, state, { tedRandomVideos: action.videos })
    }
    case types.UPDATE_VIDEOS_PAGE_NUMBER: {
      return Object.assign({}, state, { current_page_number: action.page })
    }
    case types.LOAD_USER_VIDEO_RECORDS_SUCCESS: {
      return Object.assign({}, state, { videoRecords: action.videoRecords })
    }
    case types.LOAD_VIDEO_SUCCESS: {
      return Object.assign({}, state, { video: action.video })
    }
    case types.SET_VIDEO_FAVORITE_SUCCESS:
    case types.CANCEL_VIDEO_FAVORITE_SUCCESS:
    case types.SET_USER_VIDEO_WATCH_LATER_SUCCESS:
    case types.CANCEL_USER_VIDEO_WATCH_LATER_SUCCESS:
    case types.EDIT_VIDEO_RECORD_SUCCESS: {
      return Object.assign({}, state, { videoRecords: videoRecords(state.videoRecords, action) })
    }
    // return Object.assign({}, state)
    default:
      return state
  }
}

export default mediasReducer
