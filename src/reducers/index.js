import { combineReducers } from 'redux'
import fuelSavings from './fuelSavingsReducer'
import auth from './authReducer'
import data from './dataReducer'
import semesters from './semestersReducer'
import exams from './examsReducer'
import exampapers from './exampapersReducer'
import questions from './questionsReducer'
import knowledgeList from './knowledgeReducer'
import testpapers from './testpapersReducer'
import subjects from './subjectsReducer'
import assignments from './assignmentsReducer'
import medias from './mediasReducer'
import assessments from './assessmentsReducer'
import supervisions from './supervisionsReducer'
import ajaxCallsInProgress from './ajaxStatusReducer'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'

// Add the reducer to your store on the `routing` key
const rootReducer = combineReducers({
  fuelSavings,
  auth,
  data,
  exams,
  semesters,
  exampapers,
  knowledgeList,
  subjects,
  assignments,
  questions,  // 添加上knowledge subjects testpaper reuducer
  testpapers,
  medias,
  assessments,
  supervisions,
  ajaxCallsInProgress,
  form,
  routing
})

export default rootReducer
