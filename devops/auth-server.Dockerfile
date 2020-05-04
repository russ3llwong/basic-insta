FROM node:10-alpine

WORKDIR /main

COPY ./server/library /main/library
COPY ./server/models /main/models
COPY ./server/auth-server.js /main
COPY ./package.json /main
COPY ./package-lock.json /main

RUN npm install

EXPOSE 3002

CMD ["node", "auth-server.js"]