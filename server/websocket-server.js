const WebSocket = require('ws');
const { WEBSOCKET_HOST, FEED_TOPIC, COMMENT_TOPIC } = require('./library/consts.js');

const wss = new WebSocket.Server({ port: WEBSOCKET_HOST });

// TODO: Kafka stuff

const broadcastMessage = (message) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message)); //server to client
        }
    });
};

const updateFeed = () => {
    broadcastMessage({
        type: 'UPDATE_FEED',
    });
};

const updateComment = (postId) => {
    broadcastMessage({
        type: 'UPDATE_COMMENT',
        postId
    });
};


wss.on('connection', (ws) => {
    console.log('Someone has connected');
    ws.on('close', () => {
        // updateUserCount();
        console.log('someone has disconnected!');
    });

    ws.on('error', (e) => {
        console.log(e);
    });

    ws.on('message', (message) => {
        const messageObject = JSON.parse(message);
        switch (messageObject.type) {
            default:
                ws.send('Did not expect a message!');
        }
    });
}); 