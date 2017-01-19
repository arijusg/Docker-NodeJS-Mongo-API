import mongoose = require("mongoose");

import { IQuestionModel } from "./IQuestionModel";


var userSchema = new mongoose.Schema({
    id: Number,
    title: String,
    category: String
});

var Question = mongoose.model<IQuestionModel>("Question", userSchema);

export = Question;
