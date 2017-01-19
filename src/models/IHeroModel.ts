import mongoose = require("mongoose");

import { IHero } from '../models/IHero';

export interface IHeroModel extends IHero, mongoose.Document { }