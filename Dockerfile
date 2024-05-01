FROM node:18-alpine

USER root

WORKDIR /home/node/app

COPY package*.json .

RUN npm install

USER node

EXPOSE 3009