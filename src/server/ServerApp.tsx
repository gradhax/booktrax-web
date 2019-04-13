import * as React from 'react';
import { StaticRouter } from 'react-router-dom';

import { addPath } from '@nodekit/express-isomorphic';

const ServerApp = ({
  renderUniversal: Universal,
  requestUrl,
  universalState,
}) => {
  const { UniversalContext } = Universal.contexts;

  return (
    <StaticRouter 
      context={{}}
      location={requestUrl}
    >
      <UniversalContext.Provider value={universalState}>
        <Universal 
          addPath={addPath}
        />
      </UniversalContext.Provider>
    </StaticRouter>
  );
};

export default ServerApp;
