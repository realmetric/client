import React, {Component} from 'react'
import {connect} from 'react-redux'
import {isChartPending, getChartData} from '../reducers/chart'
// import CanvasChart from './CanvasChart'
// import Plotly from './Plotly'
import Highcharts from './Highcharts'
import Spinner from './Spinner'
import styled from 'styled-components'

const ChartSection = styled.section`
  flex: 0 0 30%;
  position: relative;
  background-color: #fafbfd;
  padding: 0;
  display: flex;
`

class Chart extends Component {
  render() {
    const {data, pending, ts} = this.props

    // console.log('data', data)

    return (
      <ChartSection>
        <Highcharts data={data} pending={pending} ts={ts} />
        {pending && <Spinner col="#f00" />}
      </ChartSection>
    )
  }
}

const mapStateToProps = (state) => ({
  data: getChartData(state),
  pending: isChartPending(state),
  ts: state.chart.ts
})

export default connect(mapStateToProps, null)(Chart)

