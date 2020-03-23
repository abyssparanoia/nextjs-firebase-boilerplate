FROM node:lts-alpine

RUN mkdir -p /app
ADD . /app
WORKDIR /app

RUN yarn
RUN yarn build


ENV PORT 3001
EXPOSE 3001

ENTRYPOINT ["yarn", "workspace", "@abyssparanoia/backend","start:prod"]