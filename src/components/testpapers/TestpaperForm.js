import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import {Field, reduxForm} from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'
import {Checkbox} from 'redux-form-material-ui'

import * as reduxFormHelper from '../../businessLogic/reduxFormHelper'
import {SUBMIT, PROMPT, TEST_PAPER} from '../../constants/strings'
import DeletePrompt from '../../businessLogic/DeletePrompt'

const styles = {
  buttonAlign: {
    justifyContent: 'space-between',
    display: 'flex'
  },
  form: {
    width: '100%',
    height: 45
  },
  checkbox: {
    width: 250
  }
}

const validate = values => {
  const errors = {}
  const requiredFields = ['title', 'test_type', 'pages_number', 'pages_layout', 'points', 'duration']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = '此项不能为空'
    }
  })
  return errors
}

let TestpaperForm = props => {
  const { subjects, semesters, test_type, pages_layout, testpaperId, handleSubmit, pristine, submitting, handleDelete } = props
  return (
    <div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <Field name='title' hintText='标题' label='标题' component={reduxFormHelper.renderTextField} multiLine
            rows={2} />
        </div>
        <div>
          <Field name='subtitle' hintText='副标题' label='副标题' component={reduxFormHelper.renderTextField} multiLine
            fullWidth
            rows={10} />
        </div>
        <div>
          <Field name='pages_number' hintText='页数' label='页数' component={reduxFormHelper.renderNumberField}
            multiLine
            fullWidth
            rows={1} />
        </div>
        <div>
          <Field name='pages_layout' component={reduxFormHelper.renderSelectField} label='排版'>
            {Object.keys(pages_layout) && Object.keys(pages_layout).map(
              key => <MenuItem key={key} value={key} primaryText={pages_layout[key]} />
            )}
          </Field>
        </div>
        <div>
          <Field name='test_type' component={reduxFormHelper.renderSelectField} label='考试类型'>
            {Object.keys(test_type) && Object.keys(test_type).map(
              key => <MenuItem key={key} value={key} primaryText={test_type[key]} />
            )}
          </Field>
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
        <div>
          <Field name='notes' hintText='备注' label='备注' component={reduxFormHelper.renderTextField} multiLine
            rows={1} />
        </div>
        <div>
          <Field name='subject' component={reduxFormHelper.renderSelectField} label='科目'>
            {subjects &&
            subjects.map(
              (subject) =>
                <MenuItem key={subject.id} value={subject.id} primaryText={subject.name} />)
            }
          </Field>
        </div>
        <div>
          <Field name='semester' component={reduxFormHelper.renderSelectField} label='学期'>
            {semesters &&
            semesters.map(
              (semester) =>
                <MenuItem key={semester.id} value={semester.id} primaryText={semester.name} />)
            }
          </Field>
        </div>
        <div>
          <div style={styles.checkbox}>
            <Field name='has_formulas' id='has_formulas' labelPosition='left' component={Checkbox} label='是否包含数学公式:' />
          </div>
        </div>
        <div>
          <div style={styles.checkbox}>
            <Field name='open' id='open' component={reduxFormHelper.renderCheckbox} label='开放试卷:' />
          </div>
        </div>
        <br />
        <div style={styles.buttonAlign}>
          <div>
            {testpaperId &&
            <DeletePrompt handleDelete={handleDelete}
              id={testpaperId}
              content={null}
              name={TEST_PAPER}
              prompt={PROMPT}
            />
            }
          </div>
          <RaisedButton type='submit' primary disabled={pristine || submitting}
            label={SUBMIT} />
        </div>
      </form>
    </div>
  )
}
TestpaperForm.propTypes = {
  subjects: PropTypes.array.isRequired,
  semesters: PropTypes.array.isRequired,
  test_type: PropTypes.object.isRequired,
  pages_layout: PropTypes.object.isRequired,
  testpaperId: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  testpaper: PropTypes.object
}

TestpaperForm = reduxForm({
  form: 'TestpaperForm',
  validate
})(TestpaperForm)

function mapStateToProps (state) {
  return {
    initialValues: state.testpapers.testpaper
  }
}

export default connect(mapStateToProps)(TestpaperForm)
