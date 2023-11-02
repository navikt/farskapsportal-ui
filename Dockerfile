FROM node:18.17-alpine
ENV NODE_ENV production

WORKDIR usr/src/app
COPY server server/
COPY build build/

WORKDIR server
RUN yarn install

CMD ["node", "./server.js"]
EXPOSE 8080
