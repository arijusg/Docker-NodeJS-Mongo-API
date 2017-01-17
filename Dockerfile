FROM node:boron

# Lets run node in production env
ENV NODE_ENV=production

# Install global dependencies
RUN npm install -g gulp

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Run tests, the tests are run against ts files.... ???
RUN npm test

# Build
RUN gulp build

EXPOSE 3000

CMD [ "npm", "start" ]