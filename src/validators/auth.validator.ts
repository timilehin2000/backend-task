import Joi from 'joi';

export const registerSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Email is invalid',
    }),
    firstName: Joi.string().required().messages({
        'any.required': 'First Name is required',
    }),
    lastName: Joi.string().required().messages({
        'any.required': 'Last Name is required',
    }),
    password: Joi.string()
        .min(8)
        .max(30)
        .pattern(
            new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).+$'),
        )
        .required()
        .messages({
            'string.min': `Password should have a minimum length of 8`,
            'string.max': `Password should have a maximum length of 30`,
            'string.pattern.base': `Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character`,
            'any.required': `Password is a required field`,
        }),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Email is invalid',
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required',
    }),
});
1;
