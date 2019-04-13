import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import * as React from 'react';

import Universal from '../universal/Universal';

const ClientApp = ({
  universalState,
}) => {
  const { UniversalContext } = Universal.contexts;

  return (
    <BrowserRouter>
      <UniversalContext.Provider value={universalState}>
        <Universal />
      </UniversalContext.Provider>
    </BrowserRouter>
  );
};

export default hot(module)(ClientApp);
