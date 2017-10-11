import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import DropDownMenu from 'material-ui/DropDownMenu';
import {blue500} from 'material-ui/styles/colors';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import Pagination from '../common/Pagination';
import QuestionPropertyEditDialog from './QuestionPropertyEditDialog';
import QuestionList from './QuestionList';
import * as questionsActions from '../../actions/questionsActions';

const styles = {
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  navBar: {
    backgroundColor: '#FAFAFA'
  },
  title: {
    fontSize: 20,
    margin: '24px',
    fontWeight: 'bold'
  },
  boxChild: {
    maxWidth: 1076,
    width: '80%',
    margin: 24
  },
  IconMenu: {
    margin: "0 40px auto auto"
  }
};

class QuestionListPage extends React.Component {
  state = {
    open: false,
    value: 3,
    questionType: this.props.questionsPreviewType || '01',
    subject: null,
    dialogLabel: null
  };

  componentWillMount () {
    const { loadQuestions, clearQuestion, loadQuestionTypeList }=this.props.questionsActions;
    loadQuestionTypeList().then(
      ()=> {
        const questionTypeYw = this.props.questionTypeList;
        loadQuestions(questionTypeYw[this.state.questionType][0], this.props.current_page_number);
      }
    );
    clearQuestion()
  }

  handleTouchTap = (event) => {
    this.setState({
      open: true,
    });
  };

  loadQuestionsChange = (page) => {

    const questionTypeYw = this.props.questionTypeList;
    const { loadQuestions, changeQuestionsPreviewType }=this.props.questionsActions;
    changeQuestionsPreviewType(this.state.questionType);
    loadQuestions(questionTypeYw[this.state.questionType][0], page);
  };

  handleChange = (event, index, value) => {
    this.setState({ value });
    this.setState({ questionType: value });
    const { loadQuestions }=this.props.questionsActions;
    const questionTypeYw = this.props.questionTypeList;
    loadQuestions(questionTypeYw[value][0]);  //选择要加载的试题类型
  };

  render () {
    const { questions, questionTypeList, current_page_number, count } = this.props;
    return (
      <div>
        <Toolbar style={styles.navBar}>
          <ToolbarGroup firstChild={true}>
            <DropDownMenu value={this.state.questionType} onChange={this.handleChange}>
              {questionTypeList && Object.keys(questionTypeList) && Object.keys(questionTypeList).map(
                key => <MenuItem key={key} value={key} primaryText={questionTypeList[key][1]}/>
              )}
            </DropDownMenu>
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle text="试题展示"/>
            <FontIcon
              className="muidocs-icon-action-home"
              color={blue500}
            />
            <QuestionPropertyEditDialog buttonType="添加试题"/>
          </ToolbarGroup>
        </Toolbar>
        <div style={styles.box}>
          <div style={[styles.boxChild, styles.title]}>
            {questionTypeList &&
            <div style={styles.title}>
              {questionTypeList[this.state.questionType][1]}列表
            </div>
            }
          </div>
          {!questions &&
          <div>
            <CircularProgress />
          </div>
          }
          {questions &&
          <div style={styles.boxChild}>
            <QuestionList questions={questions} questionType={this.state.questionType}/>
            <Pagination onChange={this.loadQuestionsChange} total={count} current={current_page_number}/>
          </div>
          }
        </div>
      </div>
    );
  }
}

QuestionListPage.contextTypes = {
  router: PropTypes.object
};
QuestionListPage.propTypes = {
  questions: PropTypes.array.isRequired,
  questionsActions: PropTypes.object.isRequired,
  previous: PropTypes.object,
  questionsPreviewType: PropTypes.object,
  next: PropTypes.string,
  questionType: PropTypes.object,
  count: PropTypes.number.isRequired,
  current_page_number: PropTypes.number.isRequired,
  questionTypeList: PropTypes.object,

};

function mapStateToProps (state) {
  return {
    questions: state.questions.questions,
    count: state.questions.count,
    current_page_number: state.questions.current_page_number,
    previous: state.questions.previous,
    next: state.questions.next,
    questionTypeList: state.questions.questionTypeList,
    questionsPreviewType: state.questions.questionsPreviewType,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    questionsActions: bindActionCreators(questionsActions, dispatch)
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(QuestionListPage);
