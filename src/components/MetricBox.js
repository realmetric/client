import React, {Component} from 'react'
import {Metric, Total} from './Presentation'

class MetricBox extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.active !== nextProps.active
  }

  render() {
    const {category, name, total, diff, active, onClick} = this.props

    return (
      <Metric
        className={active ? 'active' : ''}
        onClick={onClick}
      >
        {/*<div>{category}</div>*/}
        <div>{name}</div>
        {total &&
          <Total diff={diff} title={diff && diff.toFixed(2) + '%'}>
            {total.toLocaleString()}
          </Total>
        }
      </Metric>
    )
  }
}

export default MetricBox
