ARG NODE_VERSION=12

FROM node:${NODE_VERSION}-alpine AS builder

RUN mkdir -p /web
ADD . /web
WORKDIR /web

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
