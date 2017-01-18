import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;


describe('POST api/v1/campaign', () => {

    it('should post an answer', () => {
        return chai.request(app)
            .post('/api/v1/campaign')
            .send({ 'name': 'Java', 'lastName': 'Script' })
            .then((res) => {
                expect(res.status).to.be.equal(201);
            })
            .catch((err)=>{
                throw err;
            });

    });
});