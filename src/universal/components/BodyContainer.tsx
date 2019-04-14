import React from 'react';
import styled from 'styled-components';

import Axios from '@@modules/Axios';
import Body from '@@components/Body';
import config from '@@src/config';
import { getSocket } from '@@modules/socket';

export enum RequestStatus {
  UNINITIATED = 'UNINITIATED',
  IN_PROGRESS = 'IN_PROGRESS',
  INITIATED = 'INITIATED',
};

const BodyContainer = ({
  socketId,
}) => {
  const [ requestStatus, setRequestStatus ] = React.useState(RequestStatus.UNINITIATED);
  const [ content, setContent ] = React.useState({});
  const [ currChunkIdx, setCurrChunkIdx ] = React.useState(null);

  React.useEffect(
    () => {
      return () => {};
    },
    [],
  );

  const handleClickConvert = React.useCallback((e) => {
    console.log('handleClickButton()');
    const text = e.target.value ||
`The little town of Verrières can pass for one of the prettiest in Franche-Comté. Its white houses with their pointed red-tiled roofs stretch along the slope of a hill, whose slightest undulations are marked by groups of vigorous chestnuts. The Doubs flows to within some hundred feet above its fortifications, which were built long ago by the Spaniards, and are now in ruins.
Verrières is sheltered on the north by a high mountain which is one of the branches of the Jura. The jagged peaks of the Verra are covered with snow from the beginning of the October frosts. A torrent which rushes down from the mountains traverses Verrières before throwing itself into the Doubs, and supplies the motive power for a great number of saw mills. The industry is very simple, and secures a certain prosperity to the majority of the inhabitants who are more peasant than bourgeois. It is not, however, the wood saws which have enriched this little town. It is the manufacture of painted tiles, called Mulhouse tiles, that is responsible for that general affluence which has caused the façades of nearly all the houses in Verrières to be rebuilt since the fall of Napoleon.`;
    setRequestStatus(true);
    bootstrapAnalyzeHandler({
      handleChangeRequestStatus: setRequestStatus,
      handlePlayNext: setCurrChunkIdx,
      text,
    });
  }, [ requestStatus ]);

  return (
    <Body
      content={content}
      currChunkIdx={currChunkIdx}
      handleClickConvert={handleClickConvert}
      requestStatus={requestStatus}
      socketId={socketId}
    />
  );
};

export default BodyContainer;

function bootstrapAnalyzeHandler({
  handleChangeRequestStatus,
  handlePlayNext,
  text,
}) {
  const socket = getSocket();
    const context = new AudioContext();
    let queue: any[] = [];
    let entities: any[] = [];
    let sentiments: any[] = [];
    let currentPayload = 0;
    let isPlaying = false;
    const play = (handlePlayNext) => {
      const { buffer, chunkId } = queue.shift();
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(context.destination);

      console.log('[audio] play, chunkId: %s', chunkId);

      // Check if the paragraph has changed
      let payload = parseInt(chunkId.split('-')[0]);
      if (payload > currentPayload) {
        currentPayload = payload;

        const nextEntity = entities.shift();
        if (nextEntity) {
          console.log('[entity]', nextEntity.gifUrl);
        } else {
          console.log('[entity] empty entities');
        }

        const nextSentiment = sentiments.shift();
        if (nextSentiment) {
          console.log('[sentiment] score:', nextSentiment.score, 'magnitude:', nextSentiment.magnitude);
        } else {
          console.log('[sentiment] next sentiment empty');
        }
      }

      handlePlayNext(chunkId);
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
      const { payloadIdx, voices, entity, analyze } = data;
      console.log('[socket] response-analyze payloadIdx: %s', payloadIdx);
      if (entity) {
        entities.push(entity);
      }
      if (analyze) {
        sentiments.push(analyze.documentSentiment);
      }

      if (voices.length) {
        console.log('[audio] response-analyze, voice of length: %s', voices.length);
        (async () => {
          for (let [ idx, voice ] of voices.entries()) {
            const audioStream = voice.data.AudioStream;
            const buffer = await context.decodeAudioData(audioStream);
            console.log('[audio] decode buffer complete', idx, buffer);
            queue.push({
              chunkId: `${payloadIdx}-${idx}`,
              buffer,
            });

            if (idx === voices.length - 1) {
              if (!isPlaying) {
                // at the very onstart
                handleChangeRequestStatus(RequestStatus.INITIATED);
                play(handlePlayNext);

                // First entity and sentiment
                const firstEntity = entities.shift();
                if (firstEntity) {
                  console.log('[entity]', firstEntity.gifUrl);
                } else {
                  console.log('[entity] empty entities');
                }

                const firstSentiment = sentiments.shift();
                if (firstSentiment) {
                  console.log('[sentiment], score:', firstSentiment.score, 'magnitude', firstSentiment.magnitude);
                } else {
                  console.log('[sentiment] first sentiment empty');
                }
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