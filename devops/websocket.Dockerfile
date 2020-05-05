FROM node:10-alpine

WORKDIR /main

COPY ./server/library /main/library
COPY ./server/websocket-server.js /main
COPY ./server/package.json /main
# COPY ./package-lock.json /main

RUN npm install

EXPOSE 6000

CMD ["node", "websocket-server.js"]