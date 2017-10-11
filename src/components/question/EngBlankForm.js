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
  const requiredFields = ['question', 'answer', 'number', 'analysis', 'point']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = '必填项'
    }
  })
  return errors
}

let EngBlankForm = props => {
  const { handleSubmit, title, pristine, handleClose, open } = props
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
            <Field name='point' component={reduxFormHelper.renderNumberField} label='分值' multiLine />
          </div>
          <div>
            <Field name='question' component={reduxFormHelper.renderTextField} label='题干' multiLine />
          </div>
          <div>
            <Field name='answer' component={reduxFormHelper.renderTextAreaField} label='参考答案'
              hintText='请用；(全角分号)间隔不同空格的答案'
              type='textarea'
              multiLine />
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

EngBlankForm = reduxForm({
  form: 'EngBlankForm',
  validate
})(EngBlankForm)

function mapStateToProps (state, ownProps) {
  return {
    initialValues: ownProps.question
  }
}

export default connect(mapStateToProps)(EngBlankForm)
