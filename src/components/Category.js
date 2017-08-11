import React, {Component} from 'react'
import {CategoryTitle, MetricsList, Category} from './Presentation'
import MetricBox from './MetricBox'

class MetricCategory extends Component {
  render() {
    const {
      category, categoryItems = [], categoryItemId, itemFormatter, onMetricClick
    } = this.props

    return (
      <Category>
        <CategoryTitle id={category}>{category}</CategoryTitle>
        <MetricsList>
          {categoryItems.map(item =>
            <MetricBox
              key={item.id}
              category={category}
              name={itemFormatter(item.name)}
              total={item.total}
              diff={item.diff}
              active={categoryItemId === item.id}
              onClick={() => onMetricClick(item.id)}
            />
          )}
        </MetricsList>
      </Category>
    )
  }
}

export default MetricCategory
