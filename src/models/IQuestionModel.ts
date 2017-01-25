import { IAnswerModel } from './IAnswerModel';

export interface IQuestionModel {
    id: number;
    title: string;
    category: string;
    answers: Array<IAnswerModel>;
};