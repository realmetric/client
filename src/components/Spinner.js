import React from 'react'
import styled, {keyframes} from 'styled-components'

const bouncedelay = keyframes` {
  0%, 80%, 100% {
    transform: scale(0);
  } 40% {
    transform: scale(1.0);
  }
}
`
const Spinner = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -30px;
  margin-top: -6px;
  width: 60px;
  text-align: center;

  > div {
    width: 12px;
    height: 12px;
    background-color: #a7b1be;
    border-radius: 100%;
    display: inline-block;
    animation: ${bouncedelay} 0.8s infinite ease-in-out both;
  }

  .bounce1 {
    animation-delay: -0.28s;
  }

  .bounce2 {
    animation-delay: -0.14s;
  }
`
export default (props) =>
  <Spinner>
    <div className="bounce1"></div>
    <div className="bounce2"></div>
    <div className="bounce3"></div>
  </Spinner>

