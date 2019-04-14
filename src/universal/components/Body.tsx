import React, { useState, useMemo } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import AddRepo from '@@components/AddRepo';
import RepoListContainer from '@@components/RepoListContainer';
import Upper from '@@components/Upper';

const StyledBody = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
`;

const Body = ({
  content,
  didRequest,
  handleClickButton,
}) => {
  console.log('content', content);
  return (
    <StyledBody>
      <div>
        <p>didRequest</p>
        <p>{didRequest ? 'yes' : 'no'}</p>
      </div>
      <button onClick={handleClickButton}>
        button
      </button>
    </StyledBody>
  );
};

export default Body;
