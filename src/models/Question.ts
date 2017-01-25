import mongoose = require("mongoose");

import { IQuestion } from "./IQuestion";
import { IAnswerModel } from "./IAnswerModel";


var userSchema = new mongoose.Schema({
    id: Number,
    title: String,
    category: String,
    answers: Array<IAnswerModel>()
});

var Question = mongoose.model<IQuestion>("Question", userSchema);

export = Question;
