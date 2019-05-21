import React, { useState, useMemo } from 'react';
import styled from 'styled-components';

const StyledSpinner = styled.div`
  align-items: center;
  background-color: #ffffffc7;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const Circle = styled.div`
  opacity: 1;
  position: absolute;
  transition: opacity linear 0.1s;

  &::before {
    animation: 2s linear infinite spinner;
    border: solid 3px #eee;
    border-bottom-color: #bd2d6d;
    border-radius: 50%;
    content: "";
    height: 30px;
    left: 50%;
    opacity: inherit;
    position: absolute;
    top: calc(50% - 15px);
    transform: translate3d(-50%, -50%, 0);
    transform-origin: center;
    width: 30px;
    will-change: transform;
  }

  @keyframes spinner {
    0% {
      transform: translate3d(-50%, -50%, 0) rotate(0deg);
    }
    100% {
      transform: translate3d(-50%, -50%, 0) rotate(360deg);
    }
  }
`;

const Spinner: React.FC<any> = ({
  show,
}) => show
  ? (
    <StyledSpinner>
      <Circle />
    </StyledSpinner>
  )
  : null;

export default Spinner;
