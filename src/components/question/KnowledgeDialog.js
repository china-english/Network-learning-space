import 'rc-tree/assets/index.css';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Tree, {TreeNode} from 'rc-tree';

import {CONFIRM, CANCEL} from '../../constants/strings';
import * as questionsActions from '../../actions/questionsActions';
import * as subjectsActions from '../../actions/subjectsActions';

class KnowledgeDialog extends React.Component {
  state = {
    open: false,
    expandedKeys: [], //默认展开的项目
    autoExpandParent: true,
    checkedKeys: [], //默认点击的key
    checkStrictlyKeys: { checked: [], halfChecked: [] }
  };

  componentWillMount () {
    const { loadSubjectKnowledge }=this.props.subjectsActions;
    loadSubjectKnowledge(this.props.question.subject);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = ()=> {
    this.setState({ open: false });
  };

  handleCloseAndSave = ()=> {
    const checkedKeys = this.state.checkedKeys;
    const { createKnowledgeQuestion }=this.props.questionsActions;
    createKnowledgeQuestion(this.props.question, this.props.questionType, checkedKeys);
    this.setState({ open: false });
  };

  onExpand = (expandedKeys)=> {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    this.setState({
      expandedKeys: expandedKeys,
      autoExpandParent: false,
    });
  };

  onCheck = (checkedKeys) => {
    this.setState({
      checkedKeys: checkedKeys
    });
  };

  render () {
    const { knowledgeList } = this.props;
    let newTree = []; // 创建一个knowledge tree
    const tree = (knowledgeListA)=> { // dfs遍历出节点的叶子节点（参数为某一个节点）
      let child = [];  // 创建某一层叶子节点，值为叶子节点及其兄弟节点
      let a = 0;  // 创建监听判断节点是否有叶子节点
      for (let i = 0; i < knowledgeList.length; i++) { //为某一个节点遍历是否有他的子孙

        if (knowledgeList[i].parent == knowledgeListA.id) {
          a = 1;
          child.push({ title: knowledgeList[i].name, key: knowledgeList[i].id });  //为该节点添加叶子节点
          child[child.length - 1].children = tree(knowledgeList[i]);    // dfs遍历
        }
      }
      if (a == 0) {
        return null;  //如果无叶子节点，返回上一级
      }
      return child;
    };

    const parentTree = ()=> {
      for (let i = 0; i < knowledgeList.length; i++) {
        let key = true;
        for (let k = 0; k < knowledgeList.length; k++) {        // 如果一个元素父节点已经被选中，则该元素视为祖先节点
          if (knowledgeList[i].parent == knowledgeList[k].id) {
            key = false;
          }
        }
        if (knowledgeList[i].parent == null || key == true) {    // 遍历出根节点
          newTree.push({ title: knowledgeList[i].name, key: knowledgeList[i].id }); // 将根节点添加到knowledge tree中
          newTree[newTree.length - 1].children = tree(knowledgeList[i]);  //为祖先节点添加叶子节点
        }
      }
    };

    parentTree(knowledgeList);
    const actions = [
      <FlatButton
        label={CANCEL}
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={CONFIRM}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleCloseAndSave}
      />
    ];

    const loop = knowledgeList => {
      return knowledgeList.map((item) => {
        if (item.children) {
          return (
            <TreeNode
              key={item.key} title={item.title}
            >
              {loop(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode key={item.key} title={item.title}/>;
      });
    };

    return (
      <div>
        {knowledgeList &&
        <div>
          <FlatButton primary={true} label="添加" onTouchTap={this.handleOpen}/>
          <Dialog title="添加所属知识点"
                  modal={false}
                  open={this.state.open}
                  actions={actions}
                  onRequestClose={this.handleClose}
                  autoScrollBodyContent={true}
          >
            <Tree checkable multiple={this.props.multiple} defaultExpandAll
                  checkStrictly
                  onExpand={this.onExpand} expandedKeys={this.state.expandedKeys}
                  autoExpandParent={this.state.autoExpandParent}
                  onCheck={this.onCheck} checkedKeys={this.state.checkedKeys}
            >
              {loop(newTree)}
            </Tree>
          </Dialog>
        </div>
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    questionsActions: bindActionCreators(questionsActions, dispatch),
    subjectsActions: bindActionCreators(subjectsActions, dispatch)
  }
};
export default connect(null, mapDispatchToProps)(KnowledgeDialog);
