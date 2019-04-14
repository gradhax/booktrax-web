import React from 'react';
import styled from 'styled-components';

const HIGHLIGHTED = 'highlighted';

const StyledResultPage = styled.div``;

const Paragraph = styled.div`
  margin-bottom: 13px;
`

const StyledContentArea = styled.div`
  font-family: 'Courier', 'Times New Roman';
  line-height: 1.3;
  margin-top: 12px;
  text-align: justify;

  span {
  }

  .${HIGHLIGHTED} {
    background-color: #ffffb3;
  }
`;

const ContentArea = ({
  content,
  payloadIdx,
  sentenceIdx,
}) => {
   const paragraphs = content.map((payload, pId) => {
    const sentences = payload.analyze.sentences;
    const _sentences = sentences.map(({ text }, sId) => {
      return (
        <span
          className={
            (pId === payloadIdx)
            && (sId === sentenceIdx)
              ? HIGHLIGHTED
              : ''
          }
          key={`${pId}-${sId}`}
        >
          {text.content}
        </span>
      );
    });
    return (
      <Paragraph key={pId}>
        {_sentences}
      </Paragraph>
    );
  });

  return (
    <StyledContentArea>
      {paragraphs}
    </StyledContentArea>
  );
};

const ResultPage = ({
  content,
  payloadIdx,
  sentenceIdx,
  show,
}) => {
  return show && (
    <StyledResultPage>
      <ContentArea
        content={content}
        payloadIdx={payloadIdx}
        sentenceIdx={sentenceIdx}
      />
    </StyledResultPage>
  );
};

export default ResultPage;
