class MongooseConfig {
    mongoUri: MongoUri = new MongoUri();
}

class MongoUri {
    public production: string = 'mongodb://localhost/finq-production'
    public development: string = 'mongodb://localhost/finq-development';
    public test: string = 'mongodb://localhost/finq-test'
}

var MongoConfig = new MongooseConfig();
export = MongoConfig;
