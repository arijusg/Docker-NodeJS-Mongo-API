import { db } from '../db';
import * as Question from '../models/Question';
import { IQuestionModel } from '../models/IQuestionModel';
import { QuestionModel } from '../models/QuestionModel';

const questionData = require('../data/question-data');

export class QuestionImporter {

    _database: db;

    constructor() {
        this._database = new db();
    }

    private SetupDatabase() {
        this._database.Open();
    }

    public InsertInitialData() {
        //TODO: Does it need chaining?
        this.SetupDatabase();
        this.DropQuestionCollection();
        this.InsertQuestions();
        this._database.Close();
    }

    private DropQuestionCollection() {
        if (Question.db.collections[Question.collection.collectionName] !== undefined) {
            Question.db.collections[Question.collection.collectionName].drop(() => {
                console.log('Collection: ' + Question.collection.collectionName + ' Deleted');
            });
        }
    }

    private InsertQuestions() {
        for (var i: number = 0; i < questionData.length; i++) {
            var questionModel = <QuestionModel>questionData[i];
            var question = new Question(questionModel);
            question.save((err, q) => {
                if (err) console.error(err);
            });
        }
    }
}

var qi = new QuestionImporter();
qi.InsertInitialData();