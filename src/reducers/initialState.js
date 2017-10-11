export default {
  fuelSavings: {
    newMpg: '',
    tradeMpg: '',
    newPpg: '',
    tradePpg: '',
    milesDriven: '',
    milesDrivenTimeframe: 'week',
    displayResults: false,
    dateModified: null,
    necessaryDataIsProvidedToCalculateSavings: false,
    savings: {
      monthly: 0,
      annual: 0,
      threeYear: 0
    }
  },
  auth: {
    token: null,
    username: '',
    person: {},
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
  },
  semesters: [],
  testpapers: {
    count: 0,
    testpaper_questions: [],
    next: null,
    previous: null,
    current_page_number: 1,
    // 获取的所有试卷
    testpapers: [],
    testpapersTitles: [],
    test_type: {},
    pages_layout: {},
    // 获取的当前试卷
    testpaper: {
      id: '',
      title: '',
      subtitle: '',
      test_type: null,
      pages_number: null,
      pages_layout: null,
      points: null,
      duration: null,
      has_formulas: false,
      notes: '',
      subject: '',
      semester: ''
    },
    // 获取的当前试卷的所有blocks
    blocks: [],
    // 获取某一模块
    block: {
      number: '',
      start_number: '',
      end_number: '',
      title: '',
      points: '',
      duration: '',
      testpaper: ''
    },
    // 获取的当前试卷的所有sections
    sections: [],
    //
    section: {
      number: '',
      start_number: null,
      end_number: null,
      requirement: '',
      points: null,
      duration: null,
      testpaper: null
    },
    subject: null,
    semester: null
  },
  data: {
    data: null,
    isFetching: false
  },
  exams: {
    // 所有的考试
    exams: [],
    previous: null,
    next: null,
    count: 0,
    current_page_number: 1,
    // 当前打开的 exam 或 当前正在创建的 exam
    exam: {
      id: '',
      name: '',
      invigilator_number: 2,
      testpaper: null,
      boilerplate: {}
    },
    boilerplate: {},
    KSFS: null
  },
  // current exam's exampapers
  exampapers: {
    exampapers: [],
    exampaper: {
      id: ''
    }
  },
  assignments: {
    // all selected assignments.
    assignments: [],
    // current selected assignment
    assignment: {
      title: '',
      deadline: null
    },
    // current selected assignment's submissions
    submissions: [],
    // current selected assignment's submissions' reviews
    reviews: []
  },
  // medias app
  medias: {
    // videos
    videos: [],
    previous: null,
    next: null,
    count: 0,
    current_page_number: 1,
    // current selected video and its related user's video record
    video: {},
    // ted random videos:
    tedRandomVideos: [],
    // current user's video records
    videoRecords: []
  },
  // don't need to include all the exampapers;
  ajaxCallInProgress: 0,

  subjects: [],
  knowledgeList: [],

  questions: {
    // 全部试题
    questions: [],
    questionsPreviewType: null,
    // 当前在编辑或查看的试题，新建试题时保持为null
    question: null,
    // 当前试题相关的知识点
    knowledgeQuestionsRelations: [],
    // 当前试题相关的试卷
    testpapersQuestionsRelations: [],
    previous: null,
    next: null,
    count: 0,
    current_page_number: 1,
    questionTypeList: null,
    engQuestionTypeList: null,
    engBlanks: [],
    engSelections: [],
    engOptions: []
  },
  assessments: {
    assessments: [],
    selectedAssessment: null,
    selectedEvaluation: null,
    activatedPeopleScoresCount: 0,
    activatedSchoolsScoresCount: 0,
    selectedAssessmentRelation: null,
    evaluationPeopleList: [],
    evaluationSchoolsList: []
  }

}
