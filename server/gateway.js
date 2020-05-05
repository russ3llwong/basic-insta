const express = require('express');
const server = require('http');
const httpProxy = require('http-proxy');

const app = express();
const appServer = server.createServer(app);
const apiProxy = httpProxy.createProxyServer(app);

const {WEBSOCKET_HOST, AUTH_SERVER_HOST, USER_SERVER_HOST, BASICGRAM_HOST, FRONT_END_HOST, GATEWAY_HOST} = require('./library/consts.js');

const GATEWAY_PORT = 4000;

const wsProxy = httpProxy.createProxyServer({
  target: process.env.WEBSOCKET_HOST || 'http://localhost:6000',
  ws: true,
});

apiProxy.on('error', (err, req, res) => {
  console.log(err);
  res.status(500).send('Proxy down :(');
});

wsProxy.on('error', (err, req, socket) => {
  console.log(err);
  console.log('ws failed');
  socket.end();
});

// web socket gateway.
appServer.on('upgrade', (req, socket, head) => {
  console.log('upgrade ws here');
  wsProxy.ws(req, socket, head);
});


console.log(`WebSocket end proxies to: ${WEBSOCKET_HOST}/websocket`);
app.all('/websocket*', (req, res) => {
  console.log('incoming ws');
  apiProxy.web(req, res, { target: `${WEBSOCKET_HOST}/websocket` });
});

console.log(`Basicgram end proxies to: ${BASICGRAM_HOST}`);
app.all('/basicgrams*', (req, res) => {
  apiProxy.web(req, res, { target: BASICGRAM_HOST });
});

console.log(`Auth service proxies to: ${AUTH_SERVER_HOST}`);
// for auth
app.all('/auth*', (req, res) => {
  console.log("Routing to Auth: ", req.url);
  apiProxy.web(req, res, { target: AUTH_SERVER_HOST });
});

console.log(`User service proxies to: ${USER_SERVER_HOST}`);
// for user
app.all('/user*', (req, res) => {
  console.log("Routing to User: ", req.url);
  apiProxy.web(req, res, { target: USER_SERVER_HOST });
});

console.log(`Front end proxies to: ${FRONT_END_HOST}`);
app.all('/*', (req, res) => {
  // for frontend
  apiProxy.web(req, res, { target: FRONT_END_HOST });
});

appServer.listen(GATEWAY_PORT);
console.log('Gateway started\n\n');
