import React from 'react';
import styled from 'styled-components';

import InputPage from '@@components/InputPage';
import { RequestStatus } from '@@components/BodyContainer';

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: scroll;
  padding: 5px;
`;

const Greet = styled.div`
`;

const B = styled.span`
  color: #96156a;
  font-weight: bold;
`;

const Body = ({
  content,
  currChunkIdx,
  handleClickConvert,
  requestStatus,
  socketId,
}) => {
  console.log('currChunkIdx', currChunkIdx);
  return (
    <StyledBody>
      <Greet>
        Hi, there. You are connected to booktrax. Put your text on the bottom and we will create a book for you. <B>{socketId}</B>
      </Greet>
      <InputPage
        handleClickConvert={handleClickConvert}
        requestStatus={requestStatus}
        show={requestStatus !== RequestStatus.INITIATED}
      />
    </StyledBody>
  );
};

export default Body;
