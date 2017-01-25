import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

import { TestData } from '../test/setup/testData';
import { TestDataProvider } from '../test/setup/testDataProvider';

import { QuestionModel } from '../src/models/QuestionModel';
import { IQuestionModel } from '../src/models/IQuestionModel';

import { AnswerModel } from '../src/models/AnswerModel';


chai.use(chaiHttp);
const expect = chai.expect;

//Setup test data
const testData = new TestData();
const testDataProvider = new TestDataProvider(testData);



describe('GET api/v1/questions', () => {

    beforeEach(function (done) {
        testDataProvider.InsertQuestions(done);
    });

    afterEach(function (done) {
        testDataProvider.Clean()
            .then(() => done());
    });

    it('resonds with JSON array', () => {
        return chai.request(app).get('/api/v1/questions')
            .then(res => {
                expect(res.status).to.be.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
            });
    });

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

    it('question should include answers', () => {
        return chai.request(app).get('/api/v1/questions')
            .then(res => {
                var questionModel = <QuestionModel>res.body.find(question => question.id === testDataProvider.Data.Question1.id);
                
                expect(questionModel.answers).to.have.length.of('2');

                var answerModel = <AnswerModel>questionModel.answers[0];

                expect(answerModel.title).to.be.equal(testDataProvider.Data.Question1.answers[0].title);
            });
    });
});
