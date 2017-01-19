import * as mongoose from 'mongoose';

import * as MongoConfig from './MongoConfig';

export class db {

    connection: mongoose.Connection;

    // Configure DB
    public Open(callback?: () => void): void {
        mongoose.connect(MongoConfig.mongoUri[this.getNodeEnvironment()])
        this.connection = mongoose.connection;
        this.connection.on('error', console.error.bind(console, 'connection error:'));
        this.connection.once('open', function () {
            console.log("We are connected");
            if (callback !== undefined)
                callback();
        });
    }

    public Close(): void {
        this.connection.close((err) => {
            console.log("We are disconnected");
        });
    }

    private getNodeEnvironment(): string {
        var nodeEnvironment: string;
        nodeEnvironment = process.env.NODE_ENV;
        if (nodeEnvironment === undefined) throw 'Set node environment first';
        console.log('MODE:::: ' + process.env.NODE_ENV);
        return nodeEnvironment;
    }
}