import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'
import {getSlicesList} from '../reducers/slices'
import Spinner from './Spinner'
import {Section, Categories, Nav, NoData, HBox} from './Presentation'
import Category from './Category'
import {existy} from '../utils'

class Slices extends Component {
  componentDidMount() {
    this.props.fetchSlices()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.metricId !== this.props.metricId) {
      setTimeout(() => this.props.fetchSlices(this.props.metricId), 100)
    }

    if (prevProps.period !== this.props.period) {
      if (existy(this.props.sliceId)) this.props.fetchSlice(this.props.metricId, this.props.sliceId)
    }
  }

  onSliceClick = (slice_id) => {
    const {metricId, sliceId, fetchMetrics, fetchMetric, fetchSlice, resetSlice} = this.props

    if (slice_id === sliceId) {
      resetSlice()
      fetchMetric(metricId)
      return
    }

    if (metricId) {
      fetchSlice(metricId, slice_id)
    } else {
      fetchMetrics({slice_id})
    }
  }

  itemFormatter = (item) => item

  handleCategoryClick = (e) => {
    e.preventDefault()
    const category = e.target.href.match(/(#.*)$/)[1].slice(1)
    document.querySelector('#_' + category).scrollIntoView({
      behavior: 'smooth', block: 'start'
    })
  }

  render() {
    const {slices, sliceId, pending} = this.props
    const categories = Object.keys(slices)

    return (
      <Section>
        {pending && <Spinner />}
        {!pending &&
          (categories.length > 0
            ? <HBox className="slices">
                <Categories>
                  {categories.map(cat =>
                    <Category
                      key={cat}
                      category={cat}
                      categoryItems={slices[cat]}
                      itemFormatter={this.itemFormatter}
                      categoryItemId={sliceId}
                      onMetricClick={this.onSliceClick}
                    />
                  )}
                </Categories>
                <Nav>
                  <ul>{categories.map(cat =>
                    <li key={cat}>
                      <a href={`#${cat}`} onClick={this.handleCategoryClick}>{cat}</a>
                    </li>)}
                  </ul>
                </Nav>
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
  slices: getSlicesList(state),
  pending: state.slices.pending
})

export default connect(mapStateToProps, actions)(Slices)
