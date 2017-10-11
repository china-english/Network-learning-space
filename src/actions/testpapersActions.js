import {browserHistory} from 'react-router'

import * as types from '../constants/actionTypes'
import fetch from 'isomorphic-fetch'
import {SERVER_URL} from '../constants/config'
import {ajaxCallError} from './ajaxStatusActions'
import {checkHttpStatus, parseJSON} from '../businessLogic/utils'

export const loadTestpapersSuccess = (testpapers) => {
  return { type: types.LOAD_TESTPAPERS_SUCCESS, testpapers }
}

export const updateCurrentPage = (page) => {
  return { type: types.UPDATE_TESTPAPERS_PAGE_NUMBER, page }
}

export const loadTestpaperBlocksSuccess = (blocks) => {
  return { type: types.LOAD_TESTPAPER_BLOCKS_SUCCESS, blocks }
}

export const loadTestpaperSectionsSuccess = (sections) => {
  return { type: types.LOAD_TESTPAPER_SECTIONS_SUCCESS, sections }
}

export const loadTestpaperSuccess = (testpaper) => {
  return { type: types.LOAD_TESTPAPER_SUCCESS, testpaper }
}

export const updateSectionSuccess = (section) => {
  return { type: types.UPDATE_SECTION_SUCCESS, section }
}

export const deleteSectionSuccess = (section) => {
  return { type: types.DELETE_SECTION_SUCCESS, section }
}

export const createSectionSuccess = (section) => {
  return { type: types.CREATE_SECTION_SUCCESS, section }
}

export const updateBlockSuccess = (block) => {
  return { type: types.UPDATE_BLOCK_SUCCESS, block }
}

export const deleteBlockSuccess = (block) => {
  return { type: types.DELETE_BLOCK_SUCCESS, block }
}

export const createBlockSuccess = (block) => {
  return { type: types.CREATE_BLOCK_SUCCESS, block }
}

export const loadKslbSuccess = (test_type) => {
  return { type: types.LOAD_KSLB_SUCCESS, test_type }
}

export const loadSjbsSuccess = (pages_layout) => {
  return { type: types.LOAD_SJBS_SUCCESS, pages_layout }
}

export const loadTestpaperQuestionsSuccess = (testpaper_questions) => {
  return { type: types.LOAD_TESTPAPER_QUESTIONS_SUCCESS, testpaper_questions }
}

export const markSubjectSuccess = (subject) => {
  return { type: types.MARK_SUBJECT_SUCCESS, subject }
}

export const markSemesterSuccess = (semester) => {
  return { type: types.MARK_SEMESTER_SUCCESS, semester }
}
export const loadTestpapersTitlesSuccess = (testpapersTitles) => {
  return { type: types.LOAD_TESTPAPERS_TITLES_SUCCESS, testpapersTitles }
}
export const markSubject = (subject) => {
  return markSubjectSuccess(subject)
}

export const markSemester = (semester) => {
  return markSemesterSuccess(semester)
}

export const updateTestpaperSuccess = (testpaper) => {
  return { type: types.UPDATE_TESTPAPER_SUCCESS, testpaper }
}

export const deleteTestpaperSuccess = (testpaper) => {
  return { type: types.DELETE_TESTPAPER_SUCCESS, testpaper }
}

export const createTestpaperSuccess = (testpaper) => {
  return { type: types.CREATE_TESTPAPER_SUCCESS, testpaper }
}

