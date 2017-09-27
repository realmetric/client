import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'
import {getMetricsList} from '../reducers/metrics'
import Spinner from './Spinner'
import {Section, Categories, Nav, NoData, HBox} from './Presentation'
import Category from './Category'

class Metrics extends Component {
  componentDidMount() {
    this.props.fetchMetrics()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.period !== this.props.period) {
      this.props.fetchMetric(this.props.metricId)
    }
  }

  onMetricClick = (metric_id) => {
    const {
      metricId, sliceId, fetchSlice, fetchMetrics,
      fetchMetric, resetChart, resetMetric, resetSlice
    } = this.props

    if (metric_id === metricId) {
      resetMetric()
      resetSlice()
      resetChart()
      fetchMetrics()
      return
    }

    if (metric_id && sliceId) {
      fetchSlice(metric_id, sliceId)
    } else {
      fetchMetric(metric_id)
    }
  }

  itemFormatter = (item) => item.indexOf('.') !== -1 ? item.slice(item.indexOf('.') + 1) : item

  handleCategoryClick = (e) => {
    e.preventDefault()
    const category = e.target.href.match(/(#.*)$/)[1].slice(1)
    this.props.categoryClick(category)
    document.querySelector('#_' + category).scrollIntoView({behavior: 'smooth'})
  }

  handlePopularItmClick = (e) => {
    e.preventDefault()
    const category = e.target.href.match(/(#.*)$/)[1].slice(1)
    document.querySelector('#_' + category).scrollIntoView({behavior: 'smooth'})
  }

  renderPopularCats() {
    const {popularCats} = this.props
    return (
      popularCats && Object.keys(popularCats).length > 0
        ? <ul className="popularItems">
            {Object.keys(popularCats).sort((a, b) => popularCats[b] - popularCats[a]).slice(0, 6).map(cat =>
              <li key={cat}>
                <a href={`#${cat}`} onClick={this.handlePopularItmClick}>{cat}</a>
              </li>
            )}
          </ul>
        : null
    )
  }

  render() {
    const {metrics, metricId, pending} = this.props
    const categories = Object.keys(metrics)

    return (
      <Section>
        {pending && <Spinner />}
        {!pending &&
          (categories.length > 0
            ? <HBox>
                <Nav style={{display: 'flex', flexDirection: 'column'}}>
                  {this.renderPopularCats()}
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
  period: state.chart.period,
  intervalType: state.chart.intervalType,
  pending: state.metrics.pending,
  popularCats: state.metrics.popularCats,
  metrics: getMetricsList(state)
})

export default connect(mapStateToProps, actions)(Metrics)
