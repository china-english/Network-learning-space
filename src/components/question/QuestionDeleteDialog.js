import React, {PropTypes} from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import {DELETE, DELETE_CONFIRM, CANCEL} from '../../constants/strings';

class QuestionDeleteDialog extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // 删除本道试题及相关联的knowledge-question、testpapers-question
  handleDelete = () => {
    const questionTypeYw = this.props.questionTypeList;
    this.setState({ deleting: true });
    const { deleteQuestion }=this.props.questionsActions;
    deleteQuestion(this.props.question, questionTypeYw[this.props.questionType][0]);
  };

  render () {
    const actions = [
      <FlatButton label={CANCEL}
                  primary={true}
                  onTouchTap={this.handleClose}
      />,
      <FlatButton label={DELETE_CONFIRM}
                  secondary={true}
                  onTouchTap={this.handleDelete}
      />
    ];
    return (
      <span >
        <FlatButton label={DELETE} secondary={true} onTouchTap={this.handleOpen}/>
        <Dialog title={DELETE}
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
        >
          确定要删除这个试题吗？删除后将无法恢复
        </Dialog>
      </span>
    );
  }
}

QuestionDeleteDialog.propTypes = {
  questionsActions: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
  questionType: PropTypes.string.isRequired,
};


export default QuestionDeleteDialog;
