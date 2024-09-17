import Joi from 'joi';

export const createProductSchema = Joi.object({
    name: Joi.string().required().min(2).messages({
        'any.required': 'Name is required',
        'base.string': 'Name must be a string',
    }),
    description: Joi.string().required().min(8).messages({
        'any.required': 'description is required',
        'base.string': 'description must be a string',
    }),
    category: Joi.string().required().min(2).messages({
        'any.required': 'Category is required',
        'base.string': 'Category must be a string',
    }),
    price: Joi.number().required().messages({
        'any.required': 'Price is required',
        'base.number': 'Price must be a number',
    }),
    quantity: Joi.number().required().messages({
        'any.required': 'Quantity is required',
        'base.number': 'Quantity must be a number',
    }),
});

export const updateProductSchema = Joi.object({
    name: Joi.string().optional().min(2).messages({}),
    description: Joi.string().optional().min(8).messages({}),
    category: Joi.string().optional().min(2).messages({}),
    price: Joi.number().optional().messages({}),
    quantity: Joi.number().optional().messages({}),
});

const productIdSchema = Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
        'any.required': 'productId is required',
        'base.string': 'productId must be a string',
        'string.pattern.base': 'Invalid ID format.',
    });

export const getDeleteProductSchema = Joi.object({
    productId: productIdSchema,
});
