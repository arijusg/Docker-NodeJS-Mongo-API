import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;


describe('GET api/v1/questions', () => {

    it('resonds with JSON array', () => {
        return chai.request(app).get('/api/v1/questions')
            .then(res => {
                expect(res.status).to.be.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
            });
    });

    it('should include What is your age?', () => {
        return chai.request(app).get('/api/v1/questions')
            .then(res => {
                let WhatIsYourAge = res.body.find(question => question.text === "What is your age?");
                expect(WhatIsYourAge).to.exist;
                expect(WhatIsYourAge).to.have.all.keys([
                    'id',
                    'text'
                ]);
            });
    });
});
