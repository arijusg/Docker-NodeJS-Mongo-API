class MongooseConfig {
    mongoUri: MongoUri = new MongoUri();
}

class MongoUri {
    public development: string = 'mongodb://localhost/finq-testing';
    public test: string = 'mongodb://localhost/test'
}

var MongoConfig = new MongooseConfig();
export = MongoConfig;
