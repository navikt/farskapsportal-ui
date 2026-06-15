FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim

ENV NODE_ENV production

COPY server server/
COPY build build/

WORKDIR /server

CMD ["./server.js"]
EXPOSE 8080
