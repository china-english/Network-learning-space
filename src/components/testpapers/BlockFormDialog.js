import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'

import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'

import * as reduxFormHelper from '../../businessLogic/reduxFormHelper'
import {GOT_IT, CONFIRM, CANCEL, ERROR_PROMPT_CONTENT, ERROR_PROMPT} from '../../constants/strings'

const validate = values => {
  const errors = {}
  const requiredFields = ['number', 'start_number', 'end_number', 'title', 'points', 'testpaper']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = '此项不能为空'
    }
    if (values[field] < 0) {
      errors[field] = '此项不能小于等于0'
    }
    if (values.start_number > values.end_number) {
      errors.end_number = '结束题号不能小于开始题号'
    }
  })
  return errors
}

let BlockFormDialog = props => {
  const { handleSubmit, pristine, dialogBlockLabel, handleCloseBlock, submitting, open, openErrorNote, handleCloseErrorNote } = props
  return (
    <Dialog title={dialogBlockLabel}
      modal={false}
      open={open}
      actions={[<RaisedButton style={{marginRight: 8}} key='1' secondary onTouchTap={handleCloseBlock} label={CANCEL} />,
        <RaisedButton key='2' primary disabled={pristine || submitting} onTouchTap={handleSubmit}
          label={CONFIRM} />]}
      onRequestClose={handleCloseBlock}
      autoScrollBodyContent
    >
      <form onSubmit={handleSubmit}>
        <div>
          <Field name='number' hintText='区块编号' label='区块编号' component={reduxFormHelper.renderNumberField}
            multiLine
            fullWidth
            rows={1} />
        </div>
        <div>
          <Field name='start_number' hintText='所含大题起始编号' label='所含大题起始编号'
            component={reduxFormHelper.renderNumberField}
            multiLine
            fullWidth
            rows={1} />
        </div>
        <div>
          <Field name='end_number' hintText='所含大题结束编号' label='所含大题结束编号' component={reduxFormHelper.renderNumberField}
            multiLine
            fullWidth
            rows={1} />
        </div>
        <div>
          <Field name='title' hintText='名称' label='名称' component={reduxFormHelper.renderTextField} multiLine
            rows={1} />
        </div>
        <div>
          <Field name='points' hintText='总分' label='总分' component={reduxFormHelper.renderNumberField} multiLine
            fullWidth
            rows={1} />
        </div>
        <div>
          <Field name='duration' hintText='设计时长' label='设计时长' component={reduxFormHelper.renderNumberField}
            multiLine
            fullWidth
            rows={1} />
        </div>

        <Dialog open={openErrorNote}
          title={ERROR_PROMPT}
          actions={
            <RaisedButton
              label={GOT_IT}
              primary
              onTouchTap={handleCloseErrorNote}
                  />
                }
          modal={false}
          onRequestClose={handleCloseErrorNote}>
          <div>{ERROR_PROMPT_CONTENT}</div>
        </Dialog>
      </form>
    </Dialog>
  )
}

BlockFormDialog.propTypes = {
  block: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  handleCloseBlock: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  openErrorNote: PropTypes.bool.isRequired,
  handleCloseErrorNote: PropTypes.func.isRequired,
  dialogBlockLabel: PropTypes.string
}

BlockFormDialog = reduxForm({
  form: 'BlockFormDialog',
  validate
})(BlockFormDialog)

function mapStateToProps (state, ownProps) {
  return {
    initialValues: ownProps.block
  }
}

export default connect(mapStateToProps)(BlockFormDialog)
