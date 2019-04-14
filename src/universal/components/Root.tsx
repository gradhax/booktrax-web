import React, { useState, useMemo } from 'react';
import styled from 'styled-components';

import BodyContainer from '@@components/BodyContainer';

const StyledRoot = styled.div`
  box-shadow: 0px 0px 5px 2px #333333bf;
  display: flex;
  flex-direction: column;
  height: 568px;
  width: 320px;
`;

const StyledBar = styled.div`
  align-items: center;
  background-image: repeating-linear-gradient(-45deg, transparent, transparent 1em, #9E2053 1em, #9E2053 50%), repeating-linear-gradient(45deg, #111626, #111626 1em, #571B3D 1em, #571B3D 50%);
  background-size: 3em 3em, 2em 2em;
  color: white;
  display: flex;
  font-size: 18px;
  font-weight: bold;
  height: 40px;
  justify-content: center;
  letter-spacing: 0.1em;
`;

const Bar: React.FC = ({
  label,
}) => {
  return (
    <StyledBar>
      {label}
    </StyledBar>
  );
};

const Root = ({
  socketId,
}) => {
  return (
    <StyledRoot>
      <Bar label={'Booktrax'} />
      <BodyContainer
        socketId={socketId}
      />
      <Bar label={'Gradhax presents'} />
    </StyledRoot>
  );
};

export default Root;
