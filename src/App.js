import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import * as actions from './actions'
import Chart from './components/Chart'
import Metrics from './components/Metrics'
import Slices from './components/Slices'
import styled from 'styled-components'
import {maxWidth} from './constants'
import {Label} from './components/Presentation'
import qs from 'qs'

const Application = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const Reports = styled.div`
  display: flex;
  flex: 0 0 70%;
  max-height: 70%;
  border-top: 1px solid #bfcdd9;

  @media (max-width: ${maxWidth}) {
    & {
      flex-direction: column;
    }
  }
`
const ApiPromptWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`
const ApiPrompt = styled.div`
  padding: 30px;
  width: 320px;
  background-color: #34495e;
  border-radius: 2px;
  display: flex;
  align-items: center;
  > form {
    flex: 1;
    overflow: hidden;
  }
  input[type="submit"] {
    margin: 30px 0;
    font-size: 14px;
    line-height: 1.5;
    background-color: #3498db;
    color: #fff;
    border: 1px solid #3498db;
    border-radius: 2px;
    width: 100%;
    padding: 5px 10px;
    &:hover {
      background-color: #2980b9;
      cursor: pointer;
    }
    &:focus {
      outline: none;
    }
  }
`
const ApiTitle = styled.h4`
  border-bottom: 1px solid #bdc3c7;
  margin-top: 0;
  padding: 7px 0;
  color: #fff;
  font-weight: 300;
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
`
const Input = styled.input`
  font-size: 14px;
  line-height: 1.5;
  width: 100%;
  border: 1px solid #fff;
  border-radius: 2px;
  padding: 5px 10px;
  &:focus {
    outline: none;
  }
`

class App extends Component {
  componentWillMount() {
    const s = qs.parse(window.location.search.substr(1))
    const api = s.api || null
    this.props.setApi(api)
  }

  componentDidMount() {
    if (this.props.api) {
      this.props.fetchPopularCats(this.props.api)
      this.props.fetchMetrics()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.api !== this.props.api)  {
      this.props.fetchPopularCats(this.props.api)
      this.props.fetchMetrics()
    }
  }

  handleSubmitApiUrl = (e) => {
    e.preventDefault()
    const api = findDOMNode(this.apiInput).value
    window.history.replaceState({}, '', '?api=' + api)
    this.props.setApi(api)
  }

  // TODO: create proper auth
  handleLogin = (e) => {
    e.preventDefault()
    if (this.props.api) {
      const login = findDOMNode(this.loginInput).value
      const pwrd = findDOMNode(this.pwInput).value
      const storage = JSON.parse(localStorage.getItem(this.props.api)) || {}
      localStorage.setItem(this.props.api, JSON.stringify({...storage, auth: login + ':' + pwrd}))
      this.forceUpdate()
    }
  }

  render() {
    const {api, metricId, sliceId} = this.props
    const storage = localStorage.getItem(api)
    let isSavedPwrd
    try {
      isSavedPwrd = storage && JSON.parse(storage).auth
    } catch (e) {}

    return api
      ? (isSavedPwrd
        ? <Application>
            <Chart />
            <Reports>
              <Metrics metricId={metricId} sliceId={sliceId} />
              <Slices metricId={metricId} sliceId={sliceId} />
            </Reports>
          </Application>
        : <Application>
            <ApiPromptWrapper>
              <ApiPrompt>
                <form onSubmit={this.handleLogin}>
                  <ApiTitle>{api.replace(/^https?:\/\//, '')}</ApiTitle>
                  <Label for="login">Your login</Label>
                  <Input ref={r => this.loginInput = r} id="login" name="login" type="text" />
                  <br /><br />
                  <Label for="pwrd">Your password</Label>
                  <Input ref={r => this.pwInput = r} id="pwrd" name="pwrd" type="password" />
                  <input type="submit" value="Go" />
                </form>
              </ApiPrompt>
            </ApiPromptWrapper>
          </Application>
        )
      : <Application>
          <ApiPromptWrapper>
            <ApiPrompt>
              <form onSubmit={this.handleSubmitApiUrl}>
                <Label for="api">Your API url</Label>
                <Input ref={r => this.apiInput = r} id="api" name="api" type="text" />
              </form>
            </ApiPrompt>
          </ApiPromptWrapper>
        </Application>
  }
}

const mapStateToProps = (state) => ({
  api: state.api,
  metricId: state.chart.metricId,
  sliceId: state.chart.sliceId
})

export default connect(mapStateToProps, actions)(App)

