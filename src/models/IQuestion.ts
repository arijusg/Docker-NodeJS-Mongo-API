import mongoose = require("mongoose");

import { IQuestionModel } from '../models/IQuestionModel';

export interface IQuestion extends IQuestionModel, mongoose.Document { }