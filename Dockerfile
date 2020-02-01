FROM node:lts-alpine

RUN mkdir -p /web
ADD . /web
WORKDIR /web

RUN yarn
RUN yarn build

ENV PORT 3000

EXPOSE 3000

CMD ["yarn", "start:prd"]
