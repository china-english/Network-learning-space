import React from 'react';

import QuestionDeleteDialog from './QuestionDeleteDialog';
import QuestionPropertyEditDialog from './QuestionPropertyEditDialog';
import {getObjectById,createMarkup} from '../../businessLogic/utils';
import EngQuestionDetail from './EngQuestionDetail';
const styles = {
  questionValue: {
    fontSize: 16,
    padding: 3
  },
  questionTitle: {
    fontSize: 19,
    padding: 3,
  },
  box: {
    justifyContent: 'space-between',
    display: 'flex',
    flex: 1,
    width: '100%'
  },
  boxChild: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start'
  },
  questionType_cn: {
    fontSize: 20,
    margin: '8px 24px 0 0',
    color: "#00BCD4",
    fontWeight: 'bold'
  },
  answer: {
    marginLeft: 16
  }
};
class QuestionRelationEditPage extends React.Component {
  questionValues = ()=> {
    const { question, questionType }=this.props;
    if (questionType == "01" || questionType == '04') {
      return (
        <div style={styles.answer}>
          {question.A &&
          <div style={styles.questionValue}>A.{question.A}</div>
          }
          {question.B &&
          <div style={styles.questionValue}>B.{question.B}</div>
          }
          {question.C &&
          <div style={styles.questionValue}>C.{question.C}</div>
          }
          {question.D &&
          <div style={styles.questionValue}>D.{question.D}</div>
          }
          {question.E &&
          <div style={styles.questionValue}>E.{question.E}</div>
          }
        </div>
      );
    }
  };

  questionInformation = ()=> {
    const { question, questionType ,engQuestionTypeList}=this.props;
    if (question.answer && questionType != "02") {

      return (
        <div>
          <div style={styles.questionTitle} dangerouslySetInnerHTML={createMarkup(question.question)}/>
          <br/>
          <div style={styles.questionValue}>试题级别：{question.difficulty_degree}</div>
          <div style={styles.questionValue}>难度等级：{question.difficulty_level}</div>
          <div style={styles.questionValue}>正确答案：<span dangerouslySetInnerHTML={createMarkup(question.answer)}/>
          </div>
        </div>
      );
    }
    if(question.answer && questionType == "02") {
      return (
        <div>
          <div style={styles.questionTitle} dangerouslySetInnerHTML={createMarkup(question.question)}/>
          <br/>
          <div style={styles.questionValue}>试题级别：{question.difficulty_degree}</div>
          <div style={styles.questionValue}>难度等级：{question.difficulty_level}</div>
          {question.answer &&
          <span style={styles.questionValue}>正确答案：</span>
          }
          {question.answer == "A" &&
          <span style={styles.questionValue}>正确</span>
          }
          {question.answer == "B" &&
          <span style={styles.questionValue}>错误</span>
          }
        </div>
      );
    }
  };





  render () {
    const { questionTypeList,engQuestionTypeList, question, questionType, subjects, questionsActions }=this.props;
    return (
      <div >
        {question &&
        <div>
          <br/>
          <br/>
          <div style={styles.box}>
            <div style={styles.boxChild}>
              <div style={styles.questionType_cn}>
                {questionTypeList[this.props.questionType][1]}
              </div>
              <QuestionPropertyEditDialog questionType={questionType}
                                          primaryText="修改"
                                          question={question}
                                          buttonType="FlatButton"/>
              <QuestionDeleteDialog question={question}
                                    questionType={questionType}
                                    questionTypeList={questionTypeList}
                                    questionsActions={questionsActions}
              />
            </div>
          </div>
          <div>
            <br/>
            {this.questionValues()}
            {this.questionInformation()}
            {subjects.length > 0 && question.subject &&
            <div style={styles.questionValue}>所属科目：{getObjectById(subjects, question.subject).name}</div>
            }
            {questionType=='05' &&
            <EngQuestionDetail/>
            }
          </div>
          <br/>
        </div>
        }

      </div>


    );
  }
}

export default QuestionRelationEditPage;
