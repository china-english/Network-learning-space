import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import * as testpapersActions from '../../actions/testpapersActions';

import SectionFormDialog from './SectionFormDialog';
import TestpaperStructureContentListRow from './TestpaperStructureContentListRow';
import testpaperHelper from '../../businessLogic/testpaperHelper';
import {ADD, SECTION} from "../../constants/strings";

const styles = {
  RaisedButton: {
    marginLeft: 40,
  },
  sectionTitle: {
    fontSize: '24px',
    color: '#000000',
    marginLeft: 48,
    marginBottom: 8
  },
  overlayStyle: {
    backgroundColor: 'rgba(0,0,0,0)'
  }
};

class SectionDialog extends React.Component {
  state = {
    openSection: false,
    dialogSectionLabel: '',
    section: null,
    open: false
  };

  // 修改section
  handleClickSection = (section) => {
    this.setState({
      section: section,
      openSection: true,
      dialogSectionLabel: '修改试卷大题'
    });
  };

  // 添加section打开dialog
  handleOpenSection = () => {
    this.setState({
      section: null,
      openSection: true,
      dialogSectionLabel: '添加试卷大题'
    });
  };

  // 关闭dialog
  handleCloseSection = () => {
    this.setState({
      openSection: false,
      section: null
    });
  };

  // 删除section
  handleDeleteSection = (section) => {
    const { deleteSection } = this.props.testpapersActions;
    deleteSection(section);
    return this.handleCloseSection();
  };

  handleSubmitSection = (new_section) => {
    //新增、更新
    new_section.testpaper = this.props.testpaperId;
    const { createSection, updateSection, loadSections } = this.props.testpapersActions;
    if (testpaperHelper.partValidation(new_section, this.props.sections)) {
      if (new_section.id) {
        updateSection(new_section).then(()=>
          //修改新增加的section时会产生异步错误
          loadSections(this.props.testpaperId));
      }
      else {
        createSection(new_section).then(()=>
          loadSections(this.props.testpaperId));
      }
      return this.handleCloseSection();
    }
    else {
      // fail section validation
      this.setState({ open: true });
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render () {
    const { sections } = this.props;
    return (
      <div>
        <div style={styles.sectionTitle}>{SECTION}
          <FlatButton style={styles.RaisedButton} label={ADD} primary={true} onTouchTap={this.handleOpenSection}/>
        </div>
        <Dialog
          title={this.state.dialogSectionLabel}
          modal={false}
          overlayStyle={styles.overlayStyle}
          open={this.state.openSection}
          autoScrollBodyContent={true}
        >
          <SectionFormDialog section={this.state.section}
                             onSubmit={this.handleSubmitSection}
                             handleCloseSection={this.handleCloseSection}
                             open={this.state.openSection}
                             openErrorNote={this.state.open}
                             handleCloseErrorNote={this.handleClose}
                             dialogSectionLabel={this.state.dialogSectionLabel}
          />
        </Dialog>
        {sections.length !== 0 &&
        <TestpaperStructureContentListRow handleClick={this.handleClickSection}
                                          handleDelete={this.handleDeleteSection}
                                          contents={sections}
                                          name="部分"
                                          content_name="要求"
                                          title_name="小题"
        />
        }
      </div>
    );
  }
}

SectionDialog.propTypes = {
  testpapersActions: PropTypes.object.isRequired,
  sections: PropTypes.array,
  testpaperId: PropTypes.string.isRequired
};


const mapStateToProps = (state, ownProps) => {

  return {
    sections: ownProps.sections,
    testpaperId: ownProps.testpaperId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    testpapersActions: bindActionCreators(testpapersActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SectionDialog);
