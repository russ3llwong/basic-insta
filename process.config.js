module.exports = { // pm2 start process.config.js
  apps: [
    {
      name: 'gateway',
      script: './server/gateway.js',
      ignore_watch : ["node_modules"],
      watch: true,
    },
    {
      name: 'fotogram',
      script: './server/fotogram.js',
      ignore_watch : ["node_modules"],
      watch: true,
      instances: 2, 
    },
    {
      name: 'websocket',
      script: './server/websocket-server.js',
      ignore_watch : ["node_modules"],
      watch: true,
      instances: 2,
    },
    {
      name: 'auth-server',
      script: './server/auth-server.js',
      ignore_watch : ["node_modules"],
      watch: true,
    },
    {
      name: 'user-server',
      script: './server/user-server.js',
      ignore_watch : ["node_modules"],
      watch: true,
    }
  ],
};