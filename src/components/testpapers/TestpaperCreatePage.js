
import React, {PropTypes}from 'react';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import * as testpapersActions from '../../actions/testpapersActions';
import * as subjectsActions from '../../actions/subjectsActions';
import * as semestersActions from '../../actions/semestersActions';

import TestpaperForm from './TestpaperForm';
import {BACK} from '../../constants/strings';

const styles = {
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginTop: 24
  },
  Paper: {
    width: 1044,
    height: 1050,
    padding: 30,
    margin: 24
  },
  all: {
    justifyContent: 'center',
    display: 'flex',
    width: '100%'
  },
  RaisedButton: {
    marginRight: 24,
    justifyContent: 'flex-end',
    display: 'flex',
    flex: 1,
  },
};

class TestpaperCreatePage extends React.Component {
  state = {
    submitting: false,
  };

  componentWillMount = () => {
    const { loadKslb, loadSjbs, loadTestpaper }=this.props.testpapersActions;
    const { loadSubjects }=this.props.subjectsActions;
    const { loadSemesters }=this.props.semestersActions;
    loadSubjects();
    loadSemesters();
    loadKslb();
    loadSjbs();
    loadTestpaper(this.props.testpaperId);
  };

  handleSubmit = (values) => {
    const { updateTestpaper, createTestpaper }=this.props.testpapersActions;
    if (values.id == null) {
      createTestpaper(values).then(()=> {
        browserHistory.push('/testpapers/' + this.props.testpaper.id + '/edit')
      });
    }
    else {
      updateTestpaper(values).then(()=> {
        browserHistory.push('/testpapers/' + this.props.testpaper.id + '/edit')
      });
    }
  };

  handleCancel = () => {
    if (this.props.testpaperId) {
      browserHistory.push('/testpapers/' + this.props.testpaperId + '/edit');
    }
    else {
      browserHistory.push('/testpapers');
    }
  };

  handleDelete = () => {
    const { deleteTestpaper }=this.props.testpapersActions;
    deleteTestpaper(this.props.testpaper);
    browserHistory.push('/testpapers');
  };

  render () {
    const { subjects, semesters, testpaper, test_type, pages_layout, testpaperId }=this.props;
    return (
      <div>
        {testpaperId &&
        <div style={styles.title}>修改试卷</div>
        }
        {!testpaperId &&
        <div style={styles.title}>创建试卷</div>
        }

        <hr/>
        <div style={styles.RaisedButton}>
          <RaisedButton secondary={true} onTouchTap={this.handleCancel} label={BACK}/>
        </div>
        <br/>
        <div style={styles.all}>
          <Paper style={styles.Paper} zDepth={2}>
            {((testpaperId && testpaper.id) || (testpaperId == null)) &&
            <TestpaperForm subjects={subjects}
                           semesters={semesters}
                           onSubmit={this.handleSubmit}
                           test_type={test_type}
                           pages_layout={pages_layout}
                           testpaperId={testpaperId}
                           submitting={this.state.submitting}
                           handleDelete={this.handleDelete}/>
            }
          </Paper>
        </div>
        <br/>
        <br/>
      </div>
    );
  }
}

TestpaperCreatePage.propTypes = {
  semestersActions: PropTypes.object.isRequired,
  subjectsActions: PropTypes.object.isRequired,
  testpapersActions: PropTypes.object.isRequired,
  subjects: PropTypes.array.isRequired,
  semesters: PropTypes.array.isRequired,
  test_type: PropTypes.object.isRequired,
  testpaper: PropTypes.object.isRequired,
  testpaperId: PropTypes.string,
  pages_layout: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const testpaperId = ownProps.params.id;
  return {
    testpaperId,
    subjects: state.subjects,
    semesters: state.semesters,
    test_type: state.testpapers.test_type,
    pages_layout: state.testpapers.pages_layout,
    testpaper: state.testpapers.testpaper
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    semestersActions: bindActionCreators(semestersActions, dispatch),
    subjectsActions: bindActionCreators(subjectsActions, dispatch),
    testpapersActions: bindActionCreators(testpapersActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestpaperCreatePage);
