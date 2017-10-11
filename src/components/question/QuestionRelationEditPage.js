import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';

import QuestionDetailTab from './QuestionDetailTab';
import TestpaperQuestionRelationTab from './TestpaperQuestionRelationTab';
import KnowledgeQuestionRelationTab from './KnowledgeQuestionRelationTab';
import {BACK} from '../../constants/strings';

import * as questionsActions from '../../actions/questionsActions';
import * as subjectsActions from '../../actions/subjectsActions';
import * as testpapersActions from '../../actions/testpapersActions';
import AutoCompleteExampleSimple from './AutoCompleteExmapleSimple';

const styles = {
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },

  boxRight: {
    margin: 24,
    justifyContent: 'flex-end',
    display: 'flex',
    flex: 1,
  },
  boxChild: {
    maxWidth: 1076,
    width: '100%',
    margin: 24
  },
  QuestionDetailTab: {
    margin: 24,
  },
  Tab: {
    color: '#000000',
    backgroundColor: "#EEEEEE"
  },


};

class QuestionRelationEditPage extends React.Component {
  state = {
    knowldegeList: null,
    deleting: false,
    slideIndex: 0,
  };

  componentWillMount () {
    const { loadTestpapersTitles }=this.props.testpapersActions;
    const { loadSubjects }=this.props.subjectsActions;
    const { loadTestpapersQuestions, loadQuestion, loadKnowledgeQuestionsRelations, loadQuestionTypeList, changeQuestionsPreviewType, loadEngQuestionTypeList }=this.props.questionsActions;
    loadKnowledgeQuestionsRelations(this.props.questionId);
    changeQuestionsPreviewType(this.props.questionType);
    loadTestpapersTitles();
    loadSubjects();
    loadTestpapersQuestions(this.props.questionId);
    if (!this.props.engQuestionTypeList) {  //涉及到state和componentWillMount问题，不验证题型而加载该数据
      loadEngQuestionTypeList();
    }

    loadQuestionTypeList().then(
      ()=> {
        if (this.props.questionId && this.props.questionTypeList) {
          const questionTypeYw = this.props.questionTypeList;
          loadQuestion(questionTypeYw[this.props.questionType][0], this.props.questionId);
        }
      }
    );
  }

  //删除本道试题相关联的某一个knowledge-question
  deleteKnowledgeQuestion = (value)=> {
    const { deleteKnowledgeQuestion }=this.props.questionsActions;
    deleteKnowledgeQuestion(value);
  };

  // 删除本道试题相关的某一个testpapers-question
  deleteTestpaperQuestion = (value)=> {
    const { deleteTestpapersQuestion }=this.props.questionsActions;
    deleteTestpapersQuestion(value);
  };

  render () {
    let { engQuestionTypeList, questionTypeList, questionsActions, question, questionId, testpapersTitles, knowledgeQuestionsRelations, questionType, subjects, testpapersQuestionsRelations, knowledgeList }=this.props;
    if (testpapersTitles.length > 0 && testpapersQuestionsRelations.length > 0) {
      testpapersQuestionsRelations.map(
        testpapersQuestionsRelation => {
          testpapersTitles = testpapersTitles.filter(function (item) {
            return item.id != testpapersQuestionsRelation.testpaper;
          });
        }
      );
    }
    if (knowledgeList.length > 0 && knowledgeQuestionsRelations.length > 0) {
      knowledgeQuestionsRelations.map(
        knowledgeQuestionsRelation => {
          knowledgeList = knowledgeList.filter(function (item) {
            return item.id != knowledgeQuestionsRelation.knowledge;
          });
        }
      );
    }

    return (
      <div>
        <div style={styles.boxRight}>
          <RaisedButton containerElement={<Link to={`/questions/`}/>}
                        label={BACK} primary={true}/>
        </div>
        <div style={styles.box}>
          <Paper style={styles.boxChild}>
            <div style={styles.QuestionDetailTab}>
              <QuestionDetailTab
                questionTypeList={questionTypeList}
                questionsActions={questionsActions}
                question={question}
                questionId={questionId}
                questionType={questionType}
                engQuestionTypeList={engQuestionTypeList}
                subjects={subjects}
              />
            </div>
            <br/>
            <br/>
            <br/>
            <Tabs>

              <Tab label="相关试卷" style={styles.Tab}>
                <div style={styles.box}>
                  <div style={styles.boxChild}>
                    <TestpaperQuestionRelationTab
                      style={styles.boxChild}
                      questionId={questionId}
                      testpapersQuestionsRelations={testpapersQuestionsRelations}
                      questionType={questionType}
                      testpapersTitles={testpapersTitles}
                      deleteTestpaperQuestion={this.deleteTestpaperQuestion}
                    />
                  </div>
                </div>
              </Tab>
              <Tab label="相关知识点" style={styles.Tab}>
                <div style={styles.box}>
                  <div style={styles.boxChild}>
                    <KnowledgeQuestionRelationTab
                      title=""
                      answer=""
                      question={question}
                      knowledgeQuestionsRelations={knowledgeQuestionsRelations}
                      questionType={questionType}
                      knowledgeList={knowledgeList}
                      deleteKnowledgeQuestion={this.deleteKnowledgeQuestion}
                    />
                  </div>
                </div>
              </Tab>
            </Tabs>
          </Paper>
        </div>
      </div>


    );
  }
}

QuestionRelationEditPage.propTypes = {
  questionId: PropTypes.string.isRequired,
  questionType: PropTypes.string,
  subjects: PropTypes.array,
  knowledgeList: PropTypes.array,
  testpapersTitles: PropTypes.array,
  knowledgeQuestionsRelations: PropTypes.array,
  testpapersQuestionsRelations: PropTypes.array,
  question: PropTypes.object,
  questionsActions: PropTypes.object.isRequired,
  subjectsActions: PropTypes.object.isRequired,
  testpapersActions: PropTypes.object.isRequired,
  questionTypeList: PropTypes.object,
  engQuestionTypeList: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const questionType = ownProps.params.questionType;
  const questionId = ownProps.params.questionId;
  const testpapersQuestionsRelations = state.questions.testpapersQuestionsRelations.slice(0);
  const knowledgeQuestionsRelations = state.questions.knowledgeQuestionsRelations.slice(0);
  const knowledgeList = state.knowledgeList.slice(0);
  return {
    questionId,
    questionType,
    testpapersQuestionsRelations,
    knowledgeList,
    knowledgeQuestionsRelations,
    subjects: state.subjects,
    question: state.questions.question,
    questionTypeList: state.questions.questionTypeList,
    testpapersTitles: state.questions.testpapersTitles,
    engQuestionTypeList: state.questions.engQuestionTypeList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    questionsActions: bindActionCreators(questionsActions, dispatch),
    subjectsActions: bindActionCreators(subjectsActions, dispatch),
    testpapersActions: bindActionCreators(testpapersActions, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(QuestionRelationEditPage);
