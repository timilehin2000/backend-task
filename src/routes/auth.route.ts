import { Router } from 'express';
import validatorMiddleware from '../middleware/errorHandler/validator.middleware';
import { loginSchema, registerSchema } from '../validators/auth.validator';
import { login, registerUser } from '../controllers/auth.controller';

const authRoutes = Router();

authRoutes.post('/register', validatorMiddleware(registerSchema), registerUser);

authRoutes.post('/login', validatorMiddleware(loginSchema), login);

export default authRoutes;
