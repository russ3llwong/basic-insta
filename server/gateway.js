const express = require('express');
const server = require('http');
const httpProxy = require('http-proxy');

const app = express();
const appServer = server.createServer(app);
const apiProxy = httpProxy.createProxyServer(app);

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

const fotogramHost = process.env.FOTOGRAM_HOST || 'http://localhost:5000';
console.log(`Fotogram end proxies to: ${fotogramHost}`);
app.all('/fotogram*', (req, res) => {
  apiProxy.web(req, res, { target: fotogramHost });
});

const websocketHost = process.env.WEBSOCKET_HOST || 'http://localhost:6000/websocket';
console.log(`WebSocket end proxies to: ${websocketHost}`);
app.all('/websocket*', (req, res) => {
  console.log('incoming ws');
  apiProxy.web(req, res, { target: websocketHost });
});

const authServerHost = process.env.AUTH_SERVER_HOST || 'http://localhost:3002';
console.log(`Auth service proxies to: ${authServerHost}`);
app.all('/auth*', (req, res) => {
  // for auth
  console.log("Routing to Auth: ", req.url);
  apiProxy.web(req, res, { target: authServerHost });
});

const userServerHost = process.env.USER_SERVER_HOST || 'http://localhost:3003';
console.log(`User service proxies to: ${userServerHost}`);
// for user
app.all('/user*', (req, res) => {
  console.log("Routing to User: ", req.url);
  apiProxy.web(req, res, { target: userServerHost });
});

const frontEndHost = process.env.FRONT_END_HOST || 'http://localhost:3000';
console.log(`Front end proxies to: ${frontEndHost}`);

app.all('/*', (req, res) => {
  // for frontend
  apiProxy.web(req, res, { target: frontEndHost });
});

appServer.listen(GATEWAY_PORT);
console.log('Gateway started\n\n');