import React from 'react'
const styles = {
  questionValue: {
    fontSize: 14,
    padding: 3
  },
  answer: {
    marginLeft: 16
  }
}

const TestpaperJudgeDetail = ({ testpaper_question, children }) => {
  return (
    <div>
      <div>
        {testpaper_question.serial}、{testpaper_question.question} （ {testpaper_question.point} 分 ）
      </div>
      {children}
      <div style={styles.answer}>
        正确 错误
      </div>
    </div>
  )
}

export default TestpaperJudgeDetail
