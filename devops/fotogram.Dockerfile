FROM node:10-alpine

WORKDIR /main

COPY ./server/library /main/library
COPY ./server/models /main/models
COPY ./server/basicgram.js /main
COPY ./server/package.json /main
# COPY ./package-lock.json /main

RUN npm install

EXPOSE 5000

CMD ["node", "basicgram.js"]