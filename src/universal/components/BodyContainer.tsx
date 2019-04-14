import React from 'react';
import styled from 'styled-components';

import Body from '@@components/Body';
import config from '@@src/config';
import { getSocket } from '@@modules/socket';

const AUDIO_COMMON_PATH = 'https://s3-us-west-1.amazonaws.com/gradhax-booktrax';
export const TEXTAREA_REF = 'booktrax-textarea';

export enum RequestStatus {
  UNINITIATED = 'UNINITIATED',
  IN_PROGRESS = 'IN_PROGRESS',
  INITIATED = 'INITIATED',
};

const BodyContainer = ({
  socketId,
}) => {
  const [ requestStatus, setRequestStatus ] = React.useState(RequestStatus.UNINITIATED);
  const [ content, setContent ] = React.useState([]);
  const [
    { payloadIdx, sentenceIdx },
    setCurrChunkIdx,
  ] = React.useState({});
  const [ tracks, setTracks ] = React.useState([]);
  const [ currTrackIdx, setCurrTrackIdx ] = React.useState(null);

  React.useEffect(
    () => {
      const tracks = [];
      tracks['1'] = new Audio(`${AUDIO_COMMON_PATH}/1.mp3`);
      tracks['2'] = new Audio(`${AUDIO_COMMON_PATH}/2.mp3`);
      tracks['4'] = new Audio(`${AUDIO_COMMON_PATH}/4.mp3`);
      tracks['5'] = new Audio(`${AUDIO_COMMON_PATH}/5.mp3`);
      setTracks(tracks);

      return () => {};
    },
    [],
  );

  const handlePlayNextPayload = React.useCallback((score) => {
    console.log('next payload, score: %s, currTrackIdx: %s', score, currTrackIdx);

    const prevTrackIdx = currTrackIdx;
    if (-score <= -0.6) {
      prevTrackIdx && tracks[prevTrackIdx].pause();
      tracks['1'].play();
      setCurrTrackIdx('1');
    } else if (-0.6 <= score && score <= -0.2) {
      prevTrackIdx && tracks[prevTrackIdx].pause();
      tracks['2'].play();
      setCurrTrackIdx('2');
    } else if (-0.2 <= score && score <= 0.2) {
      prevTrackIdx && tracks[prevTrackIdx].pause();
      setCurrTrackIdx(null);
    } else if (0.2 <= score && score <= 0.6) {
      prevTrackIdx && tracks[prevTrackIdx].pause();
      tracks['4'].play();
      setCurrTrackIdx('4');
    } else if (0.6 <= score) {
      prevTrackIdx && tracks[prevTrackIdx].pause();
      tracks['5'].play();
      setCurrTrackIdx('5');
    }
  }, [ tracks ]);

  const handlePlayNext = React.useCallback(({
    payloadIdx,
    sentenceIdx,
  }) => {
    setCurrChunkIdx({
      payloadIdx,
      sentenceIdx,
    });
  }, [ content, tracks ]);

  const handleClickConvert = React.useCallback((e) => {
    console.log('handleClickButton()');

    const text = (document.getElementById(TEXTAREA_REF) as any).value;
    setRequestStatus(true);
    bootstrapAnalyzeHandler({
      handleChangeRequestStatus: setRequestStatus,
      handlePlayNext,
      handleReceiveContent: setContent,
      text,
    });
  }, [ requestStatus ]);

  return (
    <Body
      content={content}
      handleClickConvert={handleClickConvert}
      handlePlayNextPayload={handlePlayNextPayload}
      payloadIdx={payloadIdx}
      requestStatus={requestStatus}
      sentenceIdx={sentenceIdx}
      socketId={socketId}
    />
  );
};

export default BodyContainer;

function bootstrapAnalyzeHandler({
  handleChangeRequestStatus,
  handlePlayNext,
  handleReceiveContent,
  text,
}) {
  const content: any[] = [];
  const socket = getSocket();
  const context = new AudioContext();
  let queue: {
    buffer;
    payloadIdx;
    sentenceIdx;
  }[] = [];
  let isPlaying = false;
  const play = (handlePlayNext) => {
    const {
      buffer,
      sentenceIdx,
      payloadIdx,
    } = queue.shift() as any;
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);

    console.log('[audio] play, pId: %s, sId: %s', payloadIdx, sentenceIdx);

    handlePlayNext({
      payloadIdx,
      sentenceIdx,
    });
    source.start();
    isPlaying = true;

    if (queue.length) {
      console.log('[audio] schedule next buffer to play');
      setTimeout(() => {
        play(handlePlayNext);
      }, buffer.duration * 1000);
    } else {
      console.log('[audio] queue is empty. schedule to finish');
      setTimeout(() => {
        isPlaying = false;
      }, buffer.duration * 1000);
    }
  }

  handleChangeRequestStatus(RequestStatus.IN_PROGRESS);
  socket.emit('request-analyze', text);

  socket.on('response-analyze', (data: Element, done) => {
    const {
      analyze,
      entity,
      payloadIdx,
      voices,
    } = data;
    console.log('[socket] response-analyze payloadIdx: %s', payloadIdx);

    content.push({
      analyze,
      entity,
    });
    handleReceiveContent([ ...content ]);

    if (voices.length) {
      console.log('[audio] response-analyze, voice of length: %s', voices.length);
      (async () => {
        for (let [ sentenceIdx, voice ] of voices.entries()) {
          const audioStream = voice.data.AudioStream;
          const buffer = await context.decodeAudioData(audioStream);
          console.log('[audio] decode buffer complete, pId: %s, sId', payloadIdx, sentenceIdx);
          queue.push({
            payloadIdx,
            sentenceIdx,
            buffer,
          });

          if (sentenceIdx === voices.length - 1) {
            if (!isPlaying) {
              // at the very onstart
              handleChangeRequestStatus(RequestStatus.INITIATED);
              play(handlePlayNext);
            }
            done();
          }
        }
      })();
    }
  });
}

interface Element {
  analyze: {
    documentSentiment: Sentiment;
    sentences: {
      sentiment: Sentiment;
      text: {
        $requestId;
        content;
        beginOffset;
      };
    }[];
  };
  entity: {
    gifUrl;
    name;
    salience;
  };
  payloadIdx;
  voices: {
    $requestId;
    data: {
      AudioStream;
      ContentType;
      RequestCharacters;
    };
  }[];
}

interface Sentiment {
  magnitude;
  score;
}
