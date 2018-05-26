FROM node:9.11-alpine

WORKDIR /opt/app

# Trick to use docker caching system
#RUN mkdir /tmp/npm
#COPY package.json /tmp/npm
#RUN cd /tmp/npm && npm install
#RUN mv /tmp/npm/node_modules /opt/app

COPY . /opt/app
RUN cd /opt/app && npm install

CMD npm start