import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import Controller from '@/utils/interfaces/controller.interface';
import ErrorMiddleware from '@/middleware/error.middleware';
import helmet from 'helmet';
import exp from 'constants';

class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.intialiseDatabaseConnection();
        this.intialiseMiddleware();
        this.intialiseControllers(controllers);
        this.intialiseErrorHandling();
    }

    private intialiseMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false}));
        this.express.use(compression());
    }

    private intialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    } 

    private intialiseErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }

    private intialiseDatabaseConnection(): void {
        const { MONGO_USER, MONGO_PASSWD, MONGO_PATH } = process.env;

        mongoose.connect(
            ''
        );
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }
}

export default App;