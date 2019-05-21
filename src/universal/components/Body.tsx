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

const ButtonGroup = styled.div`
  align-items: center;
  display: flex;
  font-size: 16px;
  justify-content: center;
  margin: 5px 0;

  span {
    cursor: pointer;
    text-decoration: underline;
    &:hover {
      font-weight: bold;
    }
    &:not(:last-child) {
      margin-right: 12px;
    }
  }
`;

const Body = ({
  content,
  handleClickConvert,
  handleClickStop,
  handlePlayNextPayload,
  payloadIdx,
  requestStatus,
  sentenceIdx,
  socketId,
}) => {
  const [ prevPayloadIdx, setPrevPayloadIdx ] = React.useState(null);
  if (prevPayloadIdx !== payloadIdx) {
    const analyze = content[payloadIdx] && content[payloadIdx].analyze;
    if (analyze) {
      const score = analyze.documentSentiment.score;
      handlePlayNextPayload(score);
    }
    setPrevPayloadIdx(payloadIdx);
  }

  return (
    <StyledBody>
      <Greet>
        Hi, there. Welcome to booktrax.
        Put your text on the bottom and we will create a book for you.
        Stop will reload the page. (state is lost)
        You are connected as <B>{socketId}</B>
      </Greet>
      <ButtonGroup>
        <span onClick={handleClickConvert}>Play</span>
        <span onClick={handleClickStop}>Stop</span>
      </ButtonGroup>
      <InputPage
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
