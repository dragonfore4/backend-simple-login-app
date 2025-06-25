FROM node:24-alpine

RUN apk add --no-cache tini

WORKDIR /app

COPY package.json package-lock.json ./

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

ARG JWT_SECRET
ENV JWT_SECRET=$JWT_SECRET

RUN npm install --production

COPY . .

EXPOSE 8080
ENTRYPOINT ["/sbin/tini", "--"]
CMD [ "node", "server.js" ]