export const loadTestpapers = (subject = '', semester = '', page = 1) => {
  const subjectQuery = subject == '' ? '' : `subject=${subject}`
  const semesterQuery = semester == '' ? '' : `semester=${semester}`
  // const semesterQuery = semester && semester != 'allSemesters' ? `semester=${semester}` : ``;
  const pageQuery = `page=${page}`
  const url = `${SERVER_URL}/api/v1/testpapers/?${subjectQuery}&${semesterQuery}&${pageQuery}`
  console.log(url)
  return dispatch => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((res) => {
        if (page === null || page === undefined) {
          dispatch(updateCurrentPage(1))
        } else {
          dispatch(updateCurrentPage(page))
        }
        dispatch(loadTestpapersSuccess(res))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const loadTestpapersTitles = (subject = '') => {
  let subjectParam = ''
  if (subject != '') {
    subjectParam = `?subject=${subject}`
  }
  console.log(subjectParam)
  const url = `${SERVER_URL}/api/v1/testpapers-titles/${subjectParam}`
  console.log(url)
  return dispatch => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((testpapersTitles) => {
        dispatch(loadTestpapersTitlesSuccess(testpapersTitles))
        return Promise.resolve(testpapersTitles)
      })
      .catch(error => {
        dispatch(ajaxCallError())
        return Promise.reject(error)
      })
  }
}

export const createTestpaper = (testpaper) => {
  let url = `${SERVER_URL}/api/v1/testpapers/`
  return dispatch => {
    return fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        testpaper
      )
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((testpaper) => {
        dispatch(createTestpaperSuccess(testpaper))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const updateTestpaper = (testpaper) => {
  let url = `${SERVER_URL}/api/v1/testpapers/${testpaper.id}/`
  console.log(testpaper)
  return dispatch => {
    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        testpaper
      )
    })
      .then(() => {
        dispatch(updateTestpaperSuccess(testpaper))
      }).catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const deleteTestpaper = (testpaper) => {
  const url = `${SERVER_URL}/api/v1/testpapers/${testpaper.id}/`
  return dispatch => {
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        dispatch(deleteTestpaperSuccess(testpaper))
      }).catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const loadSections = (sectionId) => {
  const url = `${SERVER_URL}/api/v1/testpapers/${sectionId}/sections/`
  return dispatch => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((res) => {
        dispatch(loadTestpaperSectionsSuccess(res))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const updateSection = (section) => {
  let url = `${SERVER_URL}/api/v1/testpapers-sections/${section.id}/`
  return dispatch => {
    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        section
      )
    })
      .then(() => {
        dispatch(updateSectionSuccess(section))
      }).catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const deleteSection = (section) => {
  const url = `${SERVER_URL}/api/v1/testpapers-sections/${section.id}/`
  return dispatch => {
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        dispatch(deleteSectionSuccess(section))
      }).catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const createSection = (section) => {
  let url = `${SERVER_URL}/api/v1/testpapers-sections/`
  return dispatch => {
    return fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        section
      )
    })
      .then(() => {
        dispatch(createSectionSuccess(section))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const loadBlocks = (blockId) => {
  const url = `${SERVER_URL}/api/v1/testpapers/${blockId}/blocks/`
  return dispatch => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((res) => {
        dispatch(loadTestpaperBlocksSuccess(res))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const updateBlock = (block) => {
  let url = `${SERVER_URL}/api/v1/testpapers-blocks/${block.id}/`
  return dispatch => {
    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        block
      )
    })
      .then(() => {
        dispatch(updateBlockSuccess(block))
      }).catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const deleteBlock = (block) => {
  console.log(block)
  const url = `${SERVER_URL}/api/v1/testpapers-blocks/${block.id}/`
  return dispatch => {
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        dispatch(deleteBlockSuccess(block))
      }).catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const createBlock = (block) => {
  let url = `${SERVER_URL}/api/v1/testpapers-blocks/`
  return dispatch => {
    return fetch(url, {
      // TODO 实现POST
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        block
      )
    })
      .then(() => {
        dispatch(createBlockSuccess(block))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const loadKslb = () => {
  const url = `${SERVER_URL}/api/v1/lib/kslb/`
  return dispatch => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((res) => {
        dispatch(loadKslbSuccess(res))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const loadSjbs = () => {
  const url = `${SERVER_URL}/api/v1/lib/sjbs/`
  return dispatch => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((res) => {
        dispatch(loadSjbsSuccess(res))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const loadTestpaper = (testpaperId) => {
  if (testpaperId) {
    const url = `${SERVER_URL}/api/v1/testpapers/${testpaperId}/`
    return dispatch => {
      return fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then((res) => {
          dispatch(loadTestpaperSuccess(res))
        })
        .catch(error => {
          dispatch(ajaxCallError())
          throw (error)
        })
    }
  } else {
    return loadTestpaperSuccess('')
  }
}

export const loadTestpaperQuestions = (testpaperId) => {
  const url = `${SERVER_URL}/api/v1/testpapers/${testpaperId}/questions/`
  return dispatch => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(json => {
        dispatch(loadTestpaperQuestionsSuccess(json))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}
