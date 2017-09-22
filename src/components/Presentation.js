import React from 'react'
import styled from 'styled-components'
import {maxWidth} from '../constants'
// import {darken, lighten} from 'polished'

export const Section = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  background: #eceff3;
  overflow: hidden;
  & + & {
    border-left: 1px solid #bfcdd9;
  }
  > .react-tabs {
    margin: 5px 25px 0 25px;
  }

  @media (max-width: ${maxWidth}) {
    & + & {
      border-left: none;
      border-top: 1px solid #bfcdd9;
    }
  }
`
export const Categories = styled.ul`
  flex: 1;
  padding: 0;
  margin: 0;
  overflow: auto;
`
export const Category = styled.li`
  list-style: none;
  margin: 0 20px;

  &:first-child {
    margin-top: 0;
  }

  @media (max-width: ${maxWidth}) {
    & {
      margin: 15px;
    }
  }
`
export const H4 = styled.h4`
  padding: 15px 0 0 0;
  margin: 0;
  color: #697586;
  font-size: 18px;
  font-weight: 300;
  text-transform: uppercase;
  position: relative;

  > span {
    position: relative;
    background: #eceff3;
    z-index: 1;
    padding-right: 7px;
  }
`
export const CategoryTitle = ({id, children}) =>
  <H4 id={id}><span>{children}</span></H4>

export const MetricsList = styled.ul`
  flex: 1;
  padding: 15px 0 0;
  margin: 0 -10px;
  overflow: auto;
`
export const Metric = styled.li`
  cursor: pointer;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: calc(50% - 20px);
  margin: 10px;
  border-radius: 1px;
  background: #d9dde3;

  &.active > div:nth-child(1) {
    background: #acb0b7;
    color: #000;
    transition: all .1s ease-in;
  }
  > div:nth-child(1) {
    padding: 10px 10px 10px 13px;
    color: #485261;
    background-color: #d9dde3;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    transition: all 0.15s;
  }
`

const bgs = [
  '#FF5722',
  '#d32f2f',
  '#1976D2',
  '#00897B',
  '#689F38'
]
const fgs = [
  '#eee',
  '#eee',
  '#eee',
  '#eee',
  '#eee'
]

export const Total = styled.div`
  padding: 10px 8px 10px 5px;
  font-weight: 500;
  min-width: 72px;
  text-align: right;
  border-left: 1px solid #e2e5e9;
  background-color: ${props =>
    props.diff <= -50 ? bgs[0] :
    props.diff <= -10 ? bgs[1] :
    props.diff <= 10 ? bgs[2] :
    props.diff <= 50 ? bgs[3] :
    bgs[4]
  };
  color: ${props =>
    props.diff <= -50 ? fgs[0] :
    props.diff <= -10 ? fgs[1] :
    props.diff <= 10 ? fgs[2] :
    props.diff <= 50 ? fgs[3] :
    fgs[4]
  };
`
export const NoData = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  top: 50%;
  margin-top: -8px;
  text-transform: uppercase;
  color: #a7b1be;
`
export const Head = styled.header`
  padding: 15px 30px;
  z-index: 5;
`
export const Nav = styled.nav`
  width: 135px;
  display: flex;
  border-left: 1px solid #bfcdd9;
  border-right: 1px solid #bfcdd9;

  .popularItems {
    flex: initial;
    padding-bottom: 7px;
    margin-bottom: 3px;
    border-bottom: 1px solid #bfcdd9;
  }

  ul {
    flex: 1;
    overflow: auto;
    margin: 0 0 0 0;
    padding: 0;
  }
  li {
    list-style: none;
    a {
      display: block;
      padding: 7px 15px;
      color: #404040;
      text-decoration: none;
      &:hover {
        background-color: #f0f8fe;
        color: #2496f9;
      }
    }
  }
  &.active {
    transform: translateX(0);
    transition: all 0.3s cubic-bezier(0.05, 0.9, 0.3, 1.04);
  }
`
export const Plot = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transition: opacity 0.2s;
  &.pending {
    opacity: 0.2;
  }
`
export const Label = styled.label`
  display: block;
  font-size: 11px;
  text-transform: uppercase;
  margin-bottom: 3px;
  color: #ecf0f1;
  letter-spacing: 0.5px;
`
export const HBox = styled.div`
  display: flex;
  flex: 1;
  @media (max-width: ${maxWidth}) {
    &.slices {
      flex-direction: row-reverse;
    }
  }
`
