import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Popover, PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';

import EngBlankForm from './EngBlankForm';
import EngOptionForm from './EngOptionForm';
import EngSelectionForm from './EngSelectionForm';
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
  };

  componentWillMount () {
    const { loadEngQuestionTypeList }=this.props.questionsActions;
    if (!this.props.engQuestionTypeList) {  //涉及到state和componentWillMount问题，不验证题型而加载该数据
      loadEngQuestionTypeList();
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseAndSave = (values) => {
    console.log(values);
    const {parentId}=this.props;
    values.eng_question =parentId;
    console.log(values);
    this.state.submitting = true;
    const engQuestionType = this.props.engQuestionType;
    const { saveEngBlank, saveEngSelection, saveOption }=this.props.questionsActions;
    if (engQuestionType =='B' || engQuestionType =='D') {
      saveEngBlank(values).then(
        () => {
          this.setState({ open: false });
        }
      );
    }
    if (engQuestionType =='C'|| engQuestionType =='A') {
      saveEngSelection(values).then(
        () => {
          this.setState({ open: false });
        }
      );
    }
    // if(engQuestionType==('B' || 'D')){
    //   saveOption(values).then(
    //     () => {
    //       this.setState({ open: false });
    //     }
    //   );
    // }

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

    const { testpaperId, question, primaryText, engQuestionType }=this.props;
    return (
      <span >
        <FlatButton label={primaryText} primary={true} onTouchTap={this.handleOpen}/>
        <Dialog title={primaryText}
                open={this.state.open}
                autoScrollBodyContent={true}
                onRequestClose={this.handleClose}
        >
          {engQuestionType == "A" &&
          <EngSelectionForm handleClose={this.handleClose}
                            onSubmit={this.handleCloseAndSave}
                            open={this.state.open}
                            handleOpen={this.handleOpen}
                            testpaperId={testpaperId}
                            question={question}
                            title={primaryText}
          />
          }
          {engQuestionType == "B" &&
          <EngBlankForm onSubmit={this.handleCloseAndSave}
                        handleClose={this.handleClose}
                        open={this.state.open}
                        handleOpen={this.handleOpen}
                        title={primaryText}
          />
          }
          {engQuestionType == "C" &&
          <EngSelectionForm onSubmit={this.handleCloseAndSave}
                            handleClose={this.handleClose}
                            open={this.state.open}
                            question={question}
                            testpaperId={testpaperId}
                            handleOpen={this.handleOpen}
                            title={primaryText}
          />
          }
          {engQuestionType == "D" &&
          <EngBlankForm onSubmit={this.handleCloseAndSave}
                        handleClose={this.handleClose}
                        open={this.state.open}
                        question={question}
                        handleOpen={this.handleOpen}
                        title={primaryText}
          />
          }
          {engQuestionType == "E" &&
          <EnglishQuestionStemEditForm onSubmit={this.handleCloseAndSave}
                                       handleClose={this.handleClose}
                                       open={this.state.open}
                                       question={question}
                                       testpaperId={testpaperId}
                                       handleOpen={this.handleOpen}
                                       title={primaryText}
          />
          }
          {engQuestionType == "F" &&
          <EngBlankForm onSubmit={this.handleCloseAndSave}
                        handleClose={this.handleClose}
                        open={this.state.open}
                        question={question}
                        testpaperId={testpaperId}
                        handleOpen={this.handleOpen}
                        title={primaryText}
          />
          }
          {engQuestionType == "G" &&
          <EngBlankForm onSubmit={this.handleCloseAndSave}
                        handleClose={this.handleClose}
                        open={this.state.open}
                        question={question}
                        testpaperId={testpaperId}
                        handleOpen={this.handleOpen}
                        title={primaryText}
          />
          }
          {engQuestionType == "H" &&
          <EngBlankForm onSubmit={this.handleCloseAndSave}
                        handleClose={this.handleClose}
                        open={this.state.open}
                        question={question}
                        testpaperId={testpaperId}
                        handleOpen={this.handleOpen}
                        title={primaryText}
          />
          }
          {engQuestionType == "I" &&
          <EngBlankForm onSubmit={this.handleCloseAndSave}
                        handleClose={this.handleClose}
                        open={this.state.open}
                        question={question}
                        testpaperId={testpaperId}
                        handleOpen={this.handleOpen}
                        title={primaryText}
          />
          }
          {engQuestionType == "J" &&
          <EngBlankForm onSubmit={this.handleCloseAndSave}
                        handleClose={this.handleClose}
                        open={this.state.open}
                        question={question}
                        testpaperId={testpaperId}
                        handleOpen={this.handleOpen}
                        title={primaryText}
          />
          }
          {engQuestionType == "K" &&
          <EngOptionForm onSubmit={this.handleCloseAndSave}
                         handleClose={this.handleClose}
                         open={this.state.open}
                         question={question}
                         testpaperId={testpaperId}
                         handleOpen={this.handleOpen}
                         title={primaryText}
          />
          }
        </Dialog>

      </span>
    );
  }
}

QuestionPropertyEditDialog.propTypes = {
  subjects: PropTypes.array,
  question: PropTypes.object,
  questionTypeList: PropTypes.object,
  questionsActions: PropTypes.object.isRequired,
  subjectsActions: PropTypes.object.isRequired,
  engQuestionTypeList: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    question: ownProps.question,
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
