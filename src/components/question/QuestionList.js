import React, {PropTypes} from 'react'
import {Link} from 'react-router'

import Dimensions from 'react-dimensions'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

import QuestionListTable from './QuestionListTable'

const styles = {
  answer: {
    fontSize: 14,
    marginLeft: '16px'
  }
}

const QuestionListTest = ({ questions, questionType }) => {
  const questionsRows = questions && questions.map(question =>
    <Card key={question.id}>
      <CardHeader actAsExpander
        avatar={null}
        showExpandableButton>
        <div
          style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            marginRight: 30,
            position: 'relative',
            bottom: '8px'
          }}>
          {question.question}
        </div>
      </CardHeader>
      <CardText expandable>
        <div>
          { (questionType == '01' || questionType == '04') &&
            <QuestionListTable question={question} />
            }
          {question.answer && questionType != '02' &&
            <div>
              <span style={styles.answer}>正确答案：{question.answer}</span>
            </div>
            }
          {question.answer && questionType == '02' &&
            <div>
              {question.answer == 'A'
                ? <span style={styles.answer}>正确答案：正确</span>
                : question.answer == 'B'
                  ? <span style={styles.answer}>正确答案：错误</span>
                  : <span />}
            </div>
            }
          <FlatButton containerElement={<Link to={`/questions/${questionType}/${question.id}/advance-edit`} />}
            label='查看/修改试题' primary />
        </div>
      </CardText>
    </Card>
    )
  return (
    <div>
      {questionsRows}
    </div>
  )
}

QuestionListTest.propTypes = {
  questions: PropTypes.array.isRequired,
  containerWidth: PropTypes.number.isRequired,
  containerHeight: PropTypes.number.isRequired
}

const QuestionList = Dimensions()(QuestionListTest)
export default QuestionList
