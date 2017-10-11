import React from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import AutoComplete from 'material-ui/AutoComplete'
import Checkbox from 'material-ui/Checkbox'
import Moment from 'moment'
// import DatePicker from 'material-ui/DatePicker';
// import TimePicker from 'material-ui/TimePicker';
// import DateTimeField from "react-bootstrap-datetimepicker";

export const assembleDatetimeWithTime = (datetime, time) => {
  datetime.setHours(Moment(time).hour())
  datetime.setMinutes(Moment(time).minute())
  datetime.setSeconds(0)
  return datetime
}

export const momentToDate = (datetime) => {
  if (datetime == null || datetime == undefined) {
    return null
  }
  return Moment(datetime).toDate()
}

export const isEmpty = (field) => {
  return field === null || field === undefined || field === ''
}

export const renderTextField = ({ input, multiLine, label, hintText, readOnly, meta: { touched, error } }) => (
  <TextField label={label}
    multiLine={multiLine}
    hintText={hintText}
    fullWidth
    disabled={readOnly}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
  />
)
export const renderSelectField = ({ input, hintText, label, meta: { touched, error }, children }) => (
  <SelectField
    fullWidth
    hintText={hintText}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children} />
)
export const renderNumberField = ({ input, label, meta: { touched, error } }) => (
  <TextField hintText={label}
    fullWidth
    type='number'
    min='0'
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
  />
)
export const renderCheckbox = ({ input, label }) => (
  <Checkbox label={label}
    labelPosition='left'
    checked={!input.value}
    onCheck={input.onChange} />
)
export const renderTextAreaField = ({ input, multiLine, label, hintText, meta: { touched, error } }) => (
  <TextField label={label}
    multiLine={multiLine}
    hintText={hintText}
    fullWidth
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
  />
)
export const renderFileField = ({ input, label, hintText, meta: { touched, error } }) => (
  <TextField label={label}
    type='file'
    hintText={hintText}
    fullWidth
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
  />
)

export const renderAutoComplete = ({ input, label, filter, hintText, dataSource, dataSourceConfig, handleUpdateInput, meta: { touched, error } }) => (
  <AutoComplete label={label}
    hintText={hintText}
    fullWidth
    animated
    // searchText={value}
    floatingLabelText={label}
    errorText={touched && error}
    dataSource={dataSource}
    filter={filter}
    dataSourceConfig={dataSourceConfig}
    onUpdateInput={handleUpdateInput}
    {...input}
  />
)

// export const renderDateField = ({input, label, meta: {touched, error}}) => (
//   <DatePicker
//     fullWidth={true}
//     floatingLabelText={label}
//     errorText={touched && error}
//     {...input}
//     onChange={(event, date) => input.onChange(date)}
//   />
// );
//
// const renderDatetimeField = ({input, label, meta: {touched, error}}) => (
//   <TimePicker
//     format="24hr"
//     fullWidth={true}
//     floatingLabelText={label}
//     errorText={touched && error}
//     {...input}
//     onChange={(event, index) => input.onChange(index)}
//   />
//    <DateTimeField
//     inputFormat="YYYY-MM-DD"
//     floatingLabelText={label}
//     viewMode="date"
//     errorText={touched && error}
//     {...input}
//     onChange={(event, date) => input.onChange(date)}/>
// );
