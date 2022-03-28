FROM node:16.14.0-alpine

WORKDIR /usr/src/client

COPY package.json  ./
COPY package-lock.json ./
COPY ./ ./

RUN npm i

CMD ["npm", "start"]