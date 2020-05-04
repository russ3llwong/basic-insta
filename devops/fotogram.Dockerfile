FROM node:10-alpine

WORKDIR /main

COPY ./server/library /main/library
COPY ./server/models /main/models
COPY ./server/fotogram.js /main
COPY ./package.json /main
COPY ./package-lock.json /main

RUN npm install

EXPOSE 5000

CMD ["node", "fotogram.js"]