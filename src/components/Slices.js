import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'
import {getSlicesList} from '../reducers/slices'
import Spinner from './Spinner'
import {Section, Categories} from './Presentation'
import Category from './Category'
import BurgerMenu from './BurgerMenu'

class Slices extends Component {
  componentDidMount() {
    this.props.fetchSlices()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.metricId !== this.props.metricId) {
      setTimeout(() => this.props.fetchSlices(this.props.metricId), 100)
    }
  }

  onSliceClick = (slice_id) => {
    const {metricId, fetchSlice, fetchMetrics} = this.props
    if (metricId)  {
      fetchSlice({metric_id: metricId, slice_id})
    } else {
      fetchMetrics({slice_id})
    }
  }

  itemFormatter = (item) => item

  render() {
    const {slices, sliceId, pending} = this.props
    const categories = Object.keys(slices)

    return (
      <Section>
        <BurgerMenu categories={categories} />
        {pending && <Spinner />}
        {!pending && categories.length > 0 &&
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
        }
      </Section>
    )
  }
}

const mapStateToProps = (state) => ({
  slices: getSlicesList(state),
  pending: state.slices.pending
})

export default connect(mapStateToProps, actions)(Slices)