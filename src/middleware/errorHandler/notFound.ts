import { Request, Response, NextFunction } from 'express';

export const notFound = (req: Request, res: Response) => {
    res.status(404).json({
        status: false,
        error: 'Page not found',
        route: req.originalUrl,
    });
};
