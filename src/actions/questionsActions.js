import * as types from '../constants/actionTypes'
import fetch from 'isomorphic-fetch'
import {SERVER_URL} from '../constants/config'
import {checkHttpStatus, parseJSON} from '../businessLogic/utils'
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions'
import {push} from 'react-router-redux'

export const loadQuestionsSuccess = (questions) => {
  return { type: types.LOAD_QUESTIONS_SUCCESS, questions }
}

export const loadQuestionSuccess = (question) => {
  return { type: types.LOAD_QUESTION_SUCCESS, question }
}

export const loadQuestionTypeListSuccess = (questionTypeList) => {
  return { type: types.LOAD_QUESTION_TYPE_LIST_SUCCESS, questionTypeList }
}

export const updateCurrentPage = (page) => {
  return { type: types.UPDATE_QUESTIONS_PAGE_NUMBER, page }
}

export const loadKnowledgeQuestionsRelationsSuccess = (knowledgeQuestionsRelations) => {
  return { type: types.LOAD_KNOWLEDGE_QUESTIONS_SUCCESS, knowledgeQuestionsRelations }
}

export const loadTestpapersQuestionsSuccess = (testpapersQuestionsRelations) => {
  return { type: types.LOAD_QUESTION_TESTPAPERS_SUCCESS, testpapersQuestionsRelations }
}

export const deleteTestpapersQuestionSuccess = (testpapersQuestionsRelation) => {
  return { type: types.DELETE_QUESTION_TESTPAPERS_SUCCESS, testpapersQuestionsRelation }
}

export const deleteKnowledgeQuestionSuccess = (knowledgeQuestionsRelation) => {
  return { type: types.DELETE_KNOWLEDGE_QUESTION_SUCCESS, knowledgeQuestionsRelation }
}

export const changeQuestionsPreviewTypeSuccess = (questionsPreviewType) => {
  return { type: types.CHANGE_QUESTION_PREVIEW_TYPE, questionsPreviewType }
}

export const updateTestpapersPageQuestionSuccess = (testpaper_question) => {
  return { type: types.UPDATE_TESTPAPER_PAGE_QUESTION_SUCCESS, testpaper_question }
}

export const deleteTestpapersPageQuestionSuccess = (testpaper_question_id) => {
  return { type: types.DELETE_TESTPAPER_PAGE_QUESTION_SUCCESS, testpaper_question_id }
}

export const loadEngSelectionsSuccess = (engSelections) => {
  return { type: types.LOAD_ENG_SELECTIONS_SUCCESS, engSelections }
}

export const createEngSelectionSuccess = (engSelection) => {
  return { type: types.CREATE_ENG_SELECTION_SUCCESS, engSelection }
}

export const updateEngSelectionSuccess = (engSelection) => {
  return { type: types.UPDATE_ENG_SELECTION_SUCCESS, engSelection }
}

export const deleteEngSelectionSuccess = (engSelectionId) => {
  return { type: types.DELETE_ENG_SELECTION_SUCCESS, engSelectionId }
}

export const loadEngOptionsSuccess = (engOptions) => {
  return { type: types.LOAD_ENG_OPTION_SUCCESS, engOptions }
}

export const createEngOptionSuccess = (engOption) => {
  return { type: types.CREATE_ENG_OPTION_SUCCESS, engOption }
}

export const updateEngOptionSuccess = (engOption) => {
  return { type: types.UPDATE_ENG_OPTION_SUCCESS, engOption }
}

export const deleteEngOptionSuccess = (engOptionId) => {
  return { type: types.DELETE_ENG_OPTION_SUCCESS, engOptionId }
}

export const loadEngBlanksSuccess = (engBlanks) => {
  return { type: types.LOAD_ENG_BLANKS_SUCCESS, engBlanks }
}

export const createEngBlankSuccess = (engBlank) => {
  return { type: types.CREATE_ENG_BLANK_SUCCESS, engBlank }
}

export const updateEngBlankSuccess = (engBlank) => {
  return { type: types.UPDATE_ENG_BLANK_SUCCESS, engBlank }
}

export const deleteEngBlankSuccess = (engBlankId) => {
  return { type: types.DELETE_ENG_BLANK_SUCCESS, engBlankId }
}
export const loadEngQuestionTypeListSuccess = (engQuestionTypeList) => {
  return { type: types.LOAD_ENG_QUESTION_TYPE_LIST, engQuestionTypeList }
}

export const clearQuestion = () => {
  return diapatch => {
    return diapatch(loadQuestionSuccess(null))
  }
}

export const changeQuestionsPreviewType = (questionsPreviewType) => {
  return dispatch => {
    dispatch(changeQuestionsPreviewTypeSuccess(questionsPreviewType))
  }
}

