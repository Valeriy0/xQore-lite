// server.js
const next = require('next');
const http = require('http');
const contextService = require('request-context');
const cookiesMiddleware = require('universal-cookie-express');
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const { createProxyMiddleware } = require('http-proxy-middleware');
const { createTerminus } = require('@godaddy/terminus');

// With express
const express = require('express');

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const expressApp = express();

  process.on('SIGTERM', () => {
    expressApp.close(() => {
      process.exit(0);
    });
  });

  if (process.env.PROXY_URL) {
    expressApp.use(
      createProxyMiddleware(process.env.API_URL, {
        target: process.env.PROXY_URL,
        changeOrigin: true,
        cookieDomainRewrite: '',
        debug: true,
        preserveHeaderKeyCase: true,
      }),
    );
  }

  expressApp
    .use(cookiesMiddleware())
    .use(contextService.middleware('request'))
    .use((req, res, next) => {
      contextService.set('request:cookies', req.universalCookies);

      next();
    })
    .use(handle);

  const server = http.createServer(expressApp);

  server.listen(3000);

  function onSignal() {
    console.log('server is starting cleanup');
  }

  function onShutdown() {
    console.log('server is shutting down');
  }

  createTerminus(server, {
    signal: 'SIGTERM',
    onSignal,
    onShutdown,
  });
});
