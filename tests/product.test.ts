import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import { Product } from '../src/models/product.model';
import { createNewProduct } from '../src/services/product.service';
import { createUser } from '../src/services/user.service';
import { generateToken } from '../src/utiils/auth/jwt';
import { User } from '../src/models/user.model';

const request = supertest(app);

const postId = new mongoose.Types.ObjectId().toString();

let token: string;

const userInput = {
    firstName: 'Timi',
    lastName: 'Abodunrin',
    email: 'timi@gmail.com',
    password: 'TimiPass123#',
};

beforeAll(async () => {
    const mongoURI = 'mongodb://localhost:27017/test_db';
    await mongoose.connect(mongoURI);

    const user = await createUser(userInput);
    token = generateToken(user);
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

beforeEach(async () => {
    await Product.deleteMany({});
});

const createProductResponse = {
    _id: postId,
    name: 'Men Jeans',
    description: 'Stylish and comfortable Jeans for men',
    category: 'Fashion',
    price: 350,
    quantity: 200,
};

const productInput = {
    name: 'Men Jeans',
    description: 'Stylish and comfortable Jeans for men',
    category: 'Fashion',
    price: 350,
    quantity: 200,
};

describe('Post', () => {
    describe('create product', () => {
        it('should create a new product', async () => {
            const { statusCode, body } = await request
                .post('/api/v1/products')
                .set('Authorization', `Bearer ${token}`)
                .send(productInput);

            expect(statusCode).toBe(201);
            expect(body.status).toBe(true);
            expect(body.data.name).toBe(createProductResponse.name);
            expect(body.data.description).toBe(
                createProductResponse.description,
            );
            expect(body.data.category).toBe(createProductResponse.category);
            expect(body.data.price).toBe(createProductResponse.price);
            expect(body.data.quantity).toBe(createProductResponse.quantity);
        });

        it('should return 401 if not authenticated', async () => {
            const { statusCode, body } = await request
                .post('/api/v1/products')
                .send(productInput);

            expect(body.status).toBe(false);
            expect(statusCode).toBe(401);
        });
    });

    describe('get products', () => {
        it('should get all products', async () => {
            await createNewProduct(productInput);

            await createNewProduct(productInput);

            const { statusCode, body } = await request.get('/api/v1/products');

            expect(statusCode).toBe(200);

            expect(body.status).toBe(true);

            expect(body.data.length).toBe(2);
        });
    });

    describe('get products', () => {
        it('should get all products', async () => {
            await createNewProduct(productInput);

            await createNewProduct(productInput);

            const { statusCode, body } = await request.get(`/api/v1/products/`);

            expect(statusCode).toBe(200);

            expect(body.status).toBe(true);

            expect(body.data.length).toBe(2);
        });

        it('should get a single products', async () => {
            const product = await createNewProduct(productInput);

            const { statusCode, body } = await request.get(
                `/api/v1/products/${product._id}`,
            );

            expect(statusCode).toBe(200);

            expect(body.status).toBe(true);

            expect(body.data.name).toBe(createProductResponse.name);
            expect(body.data.description).toBe(
                createProductResponse.description,
            );
            expect(body.data.category).toBe(createProductResponse.category);
            expect(body.data.price).toBe(createProductResponse.price);
            expect(body.data.quantity).toBe(createProductResponse.quantity);
        });
    });
});
