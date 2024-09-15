import express, { Application } from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import router from './routes';

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

export default app;
