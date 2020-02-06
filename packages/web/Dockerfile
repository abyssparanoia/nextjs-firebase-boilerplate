FROM node:lts-alpine

RUN mkdir -p /app
ADD . /app
WORKDIR /app

RUN yarn
RUN yarn build


ENV PORT 3000
EXPOSE 3000

ENTRYPOINT ["yarn", "workspace", "@abyssparanoia/web","start:prod"]