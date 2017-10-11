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
  const requiredFields = ['question', 'A', 'answer', 'number', 'analysis', 'point']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = '未填写'
    }
  })
  return errors
}

let EngOptionForm = props => {
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
              hintText='小题在英语题中的相对题号，而不是试卷中标识题号' multiLine />
          </div>
          <div>
            <Field name='number_contains' component={reduxFormHelper.renderNumberField} label='包含小题属数目' multiLine />
          </div>
          <div>
            <Field name='point' component={reduxFormHelper.renderNumberField} label='分值' multiLine />
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
            <Field name='F' component={reduxFormHelper.renderTextField} label='候选答案F' multiLine />
          </div>
          <div>
            <Field name='G' component={reduxFormHelper.renderTextField} label='候选答案G' multiLine />
          </div>
          <div>
            <Field name='H' component={reduxFormHelper.renderTextField} label='候选答案H' multiLine />
          </div>
          <div>
            <Field name='I' component={reduxFormHelper.renderTextField} label='候选答案I' multiLine />
          </div>
          <div>
            <Field name='J' component={reduxFormHelper.renderTextField} label='候选答案J' multiLine />
          </div>
          <div>
            <Field name='K' component={reduxFormHelper.renderTextField} label='候选答案K' multiLine />
          </div>
          <div>
            <Field name='L' component={reduxFormHelper.renderTextField} label='候选答案L' multiLine />
          </div>
          <div>
            <Field name='M' component={reduxFormHelper.renderTextField} label='候选答案M' multiLine />
          </div>
          <div>
            <Field name='N' component={reduxFormHelper.renderTextField} label='候选答案N' multiLine />
          </div>
          <div>
            <Field name='O' component={reduxFormHelper.renderTextField} label='候选答案O' multiLine />
          </div>
          <div>
            <Field name='P' component={reduxFormHelper.renderTextField} label='候选答案P' multiLine />
          </div>
          <div>
            <Field name='Q' component={reduxFormHelper.renderTextField} label='候选答案Q' multiLine />
          </div>
          <div>
            <Field name='R' component={reduxFormHelper.renderTextField} label='候选答案R' multiLine />
          </div>
          <div>
            <Field name='S' component={reduxFormHelper.renderTextField} label='候选答案S' multiLine />
          </div>
          <div>
            <Field name='T' component={reduxFormHelper.renderTextField} label='候选答案T' multiLine />
          </div>
          <div>
            <Field name='answer' component={reduxFormHelper.renderTextField}
              label='正确答案&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;填写正确选项的大写字母(ABCDE)' />
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

EngOptionForm = reduxForm({
  form: 'EngOptionForm',
  validate
})(EngOptionForm)

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: ownProps.question
  }
}
export default connect(mapStateToProps, null)(EngOptionForm)
