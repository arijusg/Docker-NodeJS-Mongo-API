import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import * as mongoose from 'mongoose';

import * as MongoConfig from './MongoConfig';

import QuestionRouter from './routes/QuestionRouter';
import HeroRouter from './routes/HeroRouter';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.setupDatabase();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    this.express.use('/api/v1/questions', QuestionRouter);
    this.express.use('/api/v1/hero', HeroRouter);
  }

  // Configure DB
  private setupDatabase(): void {
    mongoose.connect(MongoConfig.mongoUri[this.getNodeEnvironment()])
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
      // we're connected!
      console.log("We are connected");
    });
  }

  private getNodeEnvironment(): string {
    var nodeEnvironment: string;
    nodeEnvironment = process.env.NODE_ENV;
    if (nodeEnvironment === undefined) throw 'Set node environment first';
    console.log('MODE:::: ' + process.env.NODE_ENV);
    return nodeEnvironment;
  }
}

export default new App().express;