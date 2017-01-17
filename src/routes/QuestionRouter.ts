import { Router, Request, Response, NextFunction } from 'express'
const Questions = require('../data/data');

export class QuestionRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public getAll(req: Request, res: Response, next: NextFunction) {
        res.send(Questions);
    }

    init() {
        this.router.get('/', this.getAll);
    }
}

const questionRouter = new QuestionRouter();
questionRouter.init();

export default questionRouter.router;