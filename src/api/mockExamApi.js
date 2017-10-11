import delay from './delay'

const exams = [
  {
    id: '2016lxyz', // uuid
    title: '2016年两学一做测试',
    notes: '此处为测试说明',
    exampapers: []  // user related exampapers id
  }
]

class ExamApi {
  static getAllExams () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], exams))
      }, delay)
    })
  }
}

export default ExamApi
