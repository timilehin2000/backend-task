import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import { User } from '../src/models/user.model';
import { createUser } from '../src/services/user.service';

const request = supertest(app);

const userId = new mongoose.Types.ObjectId().toString();
beforeAll(async () => {
    const mongoURI = 'mongodb://localhost:27017/test_db';
    await mongoose.connect(mongoURI);
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

beforeEach(async () => {
    await User.deleteMany({});
});

const createUserResponse = {
    _id: userId,
    firstName: 'Timi',
    lastName: 'Abodunrin',
    email: 'timi@gmail.com',
    password: 'TimiPass123#',
};

const userInput = {
    firstName: 'Timi',
    lastName: 'Abodunrin',
    email: 'timi@gmail.com',
    password: 'TimiPass123#',
};

describe('Auth', () => {
    describe('register user', () => {
        it('should register a new user', async () => {
            const { statusCode, body } = await request
                .post('/api/v1/auth/register')
                .send(userInput);

            expect(statusCode).toBe(201);

            expect(body.data.firstName).toEqual(createUserResponse.firstName);

            expect(body.data.lastName).toEqual(createUserResponse.lastName);

            expect(body.data.email).toEqual(createUserResponse.email);

            createUserResponse._id = body.data.id;
        });

        it('should not register a user with an existing email', async () => {
            await User.create(userInput);

            const { statusCode, body } = await request
                .post('/api/v1/auth/register')
                .send(userInput);

            expect(statusCode).toBe(409);

            expect(body.status).toEqual(false);

            expect(body).toHaveProperty('message');

            expect(body.message).toContain('User already exists');
        });
    });

    describe('login', () => {
        it('should login a user with correct credentials', async () => {
            await createUser(userInput);
            const { statusCode, body } = await request
                .post('/api/v1/auth/login')
                .send({
                    email: userInput.email,
                    password: userInput.password,
                });

            expect(statusCode).toBe(200);

            expect(body.status).toEqual(true);

            expect(body.data).toHaveProperty('token');
        });

        it('should not login a user with incorrect credentials', async () => {
            await createUser(userInput);

            const { statusCode, body } = await request
                .post('/api/v1/auth/login')
                .send({
                    email: 'wrong@example.com',
                    password: 'Wrongpassword4#',
                });

            expect(statusCode).toBe(400);

            expect(body.status).toEqual(false);

            expect(body.message).toContain('Invalid credentials');
        });
    });
});
