const WebSocket = require('ws');
const redis = require('redis');
const client = redis.createClient({ host: process.env.REDIS_HOST || 'localhost' });

const wss = new WebSocket.Server({ port: 6000 });

wss.on('connection', (ws) => {
  console.log('Someone has connected');
});

client.on('message', (channel, message) => { // all channels for now
  console.log(`subscriber hears message ${message}`);
  wss.clients.forEach((client) => { // looping & pushing to all ws listeners
    client.send(message);
  });
});

client.subscribe('testPublish');