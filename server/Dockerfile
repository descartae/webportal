FROM node:7.1.0-slim

WORKDIR /opt/app
RUN mkdir /tmp/npm

# Trick to use docker caching system
COPY package.json /tmp/npm
RUN cd /tmp/npm && npm install
RUN mv /tmp/npm/node_modules /opt/app

COPY . /opt/app