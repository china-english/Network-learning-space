import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'

import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

import * as testpapersActions from '../../actions/testpapersActions'
import * as subjectsActions from '../../actions/subjectsActions'
import * as semestersActions from '../../actions/semestersActions'

import TestpapersTable from './TestpapersTable'
import Pagination from '../common/Pagination'
import TestpaperDropDownMenu from './TestpaperDropDownMenu'

const styles = {
  pageTitleText: {
    fontSize: 24,
    marginTop: 16,
    marginBottom: 16,
    textAlign: 'center'
  },
  interactive: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 24,
    marginLeft: '17%',
    fontSize: '16px',
  },
  subtitle: {
    width: 404
  },
  paper: {
    marginTop: 24,
    marginRight: '10%',
    marginLeft: '10%',
  },
  raisedButton: {
    marginTop: 24,
    marginRight: 24,
    justifyContent: 'flex-end',
    display: 'flex',
  },
  hr: {
    opacity: 0.12
  }
}

class TestpapersListPage extends React.Component {
  state = {
    selectedSubject: '',
    selectedSemester: '',
    testpaper: null
  }

  componentWillMount = () => {
    const {loadSubjects} = this.props.subjectsActions
    const {loadSemesters} = this.props.semestersActions
    const {loadTestpapers, loadKslb, loadSjbs} = this.props.testpapersActions
    loadSubjects()
    loadKslb()
    loadSjbs()
    loadSemesters().then(() => {
      if (this.props.semester || this.props.subject) {
        loadTestpapers(this.props.subject, this.props.semester, this.props.current_page_number)
      } else {
        loadTestpapers(this.state.selectedSubject, this.props.semesters[1].id, 1)
        this.setState({selectedSemester: this.props.semesters[1].id})
      }
    })
  }

  handleChangeSubject = (event, index, value) => {
    const {loadTestpapers, markSubject} = this.props.testpapersActions
    markSubject(value)
    loadTestpapers(value, this.state.selectedSemester, null).then(() => {
      this.setState({selectedSubject: value})
    })
  }

  handleChangeSemester = (event, index, value) => {
    const {markSemester, loadTestpapers} = this.props.testpapersActions
    markSemester(value)
    loadTestpapers(this.state.selectedSubject, value, null).then(() => {
      this.setState({selectedSemester: value})
    })
  }

  handleChangePage = (page) => {
    const {loadTestpapers} = this.props.testpapersActions
    loadTestpapers(this.state.selectedSubject, this.state.selectedSemester, page)
  }

  handleDelete = (testpaper) => {
    const {deleteTestpaper} = this.props.testpapersActions
    deleteTestpaper(testpaper)
  }

  onTouchTap = () => {
    browserHistory.push('/testpapers/create')
  }

  render () {
    const {subjects, semesters, testpapers, count} = this.props
    return (
      <div>
        <div style={styles.raisedButton}>
          <RaisedButton backgroundColor="#00b0ff"
                        label="添加试卷"
                        labelColor="#ffffff"
                        onTouchTap={this.onTouchTap}
          />
        </div>
        <div style={styles.pageTitleText}>试卷列表</div>
        <hr style={styles.hr} />
        <div style={styles.interactive}>
          <div style={styles.subtitle}>
            {semesters[1] &&
             <TestpaperDropDownMenu elements={semesters}
                                    handleChangeElement={this.handleChangeSemester}
                                    defaultSelected={this.props.semester ? this.props.semester : semesters[1].id} />
            }
            <br />
          </div>
          <div style={styles.subtitle}>
            {subjects[1] &&
             <TestpaperDropDownMenu elements={subjects}
                                    handleChangeElement={this.handleChangeSubject}
                                    defaultSelected={this.props.subject ? this.props.subject : subjects[0].id} />
            }
          </div>
        </div>
        <div>
          <Paper style={styles.paper} zDepth={2}>
            <TestpapersTable testpapers={testpapers}
                             handleDelete={this.handleDelete} />
            <Pagination onChange={this.handleChangePage}
                        total={count}
                        current={this.props.current_page_number} />
          </Paper>
          <br />
        </div>
      </div>
    )
  }
}

TestpapersListPage.propTypes = {
  semestersActions: PropTypes.object.isRequired,
  subjectsActions: PropTypes.object.isRequired,
  testpapersActions: PropTypes.object.isRequired,
  subjects: PropTypes.array.isRequired,
  semesters: PropTypes.array.isRequired,
  testpapers: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  current_page_number: PropTypes.number,
  testpaperId: PropTypes.string
}

function mapStateToProps (state) {
  const subjects = state.subjects.slice(0, state.subjects.length)
  subjects.unshift({'id': 'allSubjects', 'name': '全部科目'})

  const semesters = state.semesters.slice(0, state.semesters.length)
  semesters.unshift({'id': 'allSemesters', 'name': '全部学期'})
  return {
    semesters,
    subjects,
    semester: state.testpapers.semester,
    subject: state.testpapers.subject,
    testpapers: state.testpapers.testpapers,
    count: state.testpapers.count,
    test_type: state.testpapers.test_type,
    pages_layout: state.testpapers.pages_layout,
    current_page_number: state.testpapers.current_page_number
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    semestersActions: bindActionCreators(semestersActions, dispatch),
    subjectsActions: bindActionCreators(subjectsActions, dispatch),
    testpapersActions: bindActionCreators(testpapersActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestpapersListPage)
