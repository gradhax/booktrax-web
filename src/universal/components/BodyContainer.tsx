import React from 'react';
import styled from 'styled-components';

import Axios from '@@modules/Axios';
import Body from '@@components/Body';
import config from '@@src/config';

const BodyContainer = ({
}) => {
  const [ users, setUsers ] = React.useState([]);
  const [ user, setUser ] = React.useState(undefined);

  React.useEffect(
    () => {
      return () => {};
    },
    [],
  );

  const handleChangeDropdown = React.useMemo(() => (e) => {
    console.log('click', e.target.value);
    setUser(e.target.value);
  }, [user]);

  return (
    <Body
      handleChangeDropdown={handleChangeDropdown}
    />
  );
};

export default BodyContainer;
