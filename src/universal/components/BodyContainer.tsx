import React from 'react';
import styled from 'styled-components';

import Axios from '@@modules/Axios';
import Body from '@@components/Body';
import config from '@@src/config';
import { getSocket } from '@@modules/socket';

const BodyContainer = ({
}) => {
  const [ didRequest, setDidRequest ] = React.useState(false);

  React.useEffect(
    () => {
      return () => {};
    },
    [],
  );

  const handleClickButton = React.useCallback((e) => {
    console.log('click', e);
    const socket = getSocket();
    socket.emit('request-analyze', 'long_text');
    setDidRequest(true);
  }, [ didRequest ]);

  return (
    <Body
      didRequest={didRequest}
      handleClickButton={handleClickButton}
    />
  );
};

export default BodyContainer;
