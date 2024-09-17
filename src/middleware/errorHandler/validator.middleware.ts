import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { errorResponse } from '../../utiils/responses/apiResponses';

const validatorMiddleware = (
    schema: Joi.Schema,
    property: 'body' | 'query' | 'params' = 'body',
): ((req: Request, res: Response, next: NextFunction) => void) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req[property], {
            allowUnknown: false,
        });

        if (error) {
            const errorMessage = error.details
                .map((err: Joi.ValidationErrorItem) => err.message)
                .join(', ');

            return errorResponse(res, errorMessage, 400);
        }

        next();
    };
};

export default validatorMiddleware;
