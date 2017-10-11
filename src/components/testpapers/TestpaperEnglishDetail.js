import React from 'react'

import {createMarkup, getObjectById} from '../../businessLogic/utils'
const styles = {
  questionValue: {
    fontSize: 14,
    padding: 3
  },
  answer: {
    marginLeft: 16
  }
}

const TestpaperEnglishDetail = ({ testpaper_question, children }) => {
  return (
    <div>
      <div>
        {testpaper_question.serial}、<i>{testpaper_question.requirement}</i>（ {testpaper_question.point} points ）
      </div>
      <br />
      <div dangerouslySetInnerHTML={createMarkup(testpaper_question.question)} />
      <br />

      {children}
      <div style={styles.answer} />
    </div>
  )
}

export default TestpaperEnglishDetail
