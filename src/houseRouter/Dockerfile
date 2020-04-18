FROM node:12.16.1-alpine3.11

WORKDIR /ui

ENV PATH /ui/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . /ui

EXPOSE 8000

CMD [ "yarn", "start" ]