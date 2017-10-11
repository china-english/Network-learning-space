import React, {PropTypes} from 'react'

import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

const TestpaperDropDownMenu = (props) => (
  <DropDownMenu value={props.defaultSelected} onChange={props.handleChangeElement}>
    {props.elements && props.elements.map(element =>
      <MenuItem value={element.id} key={element.id} primaryText={element.name} />
      )}
  </DropDownMenu>
)

TestpaperDropDownMenu.propTypes = {
  handleChangeElement: PropTypes.func.isRequired,
  defaultSelected: PropTypes.string,
  elements: PropTypes.array.isRequired
}

export default TestpaperDropDownMenu
