# Base image
FROM node:17

# Create app directory
WORKDIR /usr/src/snkr

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./

# Install app dependencies
RUN yarn install

# Bundle app source
COPY ./apps/user ./apps/user
COPY ./apps/common ./apps/common

# Creates a "dist" folder with the production build
RUN yarn build user

EXPOSE 3000

# Start the server using the production build
CMD [ "node", "dist/apps/user/main.js", "--host", "0.0.0.0"]