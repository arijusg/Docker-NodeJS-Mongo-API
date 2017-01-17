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
### Build docker image

```bash
$ docker build -t <your username>/finq-campaign .
```
### Run the image 

```bash
$ docker run -p 49160:3000 -d <your username>/finq-campaign
```