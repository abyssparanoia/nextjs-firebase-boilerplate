ARG NODE_VERSION=12

FROM node:${NODE_VERSION}-alpine AS builder

RUN mkdir -p /web
ADD . /web
WORKDIR /web

RUN yarn
RUN yarn build


FROM node:lts-alpine as runner

COPY --from=builder /web/dist dist

ADD package.json .
ADD yarn.lock .
RUN yarn --production

EXPOSE 3000
CMD ["npm", "run", "start:prd"]