ARG NODE_VERSION=12

FROM node:${NODE_VERSION}-alpine AS builder

RUN mkdir -p /web
ADD . /web
WORKDIR /web

RUN npm install
RUN npm run build


FROM node:lts-alpine as runner

COPY --from=builder /web/.next .next
COPY --from=builder /web/dist dist

ADD package.json .
RUN npm ci --production

EXPOSE 3000
CMD ["npm", "run", "start:prd"]