import { Router, Request, Response } from 'express';
import authRoutes from './auth.route';
import productRoutes from './product.route';

const router: Router = Router();

const routeVersion = '/api/v1';

router.use(`${routeVersion}/auth`, authRoutes);

router.use(`${routeVersion}/products`, productRoutes);

export default router;
