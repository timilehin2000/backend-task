import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const validatorMiddleware = (
    schema: Joi.Schema,
    property: 'body' | 'query' | 'params' = 'body',
): ((req: Request, res: Response, next: NextFunction) => void) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req[property], {
            allowUnknown: false,
        });

        if (error) {
            const message = error.details.map((err: Joi.ValidationErrorItem) => err.message).join(', ');
            console.log(error.details);

            //return an error message here
        }

        next();
    };
};

export default validatorMiddleware;
