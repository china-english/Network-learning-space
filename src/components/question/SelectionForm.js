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
  const requiredFields = ['question', 'A', 'answer', 'difficulty_degree', 'difficulty_level', 'subject', 'serial', 'point']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = '未填写'
    }
  })
  return errors
}

let SelectionForm = props => {
  const { handleSubmit, title, pristine, handleClose, open, testpaperId, subjects, candidateAnswers } = props
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
            <Field name='question' component={reduxFormHelper.renderTextField} label='题目' multiLine />
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
              label='正确答案'>
              {candidateAnswers &&
              candidateAnswers.map(
                (candidateAnswer) =>
                  <MenuItem key={candidateAnswer} value={candidateAnswer} primaryText={candidateAnswer} />
              )
              }
            </Field>
          </div>
          <div>
            <Field name='difficulty_degree' component={reduxFormHelper.renderNumberField}
              label='试题级别（请输入数字）' />
          </div>
          <div>
            <Field name='difficulty_level' type='number' component={reduxFormHelper.renderNumberField}
              label='难度等级（请输入数字）' />
          </div>
          {testpaperId &&
          <div>
            <div>
              <Field name='point' component={reduxFormHelper.renderNumberField} label='分值' />
            </div>
            <div>
              <Field name='serial' component={reduxFormHelper.renderNumberField} label='题号' />
            </div>
          </div>
          }
          <div>
            <Field name='subject' component={reduxFormHelper.renderSelectField} label='课程（专题）'>
              {subjects &&
              subjects.map(
                (subject) =>
                  <MenuItem key={subject.id} value={subject.id} primaryText={subject.name} />
              )
              }
            </Field>
          </div>
        </Dialog>
      </form>
    </div>
  )
}

SelectionForm = reduxForm({
  form: 'SelectionForm',
  validate
})(SelectionForm)

const selector = formValueSelector('SelectionForm')
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
    subjects: state.subjects,
    candidateAnswers
  }
}
export default connect(mapStateToProps, null)(SelectionForm)
