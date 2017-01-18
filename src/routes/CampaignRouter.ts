import { Router, Request, Response, NextFunction } from 'express'

var Campaigns = require('../data/campaign-data');
var Questions = require('../data/question-data');

const CompaignsPath = __dirname + '/../data/campaign-data11.json'

var fs = require('fs');

export class CampaignRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public postTest(req: Request, res: Response, next: NextFunction) {
        //Do stuff
        res.status(201);
        res.send();
    }

    init() {
        this.router.post('/', this.postTest);
    }
}

const campaignRouter = new CampaignRouter();
campaignRouter.init();

export default campaignRouter.router;