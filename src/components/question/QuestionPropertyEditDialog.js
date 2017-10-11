import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Popover, PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';

import JudgmentForm from './JudgmentForm';
import SelectionForm from './SelectionForm';
import BlankForm from './BlankForm';
import MultiselectionForm from './MultiselectionForm';
import EnglishQuestionStemEditForm from './EnglishQuestionStemEditForm';
import * as questionsActions from '../../actions/questionsActions';
import * as subjectsActions from '../../actions/subjectsActions';

const styles = {
  RaisedButton: {
    marginTop: 8
  }
};

export class QuestionPropertyEditDialog extends React.Component {
  state = {
    submitting: false,
    open: false,
    menuOpen: false,
    primaryText: null,
    questionType: null,
  };

  componentWillMount () {
    const {loadEngQuestionTypeList}=this.props.questionsActions;
    if (this.props.subjects.length <= 0) {
      const { loadSubjects,  } =this.props.subjectsActions;
      loadSubjects();
    }
    if (!this.props.engQuestionTypeList ) {  //涉及到state和componentWillMount问题，不验证题型而加载该数据
      loadEngQuestionTypeList();
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleCreate = (questionType, primaryText)=> {
    this.setState({
      menuOpen: false,
      open: true,
      questionType: questionType,
      primaryText: primaryText
    });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  menuClick = (index)=> {
    this.setState({ questionType: index });
  };

  handleCloseAndSave = (values) => {
    if (this.props.testpaperId) {
      values.testpaper = this.props.testpaperId;
    }
    const questionType = this.props.questionType || this.state.questionType;
    values.question_type = questionType;
    this.state.submitting = true;
    const questionTypeYw = this.props.questionTypeList;
    const { saveQuestion }=this.props.questionsActions;
    saveQuestion(values, questionTypeYw[questionType][0]).then(
      () => {
        this.setState({ open: false });
      }
    );
  };

  handleMenuOpen = (event)=> {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      menuOpen: true,
      anchorEl: event.currentTarget,
    });
  };
  handleRequestClose = () => {
    this.setState({
      menuOpen: false,
    });
  };

  render () {

    const { buttonType, testpaperId, questionTypeList, question }=this.props;
    const questionType = this.props.questionType || this.state.questionType;
    const primaryText = this.props.primaryText || this.state.primaryText;
    return (
      <div >
        {buttonType == 'FlatButton' ?
          <FlatButton label={primaryText} primary={true} onTouchTap={this.handleOpen}/> :
          <div>
            <RaisedButton
              style={styles.RaisedButton}
              onTouchTap={this.handleMenuOpen}
              label="添加试题"
            />
            <Popover
              open={this.state.menuOpen}
              useLayerForClickAway={false}
              anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
              targetOrigin={{ horizontal: "left", vertical: "top" }}
              onRequestClose={this.handleRequestClose}
              anchorEl={this.state.anchorEl}
              animation={PopoverAnimationVertical}


            >
              <Menu>
                {questionTypeList && Object.keys(questionTypeList) && Object.keys(questionTypeList).map(
                  key =>
                    <MenuItem key={key}
                              questionType={key}
                              primaryText={"添加" + questionTypeList[key][1]}
                              onTouchTap={()=>this.handleCreate(key, "添加" + questionTypeList[key][1])}/>
                )}
              </Menu>
            </Popover>
          </div>
        }
        <Dialog title={primaryText}
                open={this.state.open}
                autoScrollBodyContent={true}
                onRequestClose={this.handleClose}
        >
          {questionType == "01" &&
          <SelectionForm handleClose={this.handleClose}
                         onSubmit={this.handleCloseAndSave}
                         open={this.state.open}
                         handleOpen={this.handleOpen}
                         testpaperId={testpaperId}
                         question={question}
                         title={primaryText}
          />
          }
          {questionType == "02" &&
          <JudgmentForm onSubmit={this.handleCloseAndSave}
                        handleClose={this.handleClose}
                        open={this.state.open}
                        question={question}
                        testpaperId={testpaperId}
                        handleOpen={this.handleOpen}
                        title={primaryText}
          />
          }
          {questionType == "03" &&
          <BlankForm onSubmit={this.handleCloseAndSave}
                     handleClose={this.handleClose}
                     open={this.state.open}
                     question={question}
                     testpaperId={testpaperId}
                     handleOpen={this.handleOpen}
                     title={primaryText}
          />
          }
          {questionType == "04" &&
          <MultiselectionForm onSubmit={this.handleCloseAndSave}
                              handleClose={this.handleClose}
                              open={this.state.open}
                              question={question}
                              testpaperId={testpaperId}
                              handleOpen={this.handleOpen}
                              title={primaryText}
          />
          }
          {questionType == "05" &&
          <EnglishQuestionStemEditForm onSubmit={this.handleCloseAndSave}
                                       handleClose={this.handleClose}
                                       open={this.state.open}
                                       question={question}
                                       testpaperId={testpaperId}
                                       handleOpen={this.handleOpen}
                                       title={primaryText}
          />
          }
        </Dialog>

      </div>
    );
  }
}

QuestionPropertyEditDialog.propTypes = {
  subjects: PropTypes.array,
  questionType: PropTypes.string,
  questionTypeList: PropTypes.object,
  questionsActions: PropTypes.object.isRequired,
  subjectsActions: PropTypes.object.isRequired,
  engQuestionTypeList: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    subjects: state.subjects,
    questionTypeList: state.questions.questionTypeList,
    engQuestionTypeList: state.questions.engQuestionTypeList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    questionsActions: bindActionCreators(questionsActions, dispatch),
    subjectsActions: bindActionCreators(subjectsActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPropertyEditDialog);
