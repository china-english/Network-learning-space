import React from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm, formValueSelector} from 'redux-form'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'

import {SUBMIT, CANCEL} from '../../constants/strings'
import * as reduxFormHelper from '../../businessLogic/reduxFormHelper'

const styles = {
  title: {
    fontSize: 20,
    color: '#00BCD4',
    fontWeight: 'bold'
  },
  Dialog: {
    backgroundColor: 'transparent'
  }
}
const validate = values => {
  const errors = {}
  const requiredFields = [ 'A', 'answer', 'number', 'point']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = '未填写'
    }
  })
  return errors
}

let EngSelectionForm = props => {
  const { handleSubmit, title, pristine, handleClose, open, candidateAnswers } = props
  const actions = [
    <FlatButton label={SUBMIT}
      type='submit'
      primary
      onClick={handleSubmit}
      keyboardFocused
      disabled={pristine} />,
    <FlatButton label={CANCEL}
      secondary
      onClick={handleClose}
    />
  ]

  return (
    <div >
      <form >
        <Dialog
          overlayStyle={styles.Dialog}
          title={title}
          actions={actions}
          open={open}
          autoScrollBodyContent
        >
          <div>
            <Field name='number' component={reduxFormHelper.renderNumberField} label='相对题号'
              hintText='小题在英语题中的相对题号，而不是试卷中标识题号' />
          </div>
          <div>
            <Field name='point' component={reduxFormHelper.renderNumberField} label='分值' />
          </div>
          <div>
            <Field name='question' component={reduxFormHelper.renderTextField} label='题干' multiLine />
          </div>
          <div>
            <Field name='A' component={reduxFormHelper.renderTextField} label='候选答案A' multiLine />
          </div>
          <div>
            <Field name='B' component={reduxFormHelper.renderTextField} label='候选答案B' multiLine />
          </div>
          <div>
            <Field name='C' component={reduxFormHelper.renderTextField} label='候选答案C' multiLine />
          </div>
          <div>
            <Field name='D' component={reduxFormHelper.renderTextField} label='候选答案D' multiLine />
          </div>
          <div>
            <Field name='E' component={reduxFormHelper.renderTextField} label='候选答案E' multiLine />
          </div>
          <div>
            <Field name='answer' component={reduxFormHelper.renderSelectField}
              label='参考答案'>
              {candidateAnswers &&
              candidateAnswers.map(
                (candidateAnswer) =>
                  <MenuItem key={candidateAnswer} value={candidateAnswer} primaryText={candidateAnswer} />
              )
              }
            </Field>
          </div>
          <div>
            <Field name='analysis' component={reduxFormHelper.renderTextAreaField}
              label='试题分析' />
          </div>
        </Dialog>
      </form>
    </div>
  )
}

EngSelectionForm = reduxForm({
  form: 'EngSelectionForm',
  validate
})(EngSelectionForm)

const selector = formValueSelector('EngSelectionForm')
const mapStateToProps = (state, ownProps) => {
  const { A, B, C, D, E } = selector(state, 'A', 'B', 'C', 'D', 'E')
  let candidateAnswers = []
  if (A) {
    candidateAnswers.push('A')
  }
  if (B) {
    candidateAnswers.push('B')
  }
  if (C) {
    candidateAnswers.push('C')
  }
  if (D) {
    candidateAnswers.push('D')
  }
  if (E) {
    candidateAnswers.push('E')
  }
  return {
    initialValues: ownProps.question,
    candidateAnswers
  }
}
export default connect(mapStateToProps, null)(EngSelectionForm)
