import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { verifyToken } from '../../utiils/auth/jwt';
import { findUserById } from '../../services/user.service';
import {
    errorResponse,
    successResponse,
} from '../../utiils/responses/apiResponses';

const loginRequired = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const authHeader: string = req.headers['authorization'] || '';

        if (!authHeader) {
            return errorResponse(res, 'No token Provided', 401);
        }

        const token: string = authHeader.split(' ')[1];

        const decoded = verifyToken(token);

        const user = await findUserById(decoded.id);

        if (!user) {
            return errorResponse(res, 'Invalid or expired token', 404);
        }

        req.user = user;

        next();
    } catch (err: any) {
        if (
            err.name === 'TokenExpiredError' ||
            err.name === 'JsonWebTokenError'
        ) {
            err.message = 'Unauthorised. Please login with your details';
        }
        return next(errorResponse(res, err?.message, 401));
    }
};
export default loginRequired;
