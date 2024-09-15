import { Router, Request, Response } from 'express';
import authRoutes from './auth.route';

const router: Router = Router();

const routeVersion = '/api/v1';

router.use(`${routeVersion}/auth`, authRoutes);

router.use('*', (req: Request, res: Response) => {
    res.status(404).json({
        status: false,
        error: 'Page not found',
        route: req.originalUrl,
    });
});

export default router;
