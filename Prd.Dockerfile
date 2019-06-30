ARG NODE_VERSION=12

FROM node:${NODE_VERSION}-alpine AS builder

RUN mkdir -p /web
ADD . /web
WORKDIR /web

RUN npm install
RUN npm run build


FROM node:lts-alpine as runner

COPY --from=builder /web/.next .next

ADD package.json .
ADD tsconfig.json .
ADD ./server ./server
ADD firebaseClientKey.json .
ADD firebaseAdminKey.json .
RUN npm install

EXPOSE 3000
CMD ["npm", "run", "start:prd"]