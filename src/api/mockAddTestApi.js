// 已废弃
const judgementQuestionsLog = {
  'id': 'ca99ebbf-c9fa-43d0-ba9e-0c00709ba9cb',
  'question': '某地结婚随礼朋友同事间一般为200元，某单位领导刘某结婚时，收了其下属单位贾某送来的1000元的随礼。刘某此种行为应受到党纪处分。',
  'answer': 'B',
  'difficulty_degree': '0.0',
  'difficulty_level': 3,
  'subject': 'a1ef6059-6653-42d6-84bc-28a2b3050672'
}
const selectionQuestionsLog = {
  'id': 'ed7fca62-385f-4204-8f50-182ae40d22e2',
  'question': '习近平书记强调，领导干部要始终做到对党（  ）、个人干净、勇于担当。',
  'A': '忠诚',
  'B': '负责',
  'C': '信任',
  'D': '',
  'E': '',
  'answer': 'A',
  'difficulty_degree': '0.0',
  'difficulty_level': 3,
  'subject': 'a1ef6059-6653-42d6-84bc-28a2b3050672'
}
const multiSelectionQuestionsLog = {
  'id': 'fbaa7085-6392-4869-8cb6-095fd292cd5f',
  'question': '共产党员在公私问题上，应该坚持（  ）',
  'A': '公私分明',
  'B': '先公后私',
  'C': '甘于奉献',
  'D': '克己奉公',
  'E': '',
  'answer': 'ABD',
  'difficulty_degree': '0.0',
  'difficulty_level': 3,
  'subject': 'a1ef6059-6653-42d6-84bc-28a2b3050672'
}
const knowledgeLogs = {

}
const testPaperLogs = {

}

class AddQuestionsApi {
  static loadTestPaperLogs (data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(testPaperLogs)
      }, 1000)
    })
  }

  static loadKonwledgeLogs (data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(knowledgeLogs)
      }, 1000)
    })
  }

  static addJudgementQuestion (data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(judgementQuestionsLog)
      }, 1000)
    })
  }

  static addSelectionQuestion (data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(selectionQuestionsLog)
      }, 1000)
    })
  }

  static addMultiSelectionQuestion (data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(multiSelectionQuestionsLog)
      }, 1000)
    })
  }
}

export default AddQuestionsApi
