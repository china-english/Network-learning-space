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

const TestpaperSelectionDetail = ({ testpaper_question, children }) => {
  return (
    <div>
      <div>
        {testpaper_question.serial}、{testpaper_question.question} （ {testpaper_question.point} 分 ）
      </div>
      {children}
      <div style={styles.answer}>
        {testpaper_question.A &&
        <div style={styles.questionValue}>A.{testpaper_question.A}</div>
        }
        {testpaper_question.B &&
        <div style={styles.questionValue}>B.{testpaper_question.B}</div>
        }
        {testpaper_question.C &&
        <div style={styles.questionValue}>C.{testpaper_question.C}</div>
        }
        {testpaper_question.D &&
        <div style={styles.questionValue}>D.{testpaper_question.D}</div>
        }
        {testpaper_question.E &&
        <div style={styles.questionValue}>E.{testpaper_question.E}</div>
        }
      </div>
    </div>
  )
}

export default TestpaperSelectionDetail
