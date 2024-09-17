import { Router } from 'express';
import validatorMiddleware from '../middleware/errorHandler/validator.middleware';
import {
    createProductSchema,
    getDeleteProductSchema,
    updateProductSchema,
} from '../validators/product.validator';
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getAProduct,
    updateProduct,
} from '../controllers/product.controller';
import loginRequired from '../middleware/auth/loginRequired';

const productRoutes = Router();

productRoutes.post(
    '/',
    loginRequired,
    validatorMiddleware(createProductSchema),
    createProduct,
);

productRoutes.get('/', getAllProducts);

productRoutes.get(
    '/:productId',
    validatorMiddleware(getDeleteProductSchema, 'params'),
    getAProduct,
);

productRoutes.patch(
    '/:productId',
    loginRequired,
    validatorMiddleware(updateProductSchema),
    updateProduct,
);

productRoutes.delete(
    '/:productId',
    validatorMiddleware(getDeleteProductSchema, 'params'),
    loginRequired,
    deleteProduct,
);

export default productRoutes;
