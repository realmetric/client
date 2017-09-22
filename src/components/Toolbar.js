import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'
import ButtonGroup from './ButtonGroup'
import styled, {css} from 'styled-components'
import {getMetricName, getSliceName} from '../reducers/chart'
import {maxWidth} from '../constants'

const ToolbarSection = styled.section`
  flex: 0 0 30px;
  align-items: center;
  position: relative;
  background-color: hsla(216, 10%, 95%, 1);
  padding: 0 10px;
  display: flex;
  box-shadow: 0 -1px 1px 1px hsla(208, 25%, 1%, 0.55);
  z-index: 10;
  @media (max-width: ${maxWidth}) {
    & {
      display: none;
    }
  }
`
const Title = styled.h1`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.25px;
  line-height: 1;
  padding: 0 10px;
  display: flex;
  align-items: center;
  align-self: stretch;
`
const MetricName = Title.extend`
  color: hsla(220, 13%, 32%, 1);
  background: hsla(220, 12%, 86%, 1);
  margin: 0 0 0 -10px;
`
const SliceName = Title.extend`
  color: hsla(220, 13%, 35%, 1);
  background: hsla(216, 15%, 91%, 1);
  margin: 0;
`

class Toolbar extends Component {
  render() {
    const {metricName, sliceName} = this.props

    return (
      <ToolbarSection>
        {metricName && <MetricName>{metricName}</MetricName>}
        {sliceName && <SliceName>{sliceName}</SliceName>}
        <ButtonGroup
          value={this.props.period}
          buttons={[
            {value: '1D', content: '1D'},
            {value: '1W', content: '1W'},
            {value: '1M', content: '1M'},
            {value: '6M', content: '6M'}
          ]}
          onChange={this.props.updatePeriod}
          style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}
        />
      </ToolbarSection>
    )
  }
}

const mapStateToProps = (state) => ({
  period: state.chart.period,
  metricName: getMetricName(state),
  sliceName: getSliceName(state)
})

export default connect(mapStateToProps, actions)(Toolbar)
