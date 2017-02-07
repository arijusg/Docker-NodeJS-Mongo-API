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

### Import initial data
Development database:
```bash
gulp data-import --dev
```

Production database:
```bash
gulp data-import --prod
```


## Run the application
### Run
```bash
$ docker-compose up
```
### Teardown
```bash
$ docker-compose down 
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
$ docker build -t finq-campaign .
```


### Run the FINQ image 

```bash
$ docker run -p 49160:3000 -d --name finq-campaign finq-campaign
```

### Run Local MongoDB image
```bash
docker run --name finq-mongo -d -p 27017:27017 mongo
```

### Run Local DynamoDB image
```bash
docker run -d -p 8000:8000 --name dynamodb peopleperhour/dynamodb
```