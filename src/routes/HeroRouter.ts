import { Router, Request, Response, NextFunction } from 'express';
import * as Hero from '../models/Hero';
import { IHero } from '../models/IHero'
import { HeroModel } from '../models/HeroModel';

export class HeroRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public getHeroes(req: Request, res: Response, next: NextFunction) {
        Hero.find((err, Heroes: Array<HeroModel>) => {
            if (err) return console.error(err);
            res.send(Heroes);
        });
    }

    public postHero(req: Request, res: Response, next: NextFunction) {
        //Do stuff
        res.status(201);
        res.send();
    }

    init() {
        this.router.get('/', this.getHeroes);        
        this.router.post('/', this.postHero);
    }
}

const heroRouter = new HeroRouter();
heroRouter.init();

export default heroRouter.router;