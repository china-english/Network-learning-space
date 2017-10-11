import React from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'

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
  const requiredFields = ['question', 'answer', 'difficulty_degree', 'difficulty_level', 'subject', 'serial', 'point']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = '必填项'
    }
  })
  return errors
}

let JudgmentForm = props => {
  const { handleSubmit, title, pristine, handleClose, testpaperId, open, subjects } = props
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
            <Field name='question' component={reduxFormHelper.renderTextField} label='题目' multiLine
              fullWidth />
          </div>
          <div>
            <Field name='answer' component={reduxFormHelper.renderSelectField} label='正确答案'>
              <MenuItem value='A' primaryText='正确' />
              <MenuItem value='B' primaryText=' 错误' />
            </Field>
          </div>
          <div>
            <Field name='difficulty_degree' component={reduxFormHelper.renderNumberField}
              label='试题级别&nbsp;&nbsp;(请输入数字)' />
          </div>
          <div>
            <Field name='difficulty_level' type='number' component={reduxFormHelper.renderNumberField}
              label='难度等级&nbsp;&nbsp;(请输入数字)' />
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

JudgmentForm = reduxForm({
  form: 'JudgmentForm',
  validate
})(JudgmentForm)

function mapStateToProps (state, ownProps) {
  return {
    initialValues: ownProps.question,
    subjects: state.subjects
  }
}

export default connect(mapStateToProps)(JudgmentForm)
