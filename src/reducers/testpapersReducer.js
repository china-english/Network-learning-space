import * as types from '../constants/actionTypes'
import initialState from './initialState'

export default function testpapersReducer (state = initialState.testpapers, action) {
  switch (action.type) {
    case types.LOAD_TESTPAPERS_SUCCESS:
      return Object.assign({}, state, {
        testpapers: action.testpapers.results,
        previous: action.testpapers.previous,
        next: action.testpapers.next,
        count: action.testpapers.count
      })
    case types.LOAD_TESTPAPERS_TITLES_SUCCESS:
      return Object.assign({}, state, {
        testpapersTitles: action.testpapersTitles
      })
    case types.UPDATE_TESTPAPER_SUCCESS:
      return Object.assign({}, state, {
        testpaper: action.testpaper
      })
    case types.DELETE_TESTPAPER_SUCCESS:
      return Object.assign({}, state, {
        testpapers: [...state.testpapers.filter(testpaper => testpaper.id !== action.testpaper.id)]
      })
    case types.CREATE_TESTPAPER_SUCCESS:
      return Object.assign({}, state, {
        testpapers: [...state.testpapers, action.testpaper],
        testpaper: action.testpaper
      })
    case types.LOAD_TESTPAPER_QUESTIONS_SUCCESS:
      return Object.assign({}, state, {
        testpaper_questions: action.testpaper_questions
      })
    case types.UPDATE_TESTPAPERS_PAGE_NUMBER:
      return Object.assign({}, state, {
        current_page_number: action.page
      })
    case types.MARK_SUBJECT_SUCCESS:
      return Object.assign({}, state, {
        subject: action.subject
      })
    case types.MARK_SEMESTER_SUCCESS:
      return Object.assign({}, state, {
        semester: action.semester
      })
    case types.LOAD_TESTPAPER_SUCCESS:
      return Object.assign({}, state, {
        testpaper: action.testpaper
      })
    case types.LOAD_TESTPAPER_BLOCKS_SUCCESS:
      return Object.assign({}, state, {
        blocks: action.blocks
      })
    case types.UPDATE_BLOCK_SUCCESS:
      return Object.assign({}, state, {
        blocks: [...state.blocks.filter(block => block.id !== action.block.id),
          action.block
        ]
      })
    case types.DELETE_BLOCK_SUCCESS:
      return Object.assign({}, state, {
        blocks: [...state.blocks.filter(block => block.id !== action.block.id)]
      })
    case types.CREATE_BLOCK_SUCCESS:
      return Object.assign({}, state, {
        blocks: [...state.blocks, action.block]
      })
    case types.LOAD_TESTPAPER_SECTIONS_SUCCESS:
      return Object.assign({}, state, {
        sections: action.sections
      })
    case types.UPDATE_SECTION_SUCCESS:
      return Object.assign({}, state, {
        sections: [...state.sections.filter(section => section.id !== action.section.id),
          action.section
        ]
      })
    case types.DELETE_SECTION_SUCCESS:
      return Object.assign({}, state, {
        sections: [...state.sections.filter(section => section.id !== action.section.id)]
      })
    case types.CREATE_SECTION_SUCCESS:
      return Object.assign({}, state, {
        sections: [...state.sections, action.section]
      })
    case types.LOAD_TESTPAPER_BLOCK_SUCCESS:
      return Object.assign({}, state, {
        block: action.block
      })
    case types.LOAD_TESTPAPER_SECTION_SUCCESS:
      return Object.assign({}, state, {
        section: action.section
      })
    case types.LOAD_KSLB_SUCCESS:
      return Object.assign({}, state, {
        test_type: action.test_type
      })
    case types.LOAD_SJBS_SUCCESS:
      return Object.assign({}, state, {
        pages_layout: action.pages_layout
      })
    case types.UPDATE_TESTPAPER_PAGE_QUESTION_SUCCESS:
      console.log('reducer')
      console.log(action.testpaper_question)
      return Object.assign({}, state, {
        testpaper_questions: [...state.testpaper_questions.filter(testpaper_question => testpaper_question.id !== action.testpaper_question.id),
          action.testpaper_question
        ]
      })
    case types.DELETE_TESTPAPER_PAGE_QUESTION_SUCCESS:
      return Object.assign({}, state, {
        testpaper_questions: [...state.testpaper_questions.filter(testpaper_question => testpaper_question.testpaper_question_id !== action.testpaper_question_id)]
      })
    default :
      return state
  }
}
