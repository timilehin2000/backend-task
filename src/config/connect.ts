import mongoose, { ConnectOptions } from 'mongoose';
import config from 'config';
import dotenv from 'dotenv';
import { dbUrl } from './env.config';

dotenv.config();

const dbURI = dbUrl;

export const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);

        console.log('Database is connected');
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};
