import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import * as mongoose from 'mongoose';

import * as MongoConfig from './MongoConfig';

import { db } from './db';

//Routers
import QuestionRouter from './routes/QuestionRouter';

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
  }

  // Configure DB
  private setupDatabase(): void {
    var dbSetup = new db();
    dbSetup.Open();
  }
}

export default new App().express;