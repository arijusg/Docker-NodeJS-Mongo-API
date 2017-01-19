import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

import * as Hero from '../src/models/Hero';
import { IHero } from '../src/models/IHero'
import { IHeroModel } from '../src/models/IHeroModel';
import { HeroModel } from '../src/models/HeroModel';


chai.use(chaiHttp);
const expect = chai.expect;

class TestData {

    public Superman: HeroModel;
    public Batman: HeroModel;

    constructor() {
        this.Superman = new HeroModel();
        this.Superman.displayName = "Superman";
        this.Superman.email = "batmanSmells@superman.com";
        this.Superman.password = "superPassword";

        this.Batman = new HeroModel();
        this.Batman.displayName = "Batman";
        this.Batman.email = "hello@batman.com";
        this.Batman.password = "SecretBatmanPassword";
    };
}

class TestDataProvider {
    public InsertHero(user: HeroModel): Promise<IHeroModel> {
        var newUser = new Hero(user);
        return newUser.save();
    }

    public InsertHeroes(callback: () => void) {
        var testData = new TestData();
        this.InsertHero(testData.Superman)
            .then(
            (hero) => this.InsertHero(testData.Batman).then((hero) => {
                callback();
            })
            );
    }

    public Clean() {
        return Hero.collection.drop();
    }
}

describe('GET api/v1/hero', () => {

    var testData = new TestData();
    var testDataProvider = new TestDataProvider();

    beforeEach(function (done) {
        //testDataProvider.Clean().then(() => testDataProvider.InsertHeroes(done));

        testDataProvider.InsertHeroes(done);

    });

    afterEach(function (done) {
        var testDataProvider = new TestDataProvider();

        testDataProvider.Clean()
            .then(() => done())
            .catch((err) => done()); //If collection does not exist it throws
    });
    
//Check if collection exists
// mongoose.connection.db.listCollections({name: 'mycollectionname'})
//     .next(function(err, collinfo) {
//         if (collinfo) {
//             // The collection exists
//         }
//     });


    it('resonds with JSON array', () => {
        return chai.request(app).get('/api/v1/hero')
            .then(res => {
                expect(res.status).to.be.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
            });
    });

    it('should include Batman and Superman', () => {


        return chai.request(app).get('/api/v1/hero')
            .then(res => {
                expect(res.body).to.have.length.of('2');

                var superman = res.body.find(user => user.displayName === testData.Superman.displayName);
                expect(superman.displayName).to.be.equal(testData.Superman.displayName);
                expect(superman.email).to.be.equal(testData.Superman.email);
                expect(superman.password).to.be.equal(testData.Superman.password);

                var batman = res.body.find(user => user.displayName === testData.Batman.displayName);
                expect(batman.displayName).to.be.equal(testData.Batman.displayName);
                expect(batman.email).to.be.equal(testData.Batman.email);
                expect(batman.password).to.be.equal(testData.Batman.password);
            });
    });

});


describe('POST api/v1/hero', () => {
    //TODO:
    it('should post an hero', () => {
        return chai.request(app)
            .post('/api/v1/hero')
            .send({ 'name': 'Java', 'lastName': 'Script' })
            .then((res) => {
                expect(res.status).to.be.equal(201);
            })
            .catch((err) => {
                throw err;
            });

    });
});