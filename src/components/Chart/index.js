import React, {Component} from 'react'
import {connect} from 'react-redux'
import {isChartPending, getChartData} from '../../reducers/chart'
import ChartArea from './ChartArea'
import ChartColumns from './ChartColumns'
import Spinner from '../Spinner'
import styled from 'styled-components'

const ChartSection = styled.section`
  flex: 0 0 calc(35% - 30px);
  position: relative;
  background-color: #fafbfd;
  padding: 0;
  display: flex;
`

class Chart extends Component {
  render() {
    const {data, period, pending, ts} = this.props

    return (
      <ChartSection>
        {period === '1D' &&
          <ChartColumns data={data} pending={pending} ts={ts} />
        }
        {(period === '1W' ||
          period === '1M' ||
          period === '6M'
          ) &&
          <ChartArea data={data} pending={pending} ts={ts} />
        }
        {pending && <Spinner col="#f00" />}
      </ChartSection>
    )
  }
}

const mapStateToProps = (state) => ({
  period: state.chart.period,
  data: getChartData(state),
  pending: isChartPending(state),
  ts: state.chart.ts
})

export default connect(mapStateToProps, null)(Chart)

