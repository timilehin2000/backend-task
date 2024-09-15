import { Router } from 'express';
import validatorMiddleware from '../middleware/errorHandler/validator.middleware';
import { loginPayload, registerPayload } from '../validators/auth.validator';

const authRoutes = Router();

authRoutes.post('/register', validatorMiddleware(registerPayload));

authRoutes.post('/login', validatorMiddleware(loginPayload));

export default authRoutes;
