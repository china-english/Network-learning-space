import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import TestpapersDialogForm from './TestpapersDialogForm';
import * as questionsActions from '../../actions/questionsActions';
import * as testpapersActions from '../../actions/testpapersActions';

class TestpaperDialog extends React.Component {
  state = {
    open: false,
    page: 1,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };


  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseAndSave = (value) => {
    const { createTestpapersQuestion }=this.props.questionsActions;
    value.question_type = this.props.questionType;
    createTestpapersQuestion(this.props.questionId, value).then(
      () => {
        this.setState({ open: false });
      }
    );
  };

  render () {
    const { testpapersTitles, questionId } = this.props;
    return (
      <div>
        <FlatButton primary={true} label="添加" onTouchTap={this.handleOpen}/>
        <Dialog
          title="添加所属试卷"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <TestpapersDialogForm
            handleClose={this.handleClose}
            onSubmit={this.handleCloseAndSave}
            testpapersTitles={testpapersTitles}
            page={this.state.page}
            open={this.state.open}
            handleOpen={this.handleOpen}
            questionId={questionId}
          />
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    questionsActions: bindActionCreators(questionsActions, dispatch),
    testpapersActions: bindActionCreators(testpapersActions, dispatch)

  }
};

export default connect(null, mapDispatchToProps)(TestpaperDialog);
