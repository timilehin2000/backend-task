import express, { Application } from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import router from './routes';
import { notFound } from './middleware/errorHandler/notFound';

const app: Application = express();

app.use(cors());

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(express.json({}));

app.use(helmet());

app.use(router);

app.use('*', notFound);

export default app;
