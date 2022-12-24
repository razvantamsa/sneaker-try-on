FROM node:14.17.0

WORKDIR /app

COPY . .
RUN yarn install

COPY api/docker/root/ /

ENTRYPOINT ["/entrypoint.sh"]
