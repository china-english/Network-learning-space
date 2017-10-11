import React from 'react'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import Card from 'material-ui/Card'
import MediaQuery from 'react-responsive'

import DeletePrompt from '../../businessLogic/DeletePrompt'
import * as numbers from '../../constants/numbers'

const styles = {
  table: {
    margin: 24
  },
  miniTableRowColumn: {
    margin: 0,
    padding: 0,
    textAlign: 'center'
  },
  TableRowColumn: {
    textAlign: 'center'
  }
}

const TestpaperQuestionList = ({ deleteTestpaperQuestion, testpapersQuestionsRelations }) => {
  return (
    <div style={styles.table}>
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn style={styles.TableRowColumn}>试卷名称</TableHeaderColumn>
            <TableHeaderColumn style={styles.TableRowColumn}>分值</TableHeaderColumn>
            <TableHeaderColumn style={styles.TableRowColumn}>题号</TableHeaderColumn>
            <TableHeaderColumn style={styles.TableRowColumn}>操作</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody stripedRows={false} displayRowCheckbox={false}>
          {
            testpapersQuestionsRelations && testpapersQuestionsRelations.map(
              (testpaperQuestion) =>
                <TableRow key={testpaperQuestion.id}>
                  <TableRowColumn style={styles.TableRowColumn}>{testpaperQuestion.testpaper_title}</TableRowColumn>
                  <TableRowColumn style={styles.TableRowColumn}>{testpaperQuestion.point}</TableRowColumn>
                  <TableRowColumn style={styles.TableRowColumn}>{testpaperQuestion.serial}</TableRowColumn>
                  <TableRowColumn style={styles.TableRowColumn}>
                    <DeletePrompt handleDelete={deleteTestpaperQuestion} content={testpaperQuestion} name='试卷关联' />
                  </TableRowColumn>
                </TableRow>
            )
          }
        </TableBody>
      </Table>
    </div>
  )
}

const MiniTestpaperQuestionList = ({ deleteTestpaperQuestion, testpapersQuestionsRelations }) => {
  return (
    <div>
      {testpapersQuestionsRelations && testpapersQuestionsRelations.map(
        (testpaperQuestion) =>
          <Card key={testpaperQuestion.id} style={styles.table}>
            <Table >
              <TableBody displayRowCheckbox={false}>
                <TableRow>
                  <TableRowColumn style={styles.miniTableRowColumn}>试卷名称</TableRowColumn>
                  <TableRowColumn style={styles.miniTableRowColumn}>{testpaperQuestion.testpaper_title}</TableRowColumn>
                </TableRow>
                <TableRow >
                  <TableRowColumn style={styles.miniTableRowColumn}>分值</TableRowColumn>
                  <TableRowColumn style={styles.miniTableRowColumn}>{testpaperQuestion.point}</TableRowColumn>
                </TableRow>
                <TableRow >
                  <TableRowColumn style={styles.miniTableRowColumn}>题号</TableRowColumn>
                  <TableRowColumn style={styles.miniTableRowColumn}>{testpaperQuestion.serial}</TableRowColumn>
                </TableRow>
                <TableRow >
                  <TableRowColumn style={styles.miniTableRowColumn}>操作</TableRowColumn>
                  <TableRowColumn style={styles.miniTableRowColumn}>
                    <DeletePrompt handleDelete={deleteTestpaperQuestion} content={testpaperQuestion} name='试卷关联' />
                  </TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
      )
      }
    </div>
  )
}

const TestpapersQuestionsTable = ({ deleteTestpaperQuestion, testpapersQuestionsRelations }) => {
  return (
    <div>
      <MediaQuery minWidth={numbers.widthOneCol} maxWidth={numbers.widthTwoCols - 1}>
        <MiniTestpaperQuestionList deleteTestpaperQuestion={deleteTestpaperQuestion}
          testpapersQuestionsRelations={testpapersQuestionsRelations} />
      </MediaQuery>
      <MediaQuery minWidth={numbers.widthTwoCols}>
        <TestpaperQuestionList deleteTestpaperQuestion={deleteTestpaperQuestion}
          testpapersQuestionsRelations={testpapersQuestionsRelations} />
      </MediaQuery>
    </div>
  )
}

export default TestpapersQuestionsTable
