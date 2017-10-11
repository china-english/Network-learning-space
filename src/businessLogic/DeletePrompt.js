import React, {PropTypes} from 'react';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import {CANCEL, DELETE_CONFIRM, DELETE} from "../constants/strings";

class DeletePrompt extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = () => {
    if (this.props.content) {
      this.props.handleDelete(this.props.content);
    }
    else {
      this.props.handleDelete();
    }
    this.setState({ open: false });
  };

  render () {
    const actions = [
      <FlatButton key="1"
                  label={CANCEL}
                  primary={true}
                  onTouchTap={this.handleClose}
      />,
      <FlatButton key="2"
                  label={DELETE_CONFIRM}
                  secondary={true}
                  onTouchTap={this.handleDelete}
      />
    ];
    return (
      <span>
        {this.props.id &&
        <RaisedButton label={DELETE}
                      secondary={true}
                      onTouchTap={this.handleOpen}
        />
        }
        {!this.props.id &&
        <FlatButton label={DELETE}
                    secondary={true}
                    onTouchTap={this.handleOpen}
        />
        }
        <Dialog
          title={DELETE}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          确定要删除这个{this.props.name}吗？（删除后将无法恢复{this.props.prompt}）
        </Dialog>
      </span>
    );
  }
}

DeletePrompt.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  name: PropTypes.string
};

export default DeletePrompt;
