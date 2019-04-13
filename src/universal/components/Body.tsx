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
  handleChangeDropdown,
  user = 'default',
  users,
}) => {
  return (
    <StyledBody>
      <Upper 
        handleChangeDropdown={handleChangeDropdown}
        user={user}
        users={users}
      />
      <Switch>
        <Route path="/add" component={AddRepo} />
        <Route component={RepoListContainer} />
      </Switch>
    </StyledBody>
  );
};

export default Body;
