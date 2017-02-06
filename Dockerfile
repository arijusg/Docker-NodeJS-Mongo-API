FROM node:7.4.0-alpine

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

# Run tests, the tests are run against ts files.... Cant run as db is offline ???
# RUN npm test

# Build
RUN gulp build

# Import initial data TODO: part of compose
#RUN gulp import-data --prod

# Lets run node in production env
ENV NODE_ENV=production

EXPOSE 3000

#CMD [ "npm", "start" ]

# Dirty way to import data. TODO: containerise :)
CMD node dist/data/dataImporter.js && node dist/index.js