import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import EngQuestionPropertyEditDialog from './EngQuestionPropertyEditDialog';
import {createMarkup, getObjectById} from '../../businessLogic/utils';
import {DELETE, DELETE_CONFIRM, CANCEL} from '../../constants/strings';
import DeletePrompt from '../../businessLogic/DeletePrompt';
import * as questionsActions from '../../actions/questionsActions';


const styles = {
  questionValue: {
    fontSize: 16,
    padding: 3,
    flex: 1
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
    marginLeft: 24
  }
};


export class EngQuestionDetail extends React.Component {
  componentWillMount () {
    const { loadEngBlanks, loadSelection, engQuestionTypeList }=this.props.questionsActions;
    if (this.props.question.category == 'B') {
      loadEngBlanks(this.props.question.id);
    }
  }

  handleDelete = (engItemId)=> {
    alert(engItemId);
    // const {handleDelete}=this.props.questionsActions;
    // handleDelete(engItemId);
  };

  Advance = ()=> {
    const { question, subjects, engQuestionTypeList }=this.props;
    return (
      <div style={styles.box}>
        <div style={styles.questionValue}>试题级别：{question.difficulty_degree}</div>
        <div style={styles.questionValue}>难度等级：{question.difficulty_level}</div>
        <div style={styles.questionValue}>题型：{engQuestionTypeList &&
        <span>{engQuestionTypeList[question.category]}</span>}</div>
        <div style={styles.questionValue}>所属科目：
          {subjects.length > 0 && question.subject &&
          <span>{getObjectById(subjects, question.subject).name}</span>
          }
        </div>
      </div>
    )
  };

  Answer = ()=> {
    const { question, subjects, engQuestionTypeList }=this.props;
    return (
      <div style={styles.answer}>
        {question.blanks.length > 0 &&
        question.blanks.map(
          engBlank=>
            <div>
              <div style={styles.questionValue}>
                {engBlank.number} 、 {engBlank.question} （{engBlank.point}）
                <EngQuestionPropertyEditDialog question={engBlank} parentId={question.id} primaryText='修改'
                                               engQuestionType={question.category}/>
                <DeletePrompt handleDelete={this.handleDelete} content={engBlank} name='小题'/>
              </div>
              <div>
                参考答案：{engBlank.answer}
              </div>
              <div>
                试题分析：{engBlank.analysis}
              </div>
              <br/>
            </div>
        )
        }
        {question.selections.length > 0 &&
        question.selections.sort((x, y)=> {
          return x.number > y.number ? 1 : -1;
        }).map(
          engSelection=>
            <div>
              <div style={styles.questionValue}>
                {engSelection.number} 、 {engSelection.question} （{engSelection.point}）
                <EngQuestionPropertyEditDialog question={engSelection} parentId={question.id} primaryText='修改'
                                               engQuestionType={question.category}/>
                <DeletePrompt handleDelete={this.handleDelete} content={engSelection} name='小题'/>
              </div>
              <div style={styles.answer}>
                {engSelection.A &&
                <div>A. {engSelection.A}</div>
                }
                {engSelection.B &&
                <div>B. {engSelection.B}</div>
                }
                {engSelection.C &&
                <div>C. {engSelection.C}</div>
                }
                {engSelection.D &&
                <div>D. {engSelection.D}</div>
                }
                {engSelection.E &&
                <div>E. {engSelection.E}</div>
                }
              </div>
              <div>
                参考答案：{engSelection.answer}
              </div>
              <div>
                试题分析：{engSelection.analysis}
              </div>
              <br/>
            </div>
        )}
      </div>
    );
  };

  EngQuestionItem = ()=> {
    const { question, subjects, engQuestionTypeList }=this.props;
    return (
      <div>
        <div style={styles.questionValue}>
          <i>Directions：{question.requirement}</i>
        </div>
        <br/>
        <div dangerouslySetInnerHTML={createMarkup(question.question)}/>
      </div>
    )
  };

  render () {
    const { question, subjects, engQuestionTypeList }=this.props;
    const engQuestionSum = question.blanks.length + question.selections.length + question.options.length;
    return (
      <div>
        {this.EngQuestionItem()}
        <br/>
        {this.Advance()}
        <div style={styles.questionValue}>小题数量：{engQuestionSum}
          <EngQuestionPropertyEditDialog parentId={question.id} primaryText='添加' engQuestionType={question.category}/>
        </div>
        <br/>
        {this.Answer()}
      </div>
    );
  }
}

EngQuestionDetail.propTypes = {
  subjects: PropTypes.array,
  question: PropTypes.object,
  questionsActions: PropTypes.object.isRequired,
  engQuestionTypeList: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  return {
    question: state.questions.question,
    subjects: state.subjects,
    engQuestionTypeList: state.questions.engQuestionTypeList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    questionsActions: bindActionCreators(questionsActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EngQuestionDetail);
