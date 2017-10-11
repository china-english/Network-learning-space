import React, {PropTypes} from 'react'
import {Link} from 'react-router'

import FlatButton from 'material-ui/FlatButton'
import {MODIFY} from '../../constants/strings'
import QuestionPropertyEditDialog from '../question/QuestionPropertyEditDialog'
import TestpaperJudgeDetail from './TestpaperJudgeDetail'
import TestpaperSelectionDetail from './TestpaperSelectionDetail'
import TestpaperBlankDetail from './TestpaperBlankDetail'
import TestpaperEnglishDetail from './TestpaperEnglishDetail'
import DeletePrompt from '../../businessLogic/DeletePrompt'
import EngQuestionPropertyEditDialog from '../question/EngQuestionPropertyEditDialog'

const styles = {
  title: {
    margin: 24,
    fontSize: 24,
    fontWeight: 700,
    textAlign: 'center'
  },
  box: {
    display: 'flex',
    flex: 1
  },
  testpapers: {
    margin: 24
  },
  questionItem: {
    margin: 24,
    fontSize: 14,
    fontWeight: 500
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 500,
    margin: 16
  },
  answer: {
    marginLeft: 16
  },
  toggle: {
    width: 120,
    margin: 16
  }
}

const TestpaperQuestionsList = ({ toggle, subjects, testpaperId, testpaper_questions, handleDelete, startSerial, endSerial }) => {
  return (
    <div>
      {testpaper_questions && subjects && testpaper_questions.map(
        testpaper_question => {
          if (testpaper_question.serial >= startSerial && testpaper_question.serial <= endSerial) {
            return (
              <div style={styles.questionItem} key={testpaper_question.id}>
                {(testpaper_question.question_type == '01' || testpaper_question.question_type == '04') &&
                <TestpaperSelectionDetail testpaper_question={testpaper_question}>
                  {toggle &&
                  <div style={styles.box}>
                    <QuestionPropertyEditDialog questionType={testpaper_question.question_type}
                      primaryText={MODIFY}
                      question={testpaper_question}
                      testpaperId={testpaperId}
                      buttonType='FlatButton' />
                    <DeletePrompt handleDelete={handleDelete} content={testpaper_question} name='试题' />
                  </div>
                  }
                </TestpaperSelectionDetail>
                }
                {testpaper_question.question_type == '02' &&
                <TestpaperJudgeDetail testpaper_question={testpaper_question}>
                  {toggle &&
                  <div style={styles.box}>
                    <QuestionPropertyEditDialog questionType={testpaper_question.question_type}
                      primaryText={MODIFY}
                      question={testpaper_question}
                      testpaperId={testpaperId}
                      buttonType='FlatButton' />
                    <DeletePrompt handleDelete={handleDelete} content={testpaper_question} name='试题' />
                  </div>
                  }
                </TestpaperJudgeDetail>
                }
                {testpaper_question.question_type == '03' &&
                <TestpaperBlankDetail testpaper_question={testpaper_question}>
                  {toggle &&
                  <div style={styles.box}>
                    <QuestionPropertyEditDialog questionType={testpaper_question.question_type}
                      primaryText={MODIFY}
                      testpaperId={testpaperId}
                      question={testpaper_question}
                      buttonType='FlatButton' />
                    <DeletePrompt handleDelete={handleDelete} content={testpaper_question} name='试题' />
                  </div>
                  }
                </TestpaperBlankDetail>
                }
                {testpaper_question.question_type == '05' &&
                <TestpaperEnglishDetail testpaper_question={testpaper_question}>
                  {toggle &&
                  <div style={styles.box}>
                    <QuestionPropertyEditDialog questionType={testpaper_question.question_type}
                      primaryText={MODIFY}
                      testpaperId={testpaperId}
                      question={testpaper_question}
                      buttonType='FlatButton' />
                    <EngQuestionPropertyEditDialog question={testpaper_question} primaryText='添加' engQuestionType={testpaper_question.category} />
                    <DeletePrompt handleDelete={handleDelete} content={testpaper_question} name='试题' />
                  </div>
                  }
                </TestpaperEnglishDetail>
                }
              </div>
            )
          }
        }
      )
      }
    </div>
  )
}

export default TestpaperQuestionsList
