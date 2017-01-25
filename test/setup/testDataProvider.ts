import { IQuestionModel } from '../../src/models/IQuestionModel';
import { QuestionModel } from '../../src/models/QuestionModel';
import * as Question from '../../src/models/Question';

import { TestData } from './testData';

export class TestDataProvider {

    public Data: TestData;

    constructor(testData: TestData) {
        this.Data = testData;
    }

    public InsertQuestion(question: QuestionModel): Promise<IQuestionModel> {
        var newQuestion = new Question(question);
        return newQuestion.save();
    }

    public InsertQuestions(callback: () => void) {
        this.InsertQuestion(this.Data.Question1)
            .then(
            (question) => this.InsertQuestion(this.Data.Question2).then((question) => {
                callback();
            })
            );
    }

    public Clean() {
        return Question.collection.drop();
    }
}