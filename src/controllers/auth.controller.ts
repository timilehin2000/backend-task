import { Request, Response } from 'express';
import { createUser, findUserByEmail } from '../services/user.service';
import {
    successResponse,
    errorResponse,
} from '../utiils/responses/apiResponses';
import { generateToken } from '../utiils/auth/jwt';
import { IUser } from '../models/user.model';

export const registerUser = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const user = await findUserByEmail(email);

        if (user) {
            return errorResponse(res, 'User already exists', 409);
        }

        const userData = {
            firstName,
            lastName,
            email,
            password,
        };

        const response = await createUser(userData);

        return successResponse(res, 'User created successfully', response, 201);
    } catch (err: any) {
        errorResponse(res, 'Error creating user', 500);
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);

        if (!user) {
            return errorResponse(res, 'Invalid email or password', 400);
        }

        if (!user.comparePassword(password)) {
            return errorResponse(res, 'Invalid email or password', 400);
        }

        const token = generateToken(user);

        return successResponse(res, 'Login successfully', { token }, 200);
    } catch (err: any) {
        console.log(err);
        errorResponse(res, 'Error Loggin in user', 500);
    }
};
