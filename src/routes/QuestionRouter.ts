import { Router, Request, Response, NextFunction } from 'express'

import * as Question from '../models/Question';
import { IQuestionModel } from '../models/IQuestionModel';

//const Questions = require('../data/question-data');


export class QuestionRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public getAll(req: Request, res: Response, next: NextFunction) {
        Question.find((err, questions: Array<IQuestionModel>) => {
            if (err) return console.error(err);
            res.send(questions);
        });
    }

    init() {
        this.router.get('/', this.getAll);
    }
}

const questionRouter = new QuestionRouter();
questionRouter.init();

export default questionRouter.router;