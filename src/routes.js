import React from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'

import Master from './components/Master'
import HomePage from './components/HomePage'
import LoginPage from './components/auth/LoginPage' // eslint-disable-line
// import/no-named-as-default
import FuelSavingsPage from './containers/FuelSavingsPage' // eslint-disable-line
// import/no-named-as-default
import AboutPage from './components/AboutPage.js'
// import NotFoundPage from './components/NotFoundPage.js';
import ExamsListPage from './components/exams/ExamsListPage'

import ExamInfoPage from './components/exams/ExamDetailPage'    // eslint-disable-line
// import/no-named-as-default
import ExampaperPage from './components/exampapers/ExampaperPage'    // eslint-disable-line
// import/no-named-as-default
import ExampaperInfoPage from './components/exampapers/ExampaperInfoPage'    // eslint-disable-line
// import/no-named-as-default
import ExamEditPage from './components/exams/ExamEditPage'
import ExamItemPage from './components/exampapers/ExamItemPage'    // eslint-disable-line
// import/no-named-as-default
import ExamPivotPage from './components/exams/ExamPivotPage'    // eslint-disable-line
// import/no-named-as-default

// import AssignmentsListPage from "./components/assignments/AssignmentsListPage";
import AssignmentDetailPage from './components/assignments/AssignmnetDetailPage'

// import ProtectedDataPage from './components/ProtectedDataPage';
import TestpapersListPage from './components/testpapers/TestpapersListPage'
import TestpaperCreatePage from './components/testpapers/TestpaperCreatePage'
import TestpaperEditPage from './components/testpapers/TestpaperEditPage'
import TestpaperPage from './components/testpapers/TestpaperPage'

// attendance
import PunchInPage from './components/attendance/PunchInPage'
import RetroactivePage from './components/attendance/RetroactivePage'
import LeaveRequestPage from './components/attendance/LeaveRequestPage'

import { requireAuthentication } from './businessLogic/requireAuthentication'
import QuestionRelationEditPage from './components/question/QuestionRelationEditPage'
import QuestionListPage from './components/question/QuestionListPage'
import KnowledgeListPage from './components/knowledge/KnowledgeListPage'
import VideosListPage from './components/medias/VideosListPage'
import VideoPlayPage from './components/medias/VideoPlayPage'
import TEDListPage from './components/medias/TEDListPage'
import AssessmentsListPage from './components/assessments/AssessmentsListPage'
import EvaluationDetailPage from './components/assessments/EvaluationDetailPage'
import EvaluationMarkPage from './components/assessments/EvaluationMarkPage'
import EvaluationResultsPage from './components/assessments/EvaluationResultsPage'
import SupervisionsListPage from './components/supervisions/SupervisionsListPage'
import SupervisionEditPage from './components/supervisions/SupervisionEditPage'

export default (
  <div>

    <Route path='/supervisions'>
      <IndexRoute component={SupervisionsListPage} />
      <Route path='create' component={SupervisionEditPage} />
      <Route path=':year' component={SupervisionsListPage} />
    </Route>

    <Route path='/' component={Master}>
      <IndexRedirect to='home' />
      <Route path='home' component={HomePage} />
      <Route path='/login' component={LoginPage} />
      <Route path='/about' component={AboutPage} />
      <Route path='/testpapers'>
        <IndexRoute component={TestpapersListPage} />
        <Route path='create' component={TestpaperCreatePage} />
        <Route path=':id'>
          <IndexRoute component={TestpaperPage} />
          <Route path='show' component={TestpaperPage} />
          <Route path='edit' component={TestpaperEditPage} />
          <Route path='update' component={TestpaperCreatePage} />
        </Route>
      </Route>

      <Route path='knowledge' component={requireAuthentication(KnowledgeListPage)} />

      <Route path='/exams'>
        <IndexRoute component={requireAuthentication(ExamsListPage)} />
        <Route path='create' component={ExamEditPage} />
        <Route path=':examId'>
          <Route path='update' component={ExamEditPage} />
          <IndexRoute component={requireAuthentication(ExamInfoPage)} />
          <Route path='/exampapers/:exampaperId' component={requireAuthentication(ExampaperPage)}>
            <IndexRoute component={requireAuthentication(ExampaperInfoPage)} />
            <Route path=':itemId' component={requireAuthentication(ExamItemPage)} />
          </Route>
          <Route path='pivot' component={ExamPivotPage} />
        </Route>
      </Route>

      <Route path='/questions'>
        <IndexRoute component={QuestionListPage} />
        <Route path=':questionType'>
          <Route path=':questionId'>
            <Route path='advance-edit' component={QuestionRelationEditPage} />
          </Route>
        </Route>

        <Route path='pivot' component={ExamPivotPage} />
      </Route>

      <Route path='/assignments'>
        {/* <IndexRoute component={AssignmentsListPage}/> */}
        <Route path=':assignmentId' component={AssignmentDetailPage} />
      </Route>

      <Route path='/ted' component={TEDListPage} />
      <Route path='/videos'>
        <IndexRoute component={VideosListPage} />
        <Route path=':videoId' component={requireAuthentication(VideoPlayPage)} />
      </Route>

      <Route path='/assessments'>
        <IndexRoute component={requireAuthentication(AssessmentsListPage)} />
      </Route>

      <Route path='/evaluations'>
        <Route path=':evaluationId'>
          <IndexRoute component={requireAuthentication(EvaluationDetailPage)} />
          <Route path='results' component={requireAuthentication(EvaluationResultsPage)} />
          <Route path=':evaluationCategory'>
            <IndexRoute component={requireAuthentication(EvaluationMarkPage)} />
          </Route>
          {/* <Route path=":type" component={requireAuthentication(EvaluationMarkPage)}/> */}
        </Route>
      </Route>

      <Route path='/punch'>
        <IndexRoute component={SupervisionsListPage} />
        <Route path='punchIn' component={PunchInPage} />
        <Route path='retroactive' component={RetroactivePage} />
        <Route path='leave' component={LeaveRequestPage} />
      </Route>

      {/* <Route path="*" component={NotFoundPage}/> */}
    </Route>
  </div>
)
