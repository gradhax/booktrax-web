import React, { useState, useMemo } from 'react';
import styled from 'styled-components';

import BodyContainer from '@@components/BodyContainer';

const StyledRoot = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  height: 480px;
  width: 320px;
`;

const StyledHeader = styled.div`
  align-items: center;
  background-color: black;
  color: white;
  display: flex;
  font-weight: bold;
  height: 40px;
  justify-content: center;
`;

const BlackBar: React.FC = ({
  label,
}) => {
  return (
    <StyledHeader>
      {label}
    </StyledHeader>
  );
};

const Root = ({

}) => {
  return (
    <StyledRoot>
      123
      <BlackBar label={'Booktrax'} />
      {/* <BodyContainer />
      <BlackBar label={'Gradhax presents'} /> */}
    </StyledRoot>
  );
};

export default Root;
