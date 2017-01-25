import mongoose = require("mongoose");

import { IQuestion } from "./IQuestion";


var userSchema = new mongoose.Schema({
    id: Number,
    title: String,
    category: String
});

var Question = mongoose.model<IQuestion>("Question", userSchema);

export = Question;
