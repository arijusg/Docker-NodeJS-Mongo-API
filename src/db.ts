import * as mongoose from 'mongoose';

import * as MongoConfig from './MongoConfig';

export class db {

    connection: mongoose.Connection;

    private connectionTry: number = 0;

    public Open(callback?: () => void): void {
        this.configure(callback);
        this.connect();
    }

    private configure(callback?: () => void): void {
        this.connection = mongoose.connection;
        this.connection.on('error', console.error.bind(console, 'connection error:'));
        this.connection.once('open', function () {
            console.log("We are connected");
            if (callback !== undefined)
                callback();
        });
    }

    private connect(): void {
        var vm = this;
        vm.connectionTry++;
        console.log('Connecting to database...try #' + vm.connectionTry);

        mongoose.connect(MongoConfig.mongoUri[vm.getNodeEnvironment()], function (err) {
            if (err) {
                console.error('Failed to connect to mongo on startup - retrying in 2 sec', err);
                if (typeof (vm.connect) === 'function') {
                    setTimeout(() => {
                        vm.connect();
                    }, 2000);
                }
            }
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