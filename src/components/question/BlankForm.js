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
  const requiredFields =
    // this.props.testpaperId ?
    ['question', 'answer', 'difficulty_degree', 'difficulty_level', 'subject', 'serial', 'point']
  // ['question', 'answer', 'difficulty_degree', 'difficulty_level', 'subject'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = '必填项'
    }
  })
  return errors
}

let BlankForm = props => {
  const {
    handleSubmit, title, testpaperId, pristine, handleClose, open, subjects
  } = props
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
            <Field name='question' component={reduxFormHelper.renderTextField}
              label='题目' hintText='请使用____(4条及以上的连续半角下划线)表示需要填写的空格' multiLine />
          </div>
          <div>
            <Field name='answer' component={reduxFormHelper.renderTextAreaField} label='答案'
              hintText='请用；(全角分号)间隔不同空格的答案'
              type='textarea'
              multiLine />
          </div>
          <div>
            <Field name='difficulty_degree' component={reduxFormHelper.renderNumberField}
              label='试题级别&nbsp;&nbsp;(请输入数字)' />
          </div>
          <div>
            <Field name='difficulty_level' type='number' component={reduxFormHelper.renderNumberField}
              label='难度等级&nbsp;&nbsp;(1为简单，5为困难)' />
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

BlankForm = reduxForm({
  form: 'BlankForm',
  validate
})(BlankForm)

function mapStateToProps (state, ownProps) {
  return {
    initialValues: ownProps.question,
    subjects: state.subjects
  }
}

export default connect(mapStateToProps)(BlankForm)
