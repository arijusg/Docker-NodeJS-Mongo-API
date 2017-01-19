import { IHero } from './IHero'
export class HeroModel implements IHero {
    email: string;
    password: string;
    displayName: string;
}