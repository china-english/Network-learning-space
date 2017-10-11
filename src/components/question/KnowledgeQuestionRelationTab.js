import React from 'react'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

import DeletePrompt from '../../businessLogic/DeletePrompt'
import KnowledgeDialog from './KnowledgeDialog'

const styles = {
  table: {
    margin: 24
  },
  relation: {
    margin: 10,
    fontSize: 18,
    fontWeight: 600
  },
  TableRowColumn: {
    textAlign: 'center'
  },
  box: {
    display: 'flex',
    margin: 24,
    justifyContent: 'flex-start'
  }
}
class QuestionRelationEditPage extends React.Component {
  render () {
    const { question, knowledgeQuestionsRelations, knowledgeList, questionType, deleteKnowledgeQuestion } = this.props
    const knowledgeQuestionList = knowledgeQuestionsRelations && knowledgeQuestionsRelations.map(knowledgeQuestion =>
      <TableRow key={knowledgeQuestion.id}>
        <TableRowColumn style={styles.TableRowColumn}>{knowledgeQuestion.knowledge_name}</TableRowColumn>
        <TableRowColumn style={styles.TableRowColumn}>
          <DeletePrompt handleDelete={deleteKnowledgeQuestion} content={knowledgeQuestion} name='关联知识点' />
        </TableRowColumn>
      </TableRow>
      )
    return (
      <div >
        {question &&
        <div>
          <div style={styles.box}>
            <div style={styles.relation}>相关知识点</div>
            <KnowledgeDialog question={question}
              questionType={questionType}
              knowledgeList={knowledgeList}
            />
          </div>
          {knowledgeQuestionsRelations.length > 0 &&
          <div style={styles.table}>
            <Table>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn style={styles.TableRowColumn}>知识点名称</TableHeaderColumn>
                  <TableHeaderColumn style={styles.TableRowColumn}>操作</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody stripedRows={false} displayRowCheckbox={false}>
                {knowledgeQuestionList}
              </TableBody>
            </Table>
          </div>
          }
        </div>
        }
        <br />
      </div>
    )
  }
}

export default QuestionRelationEditPage
