import { QuestionModel } from '../../src/models/QuestionModel';
import { AnswerModel } from '../../src/models/AnswerModel';

export class TestData {

    public Question1: QuestionModel;
    public Question2: QuestionModel;

    constructor() {

        this.compose();
    };

    private compose() {

        var Question1Answer1: AnswerModel = {
            title: "Question1Answer1"
        };

        var Question1Answer2: AnswerModel = {
            title: "Question1Answer2"
        };

        this.Question1 = {
            id: 1,
            title: "What is your age?",
            category: "about",
            answers: [Question1Answer1, Question1Answer2]
        };

        var Question2Answer2: AnswerModel = {
            title: "Question2Answer1"
        };
        
        this.Question2 = {
            id: 2,
            title: "What is your sex?",
            category: "about",
            answers: [
                Question2Answer2
            ]
        };


    }
}