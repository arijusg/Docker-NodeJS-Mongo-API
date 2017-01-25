import { IQuestionModel } from './IQuestionModel'

export class QuestionModel implements IQuestionModel {
    id: number;
    title: string;
    category: string;
}