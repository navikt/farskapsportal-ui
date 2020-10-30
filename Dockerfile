FROM node:14-alpine
ENV NODE_ENV production

WORKDIR usr/src/app
COPY server server/
COPY build build/

WORKDIR server
RUN npm install

CMD ["node", "./index.js"]
EXPOSE 8080
