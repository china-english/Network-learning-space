import React, {PropTypes} from 'react'
import MediaQuery from 'react-responsive'

import {Table, TableBody, TableRowColumn, TableRow} from 'material-ui/Table'
import FlatButton from 'material-ui/FlatButton'

import {MODIFY} from '../../constants/strings'
import * as numbers from '../../constants/numbers'
import {NUMBER} from '../../constants/strings'
import DeletePrompt from '../../businessLogic/DeletePrompt'

const styles = {
  button: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  text_center: {
    textAlign: 'center'
  },
  flatButton: {
    marginRight: 8
  },
  div_style: {
    marginRight: 8,
    marginLeft: 8
  },
  minTable: {
    border: 'solid',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 8
  }
}

const TestpaperStructureContentListRow = props => {
  const { contents, handleClick, handleDelete, name, content_name, title_name } = props
  return (
    <div>
      <MediaQuery minWidth={numbers.widthTwoCols}>
        <Table>
          <TableBody stripedRows={false} displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn>{NUMBER}</TableRowColumn>
              <TableRowColumn >{content_name}</TableRowColumn>
              <TableRowColumn >{title_name}</TableRowColumn>
              <TableRowColumn style={styles.text_center}>操作</TableRowColumn>
            </TableRow>
            {contents && contents.map((content) =>
              <TableRow key={content.id}>
                <TableRowColumn>{content.number}</TableRowColumn>
                <TableRowColumn>{content.requirement ? content.requirement : content.title}</TableRowColumn>
                <TableRowColumn>
                  {content.start_number} - {content.end_number}
                </TableRowColumn>
                <TableRowColumn>
                  <div style={styles.button}>
                    <FlatButton style={styles.flatButton}
                      onClick={() => handleClick(content)}
                      primary
                      label={MODIFY} />
                    <DeletePrompt handleDelete={handleDelete}
                      content={content}
                      name={name}
                    />
                  </div>
                </TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </MediaQuery>
      <MediaQuery maxWidth={numbers.widthTwoCols - 1}>
        <div style={styles.div_style}>
          {contents && contents.map((content) =>
            <Table style={styles.minTable} key={content.id}>
              <TableBody stripedRows={false} displayRowCheckbox={false}>
                <TableRow>
                  <TableRowColumn>{NUMBER}</TableRowColumn>
                  <TableRowColumn style={styles.text_center}>{content.number}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn >{content_name}</TableRowColumn>
                  <TableRowColumn style={styles.text_center}>
                    {content.requirement ? content.requirement : content.title}
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn >{title_name}</TableRowColumn>
                  <TableRowColumn style={styles.text_center}>
                    {content.start_number} - {content.end_number}
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>操作</TableRowColumn>
                  <TableRowColumn>
                    <div style={styles.button}>
                      <FlatButton onClick={() => handleClick(content)}
                        primary
                        label={MODIFY}
                      />
                      <DeletePrompt handleDelete={handleDelete}
                        content={content}
                        name={name}
                      />
                    </div>
                  </TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </div>
      </MediaQuery>
    </div>
  )
}

TestpaperStructureContentListRow.propTypes = {
  content: PropTypes.object,
  handleDelete: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default TestpaperStructureContentListRow
