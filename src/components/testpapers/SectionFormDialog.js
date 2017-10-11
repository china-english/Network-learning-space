import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'

import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'

import * as reduxFormHelper from '../../businessLogic/reduxFormHelper'
import {GOT_IT, CONFIRM, CANCEL, ERROR_PROMPT, ERROR_PROMPT_CONTENT} from '../../constants/strings'

const validate = values => {
  const errors = {}
  const requiredFields = ['number', 'start_number', 'end_number', 'requirement', 'points', 'testpaper']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = '此项不能为空'
    }
    if (values.start_number > values.end_number) {
      errors.end_number = '结束题号不能小于开始题号'
    }
  })
  return errors
}

let SectionFormDialog = props => {
  const { handleSubmit, dialogSectionLabel, pristine, handleCloseSection, submitting, open, openErrorNote, handleCloseErrorNote } = props
  const actions = [
    <RaisedButton style={{marginRight: 8}} key='1' secondary onTouchTap={handleCloseSection} label={CANCEL} />,
    <RaisedButton key='2' type='submit' primary disabled={pristine || submitting} onTouchTap={handleSubmit}
      label={CONFIRM} />
  ]
  return (
    <Dialog
      title={dialogSectionLabel}
      modal={false}
      open={open}
      actions={actions}
      onRequestClose={handleCloseSection}
      autoScrollBodyContent
    >
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
      <form>
        <div>
          <Field name='number' hintText='大题编号' label='大题编号' component={reduxFormHelper.renderNumberField}
            multiLine
            fullWidth
            rows={2} />
        </div>
        <div>
          <Field name='start_number' hintText='所含小题起始编号' label='所含小题起始编号' component={reduxFormHelper.renderNumberField}
            multiLine
            fullWidth
            rows={10} />
        </div>
        <div>
          <Field name='end_number' hintText='所含小题结束编号' label='所含小题结束编号' component={reduxFormHelper.renderNumberField}
            multiLine
            fullWidth
            rows={1} />
        </div>
        <div>
          <Field name='title' hintText='名称(仅限英语)' label='名称(仅限英语)' component={reduxFormHelper.renderTextField}
            multiLine
            rows={1} />
        </div>
        <div>
          <Field name='requirement' hintText='大题要求' label='大题要求' component={reduxFormHelper.renderTextField}
            multiLine
            fullWidth
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
      </form>
    </Dialog>
  )
}

SectionFormDialog.propTypes = {
  section: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  handleCloseSection: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  openErrorNote: PropTypes.bool.isRequired,
  handleCloseErrorNote: PropTypes.func.isRequired,
  dialogSectionLabel: PropTypes.string
}

SectionFormDialog = reduxForm({
  form: 'SectionFormDialog',
  validate
})(SectionFormDialog)

function mapStateToProps (state, ownProps) {
  return {
    initialValues: ownProps.section
  }
}

export default connect(mapStateToProps)(SectionFormDialog)
