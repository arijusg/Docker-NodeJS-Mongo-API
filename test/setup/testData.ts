import {QuestionModel} from '../../src/models/QuestionModel';

export class TestData {

    public Question1: QuestionModel;
    public Question2: QuestionModel;

    constructor() {
        this.Question1 = new QuestionModel();
        this.Question1.id = 1;
        this.Question1.title = "What is your age?";
        this.Question1.category = "about";

        this.Question2 = new QuestionModel();
        this.Question2.id = 2;
        this.Question2.title = "What is your sex?";
        this.Question2.category = "about";
    };
}