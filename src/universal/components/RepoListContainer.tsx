import axios from 'axios';
import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import Axios from '@@modules/Axios';
import config from '@@src/config';
import RepoList from '@@components/RepoList'

const RepoListContainer = ({
}) => {
  const [ repos, setRepos ] = React.useState([]);

  React.useEffect(() => {
    Axios.post(`${config.dbEndPoint}/git/repos`, {})
      .then(({ data }) => {
        setRepos(data.repos);
      });
    return () => {};
  }, []);

  return (
    <RepoList
      repos={repos
    }/>
  );
};

export default RepoListContainer;
