import mongoose = require("mongoose");

import { IQuestion } from '../models/IQuestion';

export interface IQuestionModel extends IQuestion, mongoose.Document { }