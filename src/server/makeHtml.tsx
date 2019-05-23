import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components'

import {
  attachAssets,
  MakeHtml,
  requireUniversalComponent,
} from '@nodekit/express-isomorphic';
import ServerApp from './ServerApp';

const makeHtml: MakeHtml = async function ({
  assets,
  requestUrl,
  resLocals,
  universalAppPath = '',
}) {
  const Universal = requireUniversalComponent(universalAppPath);
  const universalState = {
    foo: '1313',
  };

  console.log('request headers: %o', resLocals.headers);

  const element = (
    <ServerApp
      renderUniversal={Universal}
      requestUrl={requestUrl}
      universalState={universalState}
    />
  );

  const sheet = new ServerStyleSheet();
  const styledComponentsStyleTags = sheet.getStyleTags();

  const appRootInString = renderToString(element);
  console.log('[make-html] assets: %s', assets);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1">
  <title>Booktrax: Audiobook generator</title>
  <script>window['universalState']=${JSON.stringify(universalState)}</script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.dev.js"></script>
  ${styledComponentsStyleTags}
</head>
<body>
  <div id="app-root">${appRootInString}</div>
  ${attachAssets(assets)}
</body>
</html>
`;
};

export default makeHtml;
