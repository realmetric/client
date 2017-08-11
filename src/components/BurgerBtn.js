import React from 'react'
import styled from 'styled-components'

const Burger = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  transition: all .2s ease-out;
  opacity: ${props => props.hidden ? 0 : 1};
  &:hover .bar {
    background-color: #8791a1;
    transition: all .15s ease-in;
  }
  > div {
    width: 20px;
  }
`
const Bar = styled.div`
  background-color: #b2b9c2;
  height: 2px;
  &:nth-child(2) {
    margin-top: 3px;
  }
  &:nth-child(3) {
    margin-top: 3px;
  }
`
const Btn = styled.button`
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: none;
  opacity: 0;
  font-size: 8px;
`

const HamBurger = ({hidden, onClick}) =>
  <Burger hidden={hidden}>
    <div>
      <Bar className="bar"></Bar>
      <Bar className="bar"></Bar>
      <Bar className="bar"></Bar>
    </div>
    <Btn onClick={onClick}>Open Menu</Btn>
  </Burger>

export default HamBurger
