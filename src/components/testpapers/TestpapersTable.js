import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';

import Radium from 'radium';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import {MODIFY, TEST_PAPER, PROMPT} from '../../constants/strings';
import DeletePrompt from '../../businessLogic/DeletePrompt';

const styles = {
  button: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  table: {
    marginTop: 6,
    wordWrap: 'break-all',
    wordBreak: 'break-all',
    wordBreakWrap: 'break-all'
  },
  operation: {
    textAlign: 'center'
  },
  link:{
    textDecoration: 'none',
    color: '#000000',
    ':hover':{
      color:'#00bcd4'
    }
  }
};

class TestpapersTable extends React.Component {
  state = {
    testpaper: null
  };

  render () {
    const { testpapers, handleDelete }=this.props;
    let RadiumLink = Radium(Link);
    return (
      <div>
        <Table style={styles.table}>
          <TableBody stripedRows={false} displayRowCheckbox={false}>
            <TableRow >
              <TableHeaderColumn >名称</TableHeaderColumn>
              <TableHeaderColumn style={styles.operation}>操作</TableHeaderColumn>
            </TableRow>
            { testpapers &&
            testpapers.map(testpaper =>
              <TableRow key={testpaper.id}>
                <TableRowColumn >
                  <RadiumLink to={'/testpapers/' + testpaper.id + '/show'}
                        style={styles.link} >
                    {testpaper.title}
                  </RadiumLink>
                </TableRowColumn>
                <TableRowColumn >
                  <div style={styles.button}>
                    <FlatButton label={MODIFY}
                                primary={true}
                                containerElement={<Link to={'/testpapers/' + testpaper.id + '/edit'}/>}
                    />
                    <DeletePrompt handleDelete={handleDelete}
                                  content={testpaper}
                                  name={TEST_PAPER}
                                  prompt={PROMPT}
                    />
                  </div>
                </TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

TestpapersTable.propTypes = {
  testpapers: PropTypes.array.isRequired,
  handleDelete: PropTypes.func
};

function mapStateToProps (state, ownProps) {
  return {
    testpapers: ownProps.testpapers,
  };
}

export default connect(mapStateToProps)(TestpapersTable);
