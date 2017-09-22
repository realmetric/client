import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Button = styled.button`
  border: none;
  background: transparent;
  color: #485261;
  cursor: pointer;
  border-radius: 3px;
  padding: 3px 15px;
  font-size: 12px;
  margin: 0 1px 0 0;
  transition: all 0.15s;

  &:active {
    background: #dddfe4;
    outline: none;
  }
  &:focus {
    outline: none;
  }
  &.selected {
    background: #1976d2;
    color: #fff;
    transition: all 0.15s;
    cursor: default;
  }
`

class ButtonGroup extends Component {
  static propTypes = {
    value: PropTypes.any,
    buttons: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.any.isRequired,
      content: PropTypes.node,
      title: PropTypes.string
    })).isRequired,
    onChange: PropTypes.func.isRequired,
    allowEmpty: PropTypes.bool
  }

  defaultProps = {
    style: {}
  }

  state = {value: null, allowEmpty: true}

  focus() {
    ReactDOM.findDOMNode(this).focus()
    return true
  }

  toggleSelect(newValue) {
    const value = this.props.value

    if (this.props.allowEmpty) {
      // Select the new button or unselect if it's already selected
      this.props.onChange(value !== newValue ? newValue : null)
    } else {
      this.props.onChange(newValue)
    }
  }

  render() {
    const {style} = this.props
    const value = this.props.value
    const buttons = this.props.buttons.map((button, i) =>
      <Button title={button.title}
        type="button"
        id={"" + i}
        ref={"button" + i}
        key={"" + i}
        className={button.value === value ? 'selected' : ''}
        onClick={this.toggleSelect.bind(this, button.value)}
        >
          {button.content || "" + button.value}
      </Button>
    )

    return <div style={{display: 'inline-block', ...style}}>{buttons}</div>
  }
}

export default ButtonGroup
