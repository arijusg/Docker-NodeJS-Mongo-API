import { IQuestion } from './IQuestion'

export class QuestionModel implements IQuestion {
    id: number;
    title: string;
    category: string;
}