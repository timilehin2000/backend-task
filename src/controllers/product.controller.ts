import { Request, Response } from 'express';
import {
    errorResponse,
    successResponse,
} from '../utiils/responses/apiResponses';
import {
    buildFilterOptions,
    buildPaginationOptions,
    buildSortOptions,
    createNewProduct,
    fetchProductsByFilter,
    findAndDelete,
    findAndUpdateProduct,
    findProductById,
} from '../services/product.service';
import { IProduct } from '../models/product.model';
import { Keyable } from '../types';
import {
    FilterOptions,
    PaginationOptions,
    SortOptions,
} from '../interfaces/product.interface';

export const createProduct = async (req: Request, res: Response) => {
    const { name, description, category, price, quantity } = req.body;

    try {
        const productData = {
            name,
            description,
            category,
            price,
            quantity,
        };

        const product = await createNewProduct(productData);

        return successResponse(
            res,
            'Product created successfully',
            product,
            201,
        );
    } catch (err) {
        return errorResponse(res, 'Error creating product', 500);
    }
};

export const getAllProducts = async (req: Request, res: Response) => {
    const filter = buildFilterOptions(req.query);

    const sort = buildSortOptions(req.query.sort as string | undefined);

    const pagination = buildPaginationOptions(
        req.query.page as string | undefined,
        req.query.limit as string | undefined,
    );

    try {
        const products = await fetchProductsByFilter(filter, sort, pagination);

        if (products.length === 0) {
            return errorResponse(
                res,
                'No products found. Please check your search input',
                404,
            );
        }

        return successResponse(
            res,
            'Products fetched successfully',
            products,
            200,
        );
    } catch (err) {
        return errorResponse(res, 'Error fetching products', 500);
    }
};

export const getAProduct = async (req: Request, res: Response) => {
    const { productId } = req.params;

    try {
        const product = await findProductById(productId);

        if (!product) {
            return errorResponse(res, 'Product not found', 404);
        }

        return successResponse(
            res,
            'Product fetched successfully',
            product,
            200,
        );
    } catch (err) {
        console.log(err);
        return errorResponse(res, 'Error fetching product', 500);
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    const { productId } = req.params;

    const productData: Partial<IProduct> = req.body;

    try {
        const product = await findProductById(productId);

        if (!product) {
            return errorResponse(res, 'Product not found', 404);
        }

        const updatedata: Partial<IProduct> = {};

        Object.entries(productData).forEach(([key, value]) => {
            if (value !== '') {
                updatedata[key as keyof IProduct] = value as any;
            }
        });

        const updatedProduct = await findAndUpdateProduct(
            productId,
            updatedata,
        );

        if (!updatedProduct) {
            return errorResponse(res, 'Product not found', 404);
        }

        return successResponse(
            res,
            'Product updated successfully',
            updatedProduct,
            200,
        );
    } catch (err) {
        return errorResponse(res, 'Error fetching product', 500);
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { productId } = req.params;

    try {
        const response = await findAndDelete(productId);

        if (!response) {
            return errorResponse(res, 'Product not found', 404);
        }

        return successResponse(res, 'Product deleted successfully', {}, 200);
    } catch (err) {
        return errorResponse(res, 'Error fetching product', 500);
    }
};
