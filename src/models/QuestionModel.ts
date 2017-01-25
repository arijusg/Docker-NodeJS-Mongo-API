import { IQuestionModel } from './IQuestionModel';
import { IAnswerModel } from './IAnswerModel';

export class QuestionModel implements IQuestionModel {
    id: number;
    title: string;
    category: string;
    answers: Array<IAnswerModel>;
}