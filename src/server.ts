import http from 'http';
import dotenv from 'dotenv';
import app from './app';
import { connectDB } from './config/connect';
import { port } from './config/env.config';

dotenv.config();

//initialize server
const server = http.createServer(app);

// start the server
const startServer = async (): Promise<void> => {
    try {
        console.log(process.env.NODE_ENV);
        await connectDB();

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
        process.exit(1);
    }
};

startServer();
