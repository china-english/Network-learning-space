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
  const requiredFields = ['question', 'requirement', 'questions_num', 'difficulty_degree', 'difficulty_level', 'category', 'subject', 'serial', 'point']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = '必填项'
    }
  })
  return errors
}

let EnglishQuestionStemEditForm = props => {
  const { handleSubmit, title, testpaperId, pristine, handleClose, open, subjects, engQuestionTypeList } = props
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
            <Field name='requirement' component={reduxFormHelper.renderTextField} label='题目要求' multiLine />
          </div>
          <div>
            <Field name='question' component={reduxFormHelper.renderTextField} label='题目正文/文章' multiLine />
          </div>
          <div>
            <Field name='questions_num' component={reduxFormHelper.renderNumberField} label='小题数量（请输入数字）'
              multiLine />
          </div>
          <div>
            <Field name='difficulty_degree' component={reduxFormHelper.renderNumberField}
              label='试题级别（请输入数字）' />
          </div>
          <div>
            <Field name='difficulty_level' component={reduxFormHelper.renderNumberField}
              label='难度等级（1为简单，5为困难）' />
          </div>
          <div>

            <Field name='category' component={reduxFormHelper.renderSelectField} label='题型'>
              {engQuestionTypeList && Object.keys(engQuestionTypeList) && Object.keys(engQuestionTypeList).map(
                key =>
                  <MenuItem key={key} value={key} primaryText={engQuestionTypeList[key]} />
              )}
            </Field>
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

EnglishQuestionStemEditForm = reduxForm({
  form: 'EnglishQuestionStemEditForm',
  validate
})(EnglishQuestionStemEditForm)

function mapStateToProps (state, ownProps) {
  return {
    initialValues: ownProps.question,
    subjects: state.subjects,
    engQuestionTypeList: state.questions.engQuestionTypeList
  }
}

export default connect(mapStateToProps)(EnglishQuestionStemEditForm)
