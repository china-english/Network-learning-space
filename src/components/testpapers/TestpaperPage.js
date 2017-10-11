import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

import * as questionsActions from '../../actions/questionsActions';
import * as testpapersActions from '../../actions/testpapersActions';
import * as subjectsActions from '../../actions/subjectsActions';
import QuestionPropertyEditDialog from '../question/QuestionPropertyEditDialog';
import TestpaperQuestionsList from './TestpaperQuestionsList';

const styles = {
  Paper: {
    width: 972,
    padding: 24,
  },
  title: {
    margin: 24,
    fontSize: 24,
    fontWeight: 700,
    textAlign: 'center'
  },
  Paper_style: {
    justifyContent: 'center',
    display: 'flex',
    flex: 1,
    width: '100%'
  },
  box: {
    display: 'flex',
    flex: 1,
  },
  navBarBottom: {
    justifyContent: 'flex-end',
    display: 'flex',
    flex: 1,
    margin: '8px 24px 8px 8px'
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 500,
    margin: 16,
  },
  blocksList: {
    fontSize: 16,
    color: '#00BDC4',
    fontWeight: 500,
    marginTop: 24,
  },
  sectionsList: {
    fontSize: 14,
    fontWeight: 500,
    marginTop: 16,
    color: '#FF4081'
  },
  blockDetail: {
    margin: 16
  },
  toggle: {
    width: 120,
    margin: 16
  },
  RaisedButton:{
    margin: '8px 12px 12px 12px'
  }
};

class TestpaperPage extends React.Component {
  state = {
    toggle: true
  };

  componentWillMount = () => {
    const { loadTestpaper, loadBlocks, loadSections, loadTestpaperQuestions }=this.props.testpapersActions;
    const { loadSubjects } =this.props.subjectsActions;
    loadSubjects();
    loadTestpaperQuestions(this.props.testpaperId);
    loadTestpaper(this.props.testpaperId);
    loadBlocks(this.props.testpaperId);
    loadSections(this.props.testpaperId);
    const { loadQuestionTypeList, loadQuestion, loadEngQuestionTypeList }=this.props.questionsActions;
    if (!this.props.engQuestionTypeList) {  //涉及到state和componentWillMount问题，不验证题型而加载该数据
      loadEngQuestionTypeList();
    }
    loadQuestionTypeList().then(
      ()=> {
        if (this.props.questionId && this.props.questionTypeList) {
          const questionTypeYw = this.props.questionTypeList;
          loadQuestion(questionTypeYw[this.props.questionType][0], this.props.questionId);
        }
      }
    );
  };

  handleToggle = (event, toggle)=> {
    this.setState({ toggle });
  };
  handleChange = () => {
    browserHistory.push('/testpapers');
  };

  handleDelete = (testpaper_question) => {
    const { deleteTestpapersQuestion }=this.props.questionsActions;
    deleteTestpapersQuestion(testpaper_question);
  };

  render () {
    const { testpaper, testpaperId, blocks, subjects, sections, testpaper_questions } = this.props;

    let count = 0;
    let section_count = 0;
    return (
      <div>
        <div style={styles.navBarBottom}>
          <Toggle
            style={styles.toggle}
            onToggle={this.handleToggle}
            defaultToggled={true}
            labelPosition="right"
            label="添加/修改"
          />
          <RaisedButton style={styles.RaisedButton}
                        containerElement={<Link to={`/questions/`}/>}
                        label="添加试题"
          />
          <RaisedButton primary={true}
                        label="返回列表"
                        style={styles.RaisedButton}
                        onTouchTap={this.handleChange}/>
        </div>
        <div style={styles.title}>{testpaper.title}</div>
        <div style={styles.Paper_style}>
          <Paper style={styles.Paper} zDepth={4}>
            <div style={styles.subtitle}>{testpaper.subtitle}</div>
            <div style={styles.blocksList}>
              注意事项：
            </div>
            <div style={styles.subtitle}>
              1.考试时间为{testpaper.duration}分钟，满分为{testpaper.points}分。
              <br/>
              2.请按规定在答题卡上填涂、作答。在试卷上作答无效，不予评分。
            </div>
            <div>
              {blocks &&
              blocks.map(
                block=>
                  <div>
                    <div style={styles.blocksList}>第{block.number}部分：{block.title}</div>
                    <div style={styles.blockDetail}>
                      {sections && sections.map((section)=> {
                          if (section.number >= block.start_number && section.number <= block.end_number) {
                            return (
                              <div>
                                <div style={styles.sectionsList}>
                                  第{section.number}大题，{section.requirement}
                                  （本大题共有{section.end_number - section.start_number + 1}道小题，
                                  每题{section.points / (section.end_number - section.start_number + 1)}分，
                                  本大题共{section.points}分）
                                </div>
                                <div>
                                  <TestpaperQuestionsList startSerial={section.start_number}
                                                          endSerial={section.end_number}
                                                          handleDelete={this.handleDelete}
                                                          testpaper_questions={testpaper_questions}
                                                          testpaperId={testpaperId}
                                                          toggle={this.state.toggle}
                                                          subjects={subjects}
                                  />
                                </div>
                              </div>);
                          }
                        }
                      )}
                    </div>
                  </div>
              )
              }
            </div>
          </Paper>
        </div>
        <br/>
        <br/>
      </div>
    );
  }
}

TestpaperPage.propTypes = {
  block: PropTypes.object,
  section: PropTypes.object,
  testpaper: PropTypes.object,
  engQuestionTypeList: PropTypes.object,
  testpapersActions: PropTypes.object.isRequired,
  blocks: PropTypes.array,
  subjects: PropTypes.array,
  sections: PropTypes.array,
  testpaper_questions: PropTypes.array,
  testpaperId: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  const testpaperId = ownProps.params.id;
  const testpaper_questions = state.testpapers.testpaper_questions.sort((x, y)=> {
    return x.serial > y.serial? 1:-1;
    });
  return {
    testpaperId,
    subjects: state.subjects,
    blocks: state.testpapers.blocks,
    sections: state.testpapers.sections,
    testpaper: state.testpapers.testpaper,
    testpaper_questions,
    engQuestionTypeList: state.questions.engQuestionTypeList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    testpapersActions: bindActionCreators(testpapersActions, dispatch),
    questionsActions: bindActionCreators(questionsActions, dispatch),
    subjectsActions: bindActionCreators(subjectsActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestpaperPage);
