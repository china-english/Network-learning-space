import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import BlockFormDialog from './BlockFormDialog';
import {ADD, BLOCK} from '../../constants/strings';
import TestpaperStructureContentListRow from './TestpaperStructureContentListRow';
import testpaperHelper from '../../businessLogic/testpaperHelper';

import * as testpapersActions from '../../actions/testpapersActions';

const styles = {
  RaisedButton: {
    marginLeft: 40
  },
  title: {
    fontSize: '24px',
    color: '#000000',
    marginLeft: 48,
    marginBottom: 8
  },
  overlayStyle: {
    backgroundColor: 'rgba(0,0,0,0)'
  }
};

class BlockTab extends React.Component {
  state = {
    openBlock: false,
    dialogBlockLabel: '',
    new_block: null,
    open: false
  };

  // 修改block
  handleClickBlock = (block) => {
    this.setState({
      new_block: block,
      openBlock: true,
      dialogBlockLabel: "修改试卷区块"
    });
  };

  // 添加block、打开dialog
  handleOpenBlock = () => {
    this.setState({
      new_block: null,
      openBlock: true,
      dialogBlockLabel: "创建试卷区块"
    });
  };

  // 关闭dialog
  handleCloseBlock = () => {
    this.setState({ openBlock: false });
  };

  // 删除block
  handleDeleteBlock = (block) => {
    const { deleteBlock } = this.props.testpapersActions;
    deleteBlock(block);
    this.handleCloseBlock();
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmitBlock = (new_block) => {
    //新增、更新
    new_block.testpaper = this.props.testpaperId;
    const { createBlock, updateBlock, loadBlocks } = this.props.testpapersActions;
    if (testpaperHelper.partValidation(new_block, this.props.blocks)) {
      if (new_block.id) {
        updateBlock(new_block).then(() =>
          //修改新增加的block时会产生异步错误
          loadBlocks(this.props.testpaperId));
      }
      else {
        createBlock(new_block).then(() =>
          loadBlocks(this.props.testpaperId));
      }
      return this.handleCloseBlock();
    }
    else {
      // fail block validation
      this.setState({ open: true });
    }
  };

  render () {
    const { blocks } = this.props;
    return (
      <div>
        <div style={styles.title}>{BLOCK}
          <FlatButton style={styles.RaisedButton}
                      label={ADD}
                      primary={true}
                      onTouchTap={this.handleOpenBlock}
          />
        </div>
        <Dialog title={this.state.dialogBlockLabel}
                modal={false}
                open={this.state.openBlock}
                overlayStyle={styles.overlayStyle}
                onRequestClose={this.handleCloseBlock}
                autoScrollBodyContent={true}
        >
          <BlockFormDialog block={this.state.new_block}
                           onSubmit={this.handleSubmitBlock}
                           handleCloseBlock={this.handleCloseBlock}
                           open={this.state.openBlock}
                           openErrorNote={this.state.open}
                           handleCloseErrorNote={this.handleClose}
                           dialogBlockLabel={this.state.dialogBlockLabel}
          />
        </Dialog>
        {blocks.length !== 0 &&
        <TestpaperStructureContentListRow handleClick={this.handleClickBlock}
                                          handleDelete={this.handleDeleteBlock}
                                          contents={blocks}
                                          name="区块"
                                          content_name="名称"
                                          title_name="大题"/>
        }
      </div>
    );
  }
}

BlockTab.propTypes = {
  testpapersActions: PropTypes.object.isRequired,
  blocks: PropTypes.array.isRequired,
  testpaperId: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {

  return {
    blocks: ownProps.blocks,
    testpaperId: ownProps.testpaperId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    testpapersActions: bindActionCreators(testpapersActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockTab);
