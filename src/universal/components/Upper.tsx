import React, { useState, useMemo } from 'react';
import { Route, Switch, NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';

const StyledUpper = styled.div`
  align-items: center;
  display: flex;
  height: 30px;
  justify-content: space-between;
  padding: 3px 6px;
`;

const Dropdown = ({
  handleChangeDropdown,
  user,
  users,
}) => {
  const _users = users && users.map((user) => {
    return (
      <option 
        key={user.username}
        value={user.username}
      >
        {user.username}
      </option>
    );
  });
  
  return (
    <select 
      onChange={handleChangeDropdown}
      value={user}
    >
      <option value="default">Select user</option>
      {_users}
    </select>
  );
};

const ButtonGroup = styled.div`
  > span {
    cursor: pointer;
    margin-right: 5px;

    &:hover {
      color: blue;
    }
  }
`;

const Upper = ({
  handleChangeDropdown,
  history,
  user,
  users,
}) => {
  return (
    <StyledUpper>
      <ButtonGroup>
        <span onClick={(e) => history.push('/')}>List</span>
        <span onClick={(e) => history.push('/add')}>Add</span>
      </ButtonGroup>
      <Dropdown
        handleChangeDropdown={handleChangeDropdown}
        user={user}
        users={users}
      />
    </StyledUpper>
  );
};

export default withRouter(Upper);
