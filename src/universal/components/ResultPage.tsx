import React from 'react';
import styled from 'styled-components';

const HIGHLIGHTED = 'highlighted';

const StyledResultPage = styled.div`
  margin-top: 12px;
`;

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

const Image = styled.div`
  display: flex;
  justify-content: center;
  max-height: 150px;
  overflow: hidden;
  width: 100%;

  > img {
    max-height: 100%;
    object-fit: contain;
    max-width: 100%;
  }
`;

const ResultPage = ({
  content,
  payloadIdx,
  sentenceIdx,
  show,
}) => {
  const gifUrl = content[payloadIdx] && content[payloadIdx].entity.gifUrl;
  return show && (
    <StyledResultPage>
      <Image>
        <img src={gifUrl} alt=""/>
      </Image>
      <ContentArea
        content={content}
        payloadIdx={payloadIdx}
        sentenceIdx={sentenceIdx}
      />
    </StyledResultPage>
  );
};

export default ResultPage;
