import React from 'react'

import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table'

const styles = {
  TableRowColumn: {
    height: '16px'
  },
  table: {
    marginBottom: '8px'
  }
}

const QuestionListTable = ({ question }) => {
  return (
    <div>
      <Table style={styles.table}>
        <TableBody displayRowCheckbox={false}>
          <TableRow>
            {question.A &&
            <TableRowColumn style={styles.TableRowColumn}>A.{question.A}</TableRowColumn>
            }
            {question.B &&
            <TableRowColumn style={styles.TableRowColumn}>B.{question.B}</TableRowColumn>
            }
          </TableRow>
          {question.C &&
          <TableRow>
            {question.C &&
            <TableRowColumn style={styles.TableRowColumn}>C.{question.C}</TableRowColumn>
            }
            {question.D &&
            <TableRowColumn style={styles.TableRowColumn}>D.{question.D}</TableRowColumn>
            }
          </TableRow>
          }
          {question.E &&
          <TableRow>
            <TableRowColumn style={styles.TableRowColumn}>E.{question.E}</TableRowColumn>
          </TableRow>
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default QuestionListTable
