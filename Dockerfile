#***********************************************
FROM node:13-slim as builder

RUN apt-get update && \
    apt-get upgrade -y
WORKDIR /usr/local/src/

COPY package.json ./
COPY package-lock.json ./
RUN npm install npm@6.13.4 -g
RUN npm install -g @quasar/cli
RUN npm install
COPY src  ./src
COPY quasar.conf.js babel.config.js .postcssrc.js .eslintrc.js .eslintignore ./
RUN ls -la
RUN quasar build
#***********************************************

FROM node:11-slim as server_builder
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git
WORKDIR /usr/local/src/server
RUN npm install npm@latest -g
COPY src-server/package*.json ./
RUN npm install
COPY src-server ./

RUN npm run build

#***********************************************
FROM node:13-slim as runner
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y iproute2
WORKDIR /usr/local/server
COPY --from=server_builder \
  /usr/local/src/server/dist \
  ./dist
COPY --from=server_builder \
    /usr/local/src/server/node_modules \
    ./node_modules

COPY --from=builder \
 /usr/local/src/dist/spa \
 ./dist/public/

RUN npm install
EXPOSE 8989

CMD ["node", "dist"]
