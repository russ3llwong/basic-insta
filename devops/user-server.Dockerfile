FROM node:10-alpine

WORKDIR /main

COPY ./server/library /main/library
COPY ./server/models /main/models
COPY ./server/user-server.js /main
COPY ./server/package.json /main
# COPY ./package-lock.json /main

RUN npm install

EXPOSE 3003

CMD ["node", "user-server.js"]