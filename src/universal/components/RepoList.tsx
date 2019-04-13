import axios from 'axios';
import React, { useState, useMemo } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledRepoList = styled.div`
`;

const StyledRepo = styled.div`
  border: 1px solid green;
  height: 45px;
`;

const Repo: React.FC = ({
  repo,
}) => {
  return (
    <StyledRepo>
      <div>
        <span>{repo.timestamp}</span>
      </div>
      <span>{repo.orgName}</span>
      <span>{repo.repoName}</span>
    </StyledRepo>
  );
};

const RepoList = ({
  repos,
}) => {
  const _repos = repos.map((repo, idx) => {
    return (
      <Repo 
        key={idx}
        repo={repo}
      />
    );
  });

  return (
    <StyledRepoList>
      {_repos}
    </StyledRepoList>
  );
};

export default RepoList;