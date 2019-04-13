import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import config from '@@src/config';
import { init } from '@@modules/socket';
import GlobalStyle from '@@components/GlobalStyle';
import Header from '@@components/Header';
import Root from '@@components/Root';
import TransferredState from '@@components/TransferredState';
import UniversalContext from './contexts/UniversalContext';
import { Socket } from 'dgram';

const Universal: UniversalType = ({
}) => {
  useEffect(() => {
    init()
      .then((res) => {
        console.log(123, res);
      });
  }, []);

  return (
    <>
      <GlobalStyle />
      <Root />
    </>
  );
};

export default Universal;

Universal.contexts = {
  UniversalContext,
};

type UniversalType = React.FC<UniversalProps> & { contexts };

interface UniversalProps {
  addPath?: Function;
  children?: React.ReactNode;
}

declare global {
  const io: any;
}
