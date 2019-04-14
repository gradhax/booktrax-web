import React from 'react';
import styled from 'styled-components';

import InputPage from '@@components/InputPage';
import { RequestStatus } from '@@components/BodyContainer';
import ResultPage from '@@components/ResultPage'

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: scroll;
  padding: 5px 7px;
`;

const Greet = styled.div`
`;

const B = styled.span`
  color: #96156a;
  font-weight: bold;
`;

const Body = ({
  content,
  handleClickConvert,
  payloadIdx,
  requestStatus,
  sentenceIdx,
  socketId,
}) => {
  return (
    <StyledBody>
      <Greet>
        Hi, there. Welcome to booktrax.
        Put your text on the bottom and we will create a book for you.
        You are connected as <B>{socketId}</B>
      </Greet>
      <InputPage
        handleClickConvert={handleClickConvert}
        requestStatus={requestStatus}
        show={requestStatus !== RequestStatus.INITIATED}
      />
      <ResultPage
        content={content}
        payloadIdx={payloadIdx}
        sentenceIdx={sentenceIdx}
        show={requestStatus === RequestStatus.INITIATED}
      />
    </StyledBody>
  );
};

export default Body;
