import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory, Link } from 'react-router'

import RaisedButton from 'material-ui/RaisedButton'
import { Tabs, Tab } from 'material-ui/Tabs'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'

import * as testpapersActions from '../../actions/testpapersActions'
import * as semestersActions from '../../actions/semestersActions'

import BlockTab from './BlockTab'
import SectionTab from './SectionTab'
import DeletePrompt from '../../businessLogic/DeletePrompt'
import { MODIFY, BLOCK, SECTION, PREVIEW, TEST_PAPER, PROMPT } from '../../constants/strings'

const styles = {
  Paper: {
    marginTop: 24,
    marginLeft: '4%',
    marginRight: '4%'
  },
  title: {
    fontSize: 24,
    minWidth: 200,
    marginTop: 24,
    marginLeft: '10%',
    textAlign: 'left',
    wordWrap: 'break-all',
    lineHeight: 1.25
  },
  button: {
    marginTop: 24,
    marginRight: 24,
    justifyContent: 'flex-end',
    display: 'flex'
  },
  p: {
    width: 200,
    fontSize: 16,
    margin: '8 24 8 24'
  },
  instruction: {
    marginLeft: -24,
    fontSize: 14
  },
  flatButton: {
    marginTop: 24,
    marginLeft: 10
  },
  paperDiv: {
    margin: 24
  },
  tabs: {
    marginTop: 16
  },
  tab: {
    color: '#000000',
    backgroundColor: '#EEEEEE'
  },
  div: {
    marginTop: 24
  }
}

class TestpaperEditPage extends React.Component {
  componentWillMount = () => {
    const {loadTestpaper, loadKslb, loadSjbs, loadBlocks, loadSections} = this.props.testpapersActions
    const {loadSemesters} = this.props.semestersActions
    loadSemesters()
    loadTestpaper(this.props.testpaperId)
    loadBlocks(this.props.testpaperId)
    loadSections(this.props.testpaperId)
    loadKslb()
    loadSjbs()
  }

  handleDelete = () => {
    const {deleteTestpaper} = this.props.testpapersActions
    deleteTestpaper(this.props.testpaper)
    browserHistory.push('/testpapers')
  }

  handleSubmit = () => {
    browserHistory.push('/testpapers/' + this.props.testpaperId + '/show')
  }

  handleChange = () => {
    browserHistory.push('/testpapers/' + this.props.testpaperId + '/update')
  }

  render () {
    const {testpaper, testpaperId, semesters, blocks, sections, test_type, pages_layout} = this.props
    return (
      <div>
        <div style={styles.button}>
          <RaisedButton containerElement={<Link to={`/testpapers/`} />} label='返回列表'
            secondary />
          <RaisedButton style={{marginLeft: 8}} onTouchTap={this.handleSubmit} primary
            label={PREVIEW} />
        </div>
        <Paper style={styles.Paper} zDepth={2}>
          <div style={styles.paperDiv}>
            {testpaper &&
            <div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                textAlign: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{width: 120}} />
                <div style={styles.title}>{testpaper.title}</div>
                <div style={{marginTop: 24}}>
                  <FlatButton onTouchTap={this.handleChange} primary label={MODIFY} />
                  <DeletePrompt handleDelete={this.handleDelete} content={testpaper}
                    name={TEST_PAPER} prompt={PROMPT} />
                </div>
              </div>
              <div style={{marginTop: 8}}>注意事项：</div>
              <ol style={styles.instruction}>
                <li>本试卷考试时长为{testpaper.duration}，满分为{testpaper.points}。</li>
                <li>请按规定在答题卡上填涂、作答。在试卷上作答无效，不予评分。</li>
              </ol>
              <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                <div style={styles.p}>
                   学期：{(semesters && semesters.find((semester) => semester.id == testpaper.semester)) &&
                       semesters.find((semester) => semester.id == testpaper.semester).name}
                </div>
                <div style={styles.p}>考试类型：{test_type && test_type[testpaper.test_type]}</div>
                <div style={styles.p}>页数：{testpaper.pages_number}</div>
                <div style={styles.p}>
                   排版形式：{pages_layout && pages_layout[testpaper.pages_layout]}</div>
              </div>
            </div>
            }
          </div>
          <Tabs style={styles.tabs}>
            <Tab style={styles.tab} label={BLOCK}>
              <div style={styles.div}>
                <BlockTab blocks={blocks} testpaperId={testpaperId} />
              </div>
            </Tab>
            <Tab style={styles.tab} label={SECTION}>
              <div style={styles.div}>
                <SectionTab testpaperId={testpaperId} sections={sections} />
              </div>
            </Tab>
          </Tabs>
        </Paper>
        <br />
      </div>
    )
  }
}

TestpaperEditPage.propTypes = {
  block: PropTypes.object,
  blocks: PropTypes.array,
  section: PropTypes.object,
  sections: PropTypes.array,
  test_type: PropTypes.object,
  pages_layout: PropTypes.object,
  testpaperId: PropTypes.string,
  testpaper: PropTypes.object.isRequired,
  testpapersActions: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const testpaperId = ownProps.params.id
  return {
    testpaperId,
    semesters: state.semesters,
    blocks: state.testpapers.blocks,
    test_type: state.testpapers.test_type,
    sections: state.testpapers.sections,
    testpaper: state.testpapers.testpaper,
    pages_layout: state.testpapers.pages_layout
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    testpapersActions: bindActionCreators(testpapersActions, dispatch),
    semestersActions: bindActionCreators(semestersActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestpaperEditPage)
