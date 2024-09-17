import dotenv from 'dotenv';

dotenv.config();

export const port = Number(process.env.PORT) || 3000;
export const dbUrl =
    process.env.DB_URL || 'mongodb://mongo:27017/mainstack-test';
export const nodeEnv = process.env.NODE_ENV || 'development';
export const jwtSecret = process.env.JWT_SECRET || '';
