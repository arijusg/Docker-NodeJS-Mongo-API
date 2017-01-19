import mongoose = require("mongoose");

import { IHeroModel } from "./IHeroModel";


var userSchema = new mongoose.Schema({
    email: String,
    password: String,
    displayName: String
});

var Hero = mongoose.model<IHeroModel>("Hero", userSchema);

export = Hero;
