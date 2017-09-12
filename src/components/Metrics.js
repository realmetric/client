import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'
import {getMetricsList} from '../reducers/metrics'
import Spinner from './Spinner'
import {Section, Categories, Nav, NoData, HBox} from './Presentation'
import Category from './Category'
import BurgerMenu from './BurgerMenu'

class Metrics extends Component {

  onMetricClick = (metric_id) => {
    const {metricId, sliceId, fetchSlice, fetchMetric, fetchMetrics, resetChart, resetMetric, resetSlice} = this.props
    if (metric_id && sliceId)  {
      // console.log('metric_id, metricId', metric_id, metricId)
      if (metric_id === metricId) {
        resetMetric()
        resetSlice()
        resetChart()
        fetchMetrics()
      } else {
        fetchSlice({metric_id, slice_id: sliceId})
      }
    } else {
      fetchMetric(metric_id)
    }
  }

  itemFormatter = (item) => item.indexOf('.') !== -1 ? item.slice(item.indexOf('.') + 1) : item

  render() {
    const {metrics, metricId, pending} = this.props
    const categories = Object.keys(metrics)

    // console.log('metricId', metricId)

    return (
      <Section>
        {pending && <Spinner />}
        {!pending &&
          (categories.length > 0
            ? <HBox>
                <Nav>
                  <ul>{categories.map(cat =>
                    <li key={cat}>
                      <a href={`#${cat}`} onClick={this.handleCategoryClick}>{cat}</a>
                    </li>)}
                  </ul>
                </Nav>
                <Categories>
                  {categories.map(cat =>
                    <Category
                      key={cat}
                      category={cat}
                      categoryItems={metrics[cat]}
                      itemFormatter={this.itemFormatter}
                      categoryItemId={metricId}
                      onMetricClick={this.onMetricClick}
                    />
                  )}
                </Categories>
              </HBox>
            : <NoData>no data</NoData>
          )
        }
      </Section>
    )
  }
}

const mapStateToProps = (state) => ({
  pending: state.metrics.pending,
  metrics: getMetricsList(state)
})

export default connect(mapStateToProps, actions)(Metrics)
