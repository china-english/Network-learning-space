import delay from './delay'

const exampaper = {
  id: 'paper1',
  // todo: add the user when the backend code is prepared!
  // userId: 'testUser',
  examId: '2016lxyz',
  startDateTime: '1',
  submittedDateTime: undefined,
  submitted: false,
  selections: [
    {
      id: 's01',
      sequence: 1,
      question: '这里是题目1问题',
      A: '题目1选项A',
      B: '题目1选项B',
      C: '题目1选项C',
      D: '题目1选项D',
      answer: undefined
    },
    {
      id: 's02',
      sequence: 2,
      question: '这里是题目2问题',
      A: '题目2选项A',
      B: '题目2选项B',
      C: '题目2选项C',
      D: '题目2选项D',
      answer: undefined
    },
    {
      id: 's03',
      sequence: 3,
      question: '这里是题目3问题',
      A: '题目3选项A',
      B: '题目3选项B',
      C: '题目3选项C',
      D: '题目3选项D',
      E: '题目3选项E',
      answer: undefined
    }
  ],
  judges: [
    {
      id: 'j01',
      sequence: 11,
      question: '这里是判断题11的题干',
      A: '正确',
      B: '错误',
      answer: undefined
    },
    {
      id: 'j02',
      sequence: 12,
      question: '这里是判断题12的题干',
      A: '正确',
      B: '错误',
      answer: undefined
    },
    {
      id: 'j03',
      sequence: 13,
      question: '这里是判断题13的题干',
      A: '正确',
      B: '错误',
      answer: undefined
    }
  ],
  multiSelections: [
    {
      id: 'm01',
      sequence: 21,
      question: '这里是题目21问题',
      A: '题目21选项A',
      B: '题目21选项B',
      C: '题目21选项C',
      D: '题目21选项D',
      answer: ''
    },
    {
      id: 'm02',
      sequence: 22,
      question: '这里是题目22问题',
      A: '题目22选项A',
      B: '题目22选项B',
      C: '题目22选项C',
      D: '题目22选项D',
      answer: ''
    },
    {
      id: 'm03',
      sequence: 23,
      question: '这里是题目23问题',
      A: '题目23选项A',
      B: '题目23选项B',
      C: '题目23选项C',
      D: '题目23选项D',
      E: '题目23选项E',
      answer: ''
    }
  ]
}

class ExampaperApi {
/*  static getExamExampapers (exams) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], exampapers));
      });
    });
  } */

  static createExampaper (exam) {    // eslint-disable-line no-unused-vars
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign({}, exampaper))
      }, delay)
    })
  }

  static updateItemAnswer (item, answer) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulating update here.
        // The server would return new item here.
        item.answer = answer
        resolve(Object.assign({}, item))
      }, delay)
    })
  }

  static submitExampaper (exampaper) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulating submitting.
        exampaper.submitted = true
        resolve(Object.assign({}, exampaper))
      }, delay)
    })
  }

  // TODO: add user and exams as parameters
  // static getUserExamExampapers (userId, examId) {

  // }

  static getExampaperById (id) {    // eslint-disable-line no-unused-vars
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign({}, exampaper))
      }, delay)
    })
  }
}

export default ExampaperApi
