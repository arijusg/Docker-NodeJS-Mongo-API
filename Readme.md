# FINQ campaign

## Develop

### Install dependencies
```bash
npm install
```

### Watch files
```
gulp
```

### Start API locally, default port is 3000
```
npm start
```

### Run tests
```
npm test
```

## Build
### Run API in docker
```
docker run \
    -e "NODE_ENV=production" \
    -u "node" \
    -v <path to dist folder>:/home/node/app
    -w "/home/node/app" \
    -p 8080:3000 \
    --name "finq-campaign-dev" \
    --rm \
    node:boron sh -c "node index.js"
```

### Build docker image

```bash
$ docker build -t <your username>/finq-campaign .
```
### Run the image 

```bash
$ docker run -p 49160:3000 -d --name finq-campaign <your username>/finq-campaign
```

### Run MongoDB image
```bash
docker run --name finq-mongo -d -p 27017:27017 mongo
```