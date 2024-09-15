import { Response } from 'express';

export const sendSuccessResponse = (res: Response, message: string, data?: Object | Array<Object>, statusCode = 200) => {
    return res.status(statusCode).json({
        status: true,
        message,
        data,
    });
};

export const sendErrorResponse = (res: Response, message: string, data?: Object | Array<Object>, statusCode = 500) => {
    return res.status(statusCode).json({
        status: false,
        message,
        data,
    });
};
