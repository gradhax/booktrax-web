import React, { useState, useMemo } from 'react';

import config from '@@src/config';
import GlobalStyle from '@@components/GlobalStyle';
import Header from '@@components/Header';
import Root from '@@components/Root';
import TransferredState from '@@components/TransferredState';
import UniversalContext from './contexts/UniversalContext';

const Universal: UniversalType = ({
}) => {
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
