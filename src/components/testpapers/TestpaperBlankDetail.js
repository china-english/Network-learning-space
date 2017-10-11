import React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
const styles = {
  questionValue: {
    fontSize: 14,
    padding: 3
  },
  answer: {
    margin: '8px 8px 8px 16px'
  }
}

const TestpaperBlankDetail = ({ testpaper_question, children }) => {
  return (
    <div>
      <div>
        {testpaper_question.serial}、{testpaper_question.question} （ {testpaper_question.point} 分 ）
      </div>
      {children}
      <div>
        <Card style={styles.answer}>
          <CardText>
            <br />
            <br />
            <br />
          </CardText>
        </Card>
      </div>
    </div>
  )
}

export default TestpaperBlankDetail
