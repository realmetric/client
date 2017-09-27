import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'
import ButtonGroup from './ButtonGroup'
import styled from 'styled-components'
import {getMetricName, getSliceName} from '../reducers/chart'
import {maxWidth} from '../constants'

const ToolbarSection = styled.section`
  flex: 0 0 30px;
  align-items: center;
  position: relative;
  background-color: hsla(216, 10%, 95%, 1);
  padding: 0 10px;
  display: flex;
  /*box-shadow: 0 -1px 1px 1px hsla(208, 25%, 1%, 0.55);*/
  border-bottom: 1px solid hsla(208, 25%, 83%, 1);
  z-index: 10;

  > h1, > h2 {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.25px;
    line-height: 1;
    padding: 0 10px;
    display: flex;
    align-items: center;
    align-self: stretch;

    color: hsl(218, 14%, 21%);
    background: hsl(220, 12%, 88%);
    margin: 0 0 0 -10px;
  }

  > h2 {
    color: hsl(218, 14%, 21%);
    background: hsl(216, 15%, 92%);
    margin: 0;
  }

  @media (max-width: ${maxWidth}) {
    & {
      display: none;
    }
  }
`

class Toolbar extends Component {
  render() {
    const {metricName, sliceName} = this.props

    return (
      <ToolbarSection>
        {metricName && <h1>{metricName}</h1>}
        {sliceName && <h2>{sliceName}</h2>}
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
