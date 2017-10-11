import React from 'react'
import {Field, reduxForm} from 'redux-form'

import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import Dialog from 'material-ui/Dialog'
import AutoComplete from 'material-ui/AutoComplete'

import {SUBMIT, CANCEL} from '../../constants/strings'
import * as reduxFormHelper from '../../businessLogic/reduxFormHelper'

const styles = {
  dialogForm: {
    margin: '0  16'
  },
  Dialog: {
    backgroundColor: 'transparent'
  }
}

const validate = values => {
  const errors = {}
  const requiredFields = ['testpaper', 'point', 'serial']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = '未填写'
    }
  })
  return errors
}

let TestpapersDialogForm = props => {
  const { handleSubmit, pristine, handleClose, testpapersTitles, handleOpen, open } = props
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

  const dataSourceConfig = {
    text: 'title',
    value: 'id'
  }
  return (
    <div>
      <form>
        <Dialog
          overlayStyle={styles.Dialog}
          title='添加所属试卷'
          modal={false}
          actions={actions}
          open={open}
          onRequestClose={handleClose}
          autoScrollBodyContent
        >
          {/* <div> */}
          {/* <Field name="testpaper" component={reduxFormHelper.renderAutoComplete} label="所属试卷" */}
          {/* filter={AutoComplete.fuzzyFilter}  dataSource={testpapersTitles}/> */}
          {/* </div> */}
          <div>
            <Field name='testpaper' component={reduxFormHelper.renderSelectField} label='所属试卷'>
              {testpapersTitles && testpapersTitles.map(
                (testpaperTitle) =>
                  <MenuItem key={testpaperTitle.id} value={testpaperTitle.id} primaryText={testpaperTitle.title} />)
              }
            </Field>
          </div>
          <div>
            <Field name='point' component={reduxFormHelper.renderNumberField} label='分值' />
          </div>
          <div>
            <Field name='serial' component={reduxFormHelper.renderNumberField} label='题号' />
          </div>
        </Dialog>
      </form>
    </div>
  )
}
TestpapersDialogForm = reduxForm({
  form: 'TestpaperDialogForm',
  validate
})(TestpapersDialogForm)

export default TestpapersDialogForm
