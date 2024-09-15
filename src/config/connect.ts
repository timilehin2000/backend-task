import mongoose, { ConnectOptions } from 'mongoose';
import config from 'config';
import dotenv from 'dotenv';

dotenv.config();

const dbURI = process.env.DB_URL || '';

export const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);

        console.log('Database is connected');
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};
