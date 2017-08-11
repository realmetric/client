import React from 'react'
import styled from 'styled-components'

const Burger = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: inline-block;
  cursor: pointer;
  transition: all .2s ease-out;
  &:hover {
    .bar {
      background-color: #8791a1;
      transition: all .25s ease-in-out;
    }
    > div {
      transition: all .25s ease-in-out;
      transform: rotate(225deg);
    }
  }
  > div {
    width: 20px;
    transition: all .15s ease-in;
    transform: rotate(45deg);
  }
`
const Bar = styled.div`
  background-color: #b2b9c2;
  height: 2px;
  margin-top: 6px;
  &:nth-child(2) {
    margin-top: -2px;
    transform: rotate(90deg);
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

const HamBurger = ({onClick}) =>
  <Burger>
    <div>
      <Bar className="bar"></Bar>
      <Bar className="bar"></Bar>
    </div>
    <Btn onClick={onClick}>Open Menu</Btn>
  </Burger>

export default HamBurger
