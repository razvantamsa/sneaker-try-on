# Base image
ARG SERVICE_NAME='default'
FROM node:17

# Create app directory
WORKDIR /app

ARG SERVICE_NAME
ENV SERVICE=${SERVICE_NAME}

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY *.json ./

# Install app dependencies
RUN yarn install

# Bundle app source
COPY ./apps/${SERVICE} ./apps/${SERVICE}
COPY ./apps/common ./apps/common

# Creates a "dist" folder with the production build
RUN yarn build ${SERVICE}

RUN cd ./dist/apps && mkdir service
RUN mv dist/apps/${SERVICE}/main.js dist/apps/service/main.js

# Start the server using the production build
CMD [ "node", "dist/apps/service/main.js", "--host", "0.0.0.0"]