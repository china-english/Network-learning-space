import React from 'react'

import TestpapersDialog from './TestpapersDialog'
import TestpapersQuestionsTable from './TestpapersQuestionsTable'

const styles = {
  relation: {
    margin: 10,
    fontSize: 18,
    fontWeight: 600
  },
  box: {
    display: 'flex',
    margin: 24,
    justifyContent: 'flex-start'
  }
}
class QuestionRelationEditPage extends React.Component {
  render () {
    const { questionId, testpapersQuestionsRelations, questionType, testpapersTitles, deleteTestpaperQuestion } = this.props

    return (
      <div>
        <div style={styles.box}>
          <div style={styles.relation}>相关试卷</div>
          <TestpapersDialog
            questionId={questionId}
            testpapersTitles={testpapersTitles}
            questionType={questionType}
          />
        </div>
        {testpapersQuestionsRelations.length > 0 &&
        <TestpapersQuestionsTable deleteTestpaperQuestion={deleteTestpaperQuestion}
          testpapersQuestionsRelations={testpapersQuestionsRelations}
        />
        }
        <br />
      </div>
    )
  }
}

export default QuestionRelationEditPage
