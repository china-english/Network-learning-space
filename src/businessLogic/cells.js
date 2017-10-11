
const {Cell} = require('fixed-data-table-2')

const React = require('react')
const ReactTooltip = require('react-tooltip')

import moment from 'moment'
import * as colors from 'material-ui/styles/colors'

class ColoredCell extends React.PureComponent {
  render () {
    const {important, children} = this.props
    const color = important !== null && important ? colors.red500 : colors.black

    return (
      <div style={{color}}>
        {children}
      </div>
    )
  }
}
module.exports.ColoredCell = ColoredCell

class CollapseCell extends React.PureComponent {
  render () {
    const {data, rowIndex, columnKey, collapsedRows, callback, ...props} = this.props
    return (
      <Cell {...props}>
        <a onClick={() => callback(rowIndex)}>
          {collapsedRows.has(rowIndex) ? '\u25BC' : '\u25BA'}
        </a>
      </Cell>
    )
  }
}
module.exports.CollapseCell = CollapseCell

class TooltipCell extends React.PureComponent {
  render () {
    const {data, children, rowIndex, columnKey, ...props} = this.props
    return (
      <Cell
        {...props}
        onMouseEnter={() => { ReactTooltip.show() }}
        onMouseLeave={() => { ReactTooltip.hide() }}>
        <div ref='valueDiv' data-tip={children}>
          {children}
        </div>
      </Cell>
    )
  }
}
module.exports.TooltipCell = TooltipCell

class MultiDataTooltipCell extends React.PureComponent {
  //
  render () {
    const {data, label, sortIndex, rowIndex, columnKey, ...props} = this.props

    const sortedData = data.sort((a, b) => moment(a[sortIndex]) > moment(b[sortIndex]))
    const value = sortedData.length > 0 ? sortedData[sortedData.length - 1][label] : ''
    const tooltipValue = (sortedData.reduce((a, x) => a = a + '；' + x[label], '')).substr(1)
    return (
      <Cell
        {...props}
        onMouseEnter={() => { ReactTooltip.show() }}
        onMouseLeave={() => { ReactTooltip.hide() }}>
        <div ref='valueDiv' data-tip={tooltipValue}>
          {value}
        </div>
      </Cell>
    )
  }
}
module.exports.MultiDataTooltipCell = MultiDataTooltipCell

class MultiCascadeDataCell extends React.PureComponent {
  //
  render () {
    const {data, lv1Label, lv2Label, sortIndex, rowIndex, columnKey, ...props} = this.props

    const sortedData = data.sort((a, b) => moment(a[sortIndex]) > moment(b[sortIndex]))
    const value = (sortedData.reduce((a, x) => a = a + '，' + x[lv1Label][lv2Label], '')).substr(1)
    return (
      <Cell
        {...props}>
        <div>
          {value}
        </div>
      </Cell>
    )
  }
}
module.exports.MultiCascadeDataCell = MultiCascadeDataCell
