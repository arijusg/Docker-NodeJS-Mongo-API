import * as AWS from 'aws-sdk';

AWS.config.update({
    region: "eu-west-1"
});

export class dbDynamo {

    private db: AWS.DynamoDB;

    constructor() {
        this.db = new AWS.DynamoDB();
        //TODO:If DEV
        this.db.config.endpoint = "http://localhost:8000";
    }

    public CreateTable(callback?: () => void): void {
        var params = {
            TableName: "Questions",
            KeySchema: [
                { AttributeName: "title", KeyType: "HASH" },  //Partition key
                // { AttributeName: "title", KeyType: "RANGE" }  //Sort key
            ],
            AttributeDefinitions: [
                { AttributeName: "title", AttributeType: "S" },
                // { AttributeName: "title", AttributeType: "S" }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        };

        this.db.createTable(params, (err, data) => {
            this.Result(err, data, () => {
                this.WaitUntilTableCreated("Questions", callback)
            })
        });
    }

    private WaitUntilTableCreated(tableName: string, callback?: () => void): void {
        var params = {
            TableName: tableName
        };

        let myInterval = setInterval(
            () => {
                this.db.describeTable(params, (err, data) => {
                    if (data.Table.TableStatus === 'ACTIVE') {
                        clearInterval(myInterval);
                        if (typeof (callback) === 'function')
                            callback();
                    }
                })
            }, 500);
    }


    public DeleteTable(callback?: () => void): void {
        var params = {
            TableName: "Questions"
        };

        this.db.deleteTable(params, (err, data) => {
            this.Result(err, data, () => {
                this.WaitUntilTableDeleted("Questions", callback)
            })
        });
    }

    private WaitUntilTableDeleted(tableName: string, callback?: () => void) {
        var params = {
            TableName: tableName
        };

        let myInterval = setInterval(
            () => {
                this.db.describeTable(params, (err, data) => {
                    if (data === null && err.code === 'ResourceNotFoundException') {
                        clearInterval(myInterval);
                        if (typeof (callback) === 'function')
                            callback();
                    }
                })
            }, 500);
    }

    private Result(err, data, callback?: () => void) {
        if (err) {
            console.error("Unable to complete operation. \r\n Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Operation completed. \r\n JSON:", JSON.stringify(data, null, 2));
        }
        if (typeof (callback) === 'function')
            callback();
    }
}

var db = new dbDynamo();

//db.CreateTable(() => console.log('yay'));
//db.DeleteTable(() => console.log('yay'));

db.CreateTable(() => {
    db.DeleteTable(
        () => {
            console.log('Created and deleted table')
        }
    )
});
