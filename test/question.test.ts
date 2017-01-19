import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

import * as Question from '../src/models/Question';
import { IQuestionModel } from '../src/models/IQuestionModel';
import { QuestionModel } from '../src/models/QuestionModel';

chai.use(chaiHttp);
const expect = chai.expect;


class TestData {

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

class TestDataProvider {
    public Data: TestData;

    constructor() {
        this.Data = new TestData();
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

const testData = new TestData();
const testDataProvider = new TestDataProvider();

describe('GET api/v1/questions', () => {

    beforeEach(function (done) {
        testDataProvider.InsertQuestions(done);
    });

    afterEach(function (done) {
        testDataProvider.Clean()
            .then(() => done())
            .catch((err) => done()); //If collection does not exist it throws
    });

    it('resonds with JSON array', () => {
        return chai.request(app).get('/api/v1/questions')
            .then(res => {
                expect(res.status).to.be.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
            });
    });

    //Check if collection exists
// mongoose.connection.db.listCollections({name: 'mycollectionname'})
//     .next(function(err, collinfo) {
//         if (collinfo) {
//             // The collection exists
//         }
//     });


    it('should include test questions?', () => {
        return chai.request(app).get('/api/v1/questions')
            .then(res => {

                expect(res.body).to.have.length.of('2');

                var question1 = res.body.find(question => question.id === testDataProvider.Data.Question1.id);
                expect(question1.id).to.be.equal(testDataProvider.Data.Question1.id);
                expect(question1.title).to.be.equal(testDataProvider.Data.Question1.title);
                expect(question1.category).to.be.equal(testDataProvider.Data.Question1.category);

                var question2 = res.body.find(question => question.id === testDataProvider.Data.Question2.id);
                expect(question2.id).to.be.equal(testDataProvider.Data.Question2.id);
                expect(question2.title).to.be.equal(testDataProvider.Data.Question2.title);
                expect(question2.category).to.be.equal(testDataProvider.Data.Question2.category);
            });
    });
});
