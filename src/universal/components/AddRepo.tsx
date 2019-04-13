import React, { useState, useMemo } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import Axios from '@@modules/Axios';
import config from '@@src/config';

const StyledAddRepo = styled.div`
  padding: 3px 6px;

  input, textarea {
    background-color: #efefef;
    border-radius: 3px;
    padding: 6px 4px;
    width: 100%;
  }

  input {
    background-color: #efefef;
    height: 30px;
    margin-bottom: 10px;
  }

  textarea {
    border: none;
    height: 180px;
    resize: none;
  }
`;

const Button = styled.p``;

const AddRepo = () => {
  const handleClickSubmit = React.useMemo(() => (e) => {
    Axios.post(`${config.dbEndPoint}/git/newRepo`)
      .then(({ data }) => {
        
      });
    return () => {};
  }, []);

  return (
    <StyledAddRepo>
      <input 
        placeholder="Title"
        type="text" 
      />
      <textarea
        placeholder="Content"
        resize="none"
      />
      <Button
        onClick={handleClickSubmit}
      >
        Submit
      </Button>
    </StyledAddRepo>
  );
};

export default AddRepo;
