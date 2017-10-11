import React from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'

import {CANCEL, SUBMIT} from '../../constants/strings'
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
      errors[field] = '必选项'
    }
  })
  return errors
}

let MultiselectionForm = props => {
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
    <div>
      <form>
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
            <Field name='answer' component={reduxFormHelper.renderTextField}
              label='正确答案&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;填写正确选项的大写字母(ABCDE)' />
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

MultiselectionForm = reduxForm({
  form: 'MultiselectionForm',
  validate
})(MultiselectionForm)

function mapStateToProps (state, ownProps) {
  return {
    initialValues: ownProps.question,
    subjects: state.subjects
  }
}

export default connect(mapStateToProps)(MultiselectionForm)
