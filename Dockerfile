#***********************************************
FROM node:13-slim as builder

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git
WORKDIR /usr/local/src/

COPY package.json ./
COPY package-lock.json ./
RUN npm install npm@latest -g
RUN npm install
RUN npm install -g @quasar/cli
COPY src  ./src
COPY src-ssr ./src-ssr
COPY quasar.conf.js babel.config.js .postcssrc.js .eslintrc.js .eslintignore .stylintrc ./

RUN quasar build -m ssr

#***********************************************
FROM node:13-slim as runner
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y iproute2
WORKDIR /usr/local/server
COPY --from=builder \
 /usr/local/src/dist/ssr ./

RUN npm install
COPY run.sh .
RUN chmod +x run.sh
EXPOSE 8989

CMD ["./run.sh"]