export const loadQuestionTypeList = () => {
  const url = `${SERVER_URL}/api/v1/lib/stlxyw/`
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
      .then((questionTypeList) => {
        return dispatch(loadQuestionTypeListSuccess(questionTypeList))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const loadEngQuestionTypeList = () => {
  console.log('loadEngQuestionTypeList ')
  const url = `${SERVER_URL}/api/v1/lib/yystlx/`
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
      .then((engQuestionTypeList) => {
        return dispatch(loadEngQuestionTypeListSuccess(engQuestionTypeList))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const loadQuestion = (questionTypeYw, questionId) => {
  const url = `${SERVER_URL}/api/v1/${questionTypeYw}-editor/${questionId}/`
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
      .then((question) => {
        dispatch(loadQuestionSuccess(question))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const loadQuestions = (questionType, page) => {
  return dispatch => {
    dispatch(beginAjaxCall())
    if (page === null || page === undefined) {
      page = 1
    }
    const url = `${SERVER_URL}/api/v1/${questionType}-editor/?page=${page}`
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((questions) => {
        dispatch(updateCurrentPage(page))
        dispatch(loadQuestionsSuccess(questions))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const loadTestpapersQuestions = (questionId) => {
  const url = `${SERVER_URL}/api/v1/questions/${questionId}/testpapers/`

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
      .then((testpapersQuestions) => {
        dispatch(loadTestpapersQuestionsSuccess(testpapersQuestions.results))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const loadKnowledgeQuestionsRelations = (questionId) => {
  const url = `${SERVER_URL}/api/v1/questions/${questionId}/knowledge/`
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
      .then((KnowledgeQuestionsRelations) => {
        dispatch(loadKnowledgeQuestionsRelationsSuccess(KnowledgeQuestionsRelations.results))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const saveQuestion = (question, questionTypeYw) => {
  if (question.id == null) {
    const url = `${SERVER_URL}/api/v1/${questionTypeYw}-editor/`
    return dispatch => {
      return fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          question
        )
      })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then((newQuestion) => {
          question.testpaper
            ? dispatch(createTestpapersQuestion(newQuestion.id, question))
            : dispatch(push(`/questions/${question.question_type}/${newQuestion.id}/advance-edit`))
        })
        .catch(error => {
          dispatch(ajaxCallError())
          throw (error)
        })
    }
  } else {
    const url = `${SERVER_URL}/api/v1/${questionTypeYw}-editor/${question.id}/`
    return dispatch => {
      return fetch(url, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          question
        )
      })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then((newQuestion) => {
          question.testpaper
            ? dispatch(updateTestpapersQuestion(newQuestion.id, question))
            : dispatch(loadQuestionSuccess(newQuestion))
        })
        .catch(error => {
          question.testpaper
            ? dispatch(updateTestpapersQuestion(newQuestion.id, question))
            : dispatch(ajaxCallError())
          throw (error)
        })
    }
  }
}

export const deleteQuestion = (question, questionTypeYw) => {
  const url = `${SERVER_URL}/api/v1/${questionTypeYw}-editor/${question.id}/`
  return dispatch => {
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(
        () => {
          dispatch(push(`/questions/`))
        })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const createKnowledgeQuestion = (question, questionType, knowledgeQuestionsRelations) => {
  let knowledgeQuestionData = {}
  knowledgeQuestionData.question_id = question.id
  knowledgeQuestionData.question_type = questionType

  return dispatch => {
    const url = `${SERVER_URL}/api/v1/knowledge-questions/`
    knowledgeQuestionsRelations.map(
      (knowledgeQuestion) => {
        knowledgeQuestionData.knowledge = knowledgeQuestion
        return fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            knowledgeQuestionData
          )
        }).then(
          () => {
            dispatch(loadKnowledgeQuestionsRelations(question.id))
          }
        )
          .catch(error => {
            dispatch(ajaxCallError())
            throw (error)
          })
      })
  }
}

export const deleteKnowledgeQuestion = (knowledgeQuestionsRelation) => {
  const url = `${SERVER_URL}/api/v1/knowledge-questions/${knowledgeQuestionsRelation.id}/`
  return dispatch => {
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        dispatch(deleteKnowledgeQuestionSuccess(knowledgeQuestionsRelation))
      }).catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const createTestpapersQuestion = (questionId, testpapersQuestionsRelation) => {
  let formData = {}

  formData.point = testpapersQuestionsRelation.point
  formData.serial = testpapersQuestionsRelation.serial
  formData.testpaper = testpapersQuestionsRelation.testpaper
  formData.question_id = questionId
  formData.question_type = testpapersQuestionsRelation.question_type
  const url = `${SERVER_URL}/api/v1/testpapers-questions/`
  return dispatch => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        formData
      )
    })
      .then(
        () => {
          testpapersQuestionsRelation.difficulty_level
            ? dispatch(updateTestpapersPageQuestionSuccess(testpapersQuestionsRelation))
            : dispatch(loadTestpapersQuestions(questionId))
        })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const updateTestpapersQuestion = (questionId, testpapersQuestionsRelation) => {
  let formData = {}
  formData.point = testpapersQuestionsRelation.point
  formData.serial = testpapersQuestionsRelation.serial
  formData.testpaper = testpapersQuestionsRelation.testpaper
  formData.question_id = questionId
  formData.question_type = testpapersQuestionsRelation.question_type
  formData.id = testpapersQuestionsRelation.testpaper_question_id
  const url = `${SERVER_URL}/api/v1/testpapers-questions/${testpapersQuestionsRelation.testpaper_question_id}/`
  return dispatch => {
    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        formData
      )
    })
      .then(
        () => {
          testpapersQuestionsRelation.difficulty_level
            ? dispatch(updateTestpapersPageQuestionSuccess(testpapersQuestionsRelation))
            : dispatch(loadTestpapersQuestions(questionId))
        })
      .catch(error => {
        testpapersQuestionsRelation.difficulty_level
          ? dispatch(updateTestpapersPageQuestionSuccess(testpapersQuestionsRelation))
          : dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const deleteTestpapersQuestion = (testpapersQuestionsRelation) => {
  let url
  testpapersQuestionsRelation.testpaper_question_id
    ? url = `${SERVER_URL}/api/v1/testpapers-questions/${testpapersQuestionsRelation.testpaper_question_id}/`
    : url = `${SERVER_URL}/api/v1/testpapers-questions/${testpapersQuestionsRelation.id}/`
  return dispatch => {
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        testpapersQuestionsRelation.testpaper_question_id
          ? dispatch(deleteTestpapersPageQuestionSuccess(testpapersQuestionsRelation.testpaper_question_id))
          : dispatch(deleteTestpapersQuestionSuccess(testpapersQuestionsRelation))
      }).catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const loadEngSelections = () => {
  const url = `${SERVER_URL}/api/v1/lib/stlxyw/`
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
      .then((questionTypeList) => {
        return dispatch(loadQuestionTypeListSuccess(questionTypeList))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const saveEngSelection = (engSelection) => {
  if (engSelection.id == null) {
    const url = `${SERVER_URL}/api/v1/eng-selections-editor/`
    return dispatch => {
      console.log('post eng selection')
      return fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          engSelection
        )
      })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then((json) => {
          dispatch(createEngSelectionSuccess(json))
        })
        .catch(error => {
          dispatch(ajaxCallError())
          throw (error)
        })
    }
  } else {
    const url = `${SERVER_URL}/api/v1/eng-selections-editor/${engSelection.id}/`
    return dispatch => {
      return fetch(url, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          engSelection
        )
      })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then((json) => {
          dispatch(updateEngSelectionSuccess(json))
        })
        .catch(error => {
          dispatch(ajaxCallError())
          throw (error)
        })
    }
  }
}

export const deleteEngSelection = (engSelectionId) => {
  const url = `${SERVER_URL}/api/v1/eng-selection-editor/${engSelectionId}/`
  return dispatch => {
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        dispatch(deleteEngSelectionSuccess(engSelectionId))
      }).catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const loadEngOptions = () => {
  const url = `${SERVER_URL}/api/v1/lib/stlxyw/`
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
      .then((questionTypeList) => {
        return dispatch(loadQuestionTypeListSuccess(questionTypeList))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const saveEngOption = (engOption) => {
  if (engOption.id == null) {
    const url = `${SERVER_URL}/api/v1/eng-option-editor/`
    return dispatch => {
      return fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          engOption
        )
      })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then((json) => {
          dispatch(createEngOptionSuccess(json))
        })
        .catch(error => {
          dispatch(ajaxCallError())
          throw (error)
        })
    }
  } else {
    const url = `${SERVER_URL}/api/v1/eng-option-editor/${engOption.id}/`
    return dispatch => {
      return fetch(url, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          engOption
        )
      })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then((json) => {
          dispatch(updateEngOptionSuccess(json))
        })
        .catch(error => {
          dispatch(ajaxCallError())
          throw (error)
        })
    }
  }
}

export const deleteEngOption = (engOptionId) => {
  const url = `${SERVER_URL}/api/v1/eng-option-editor/${engOptionId}/`
  return dispatch => {
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        dispatch(deleteEngOptionSuccess(engOptionId))
      }).catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const loadEngBlanks = (engQuestionId) => {
  const url = `${SERVER_URL}/api/v1/eng-blanks-editor/`
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
      .then((questionTypeList) => {
        return dispatch(loadEngBlanksSuccess(questionTypeList))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const saveEngBlank = (engBlank) => {
  if (engBlank.id == null) {
    const url = `${SERVER_URL}/api/v1/eng-blanks-editor/`
    return dispatch => {
      return fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          engBlank
        )
      })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then((json) => {
          dispatch(createEngBlankSuccess(json))
        })
        .catch(error => {
          dispatch(ajaxCallError())
          throw (error)
        })
    }
  } else {
    const url = `${SERVER_URL}/api/v1/eng-blanks-editor/${engBlank.id}/`
    return dispatch => {
      return fetch(url, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          engBlank
        )
      })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then((json) => {
          dispatch(updateEngBlankSuccess(json))
        })
        .catch(error => {
          dispatch(ajaxCallError())
          throw (error)
        })
    }
  }
}

export const deleteEngBlank = (engBlankId) => {
  const url = `${SERVER_URL}/api/v1/eng-blanks-editor/${engBlankId}/`
  return dispatch => {
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        dispatch(deleteEngBlankSuccess(engBlankId))
      }).catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}
