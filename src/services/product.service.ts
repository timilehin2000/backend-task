import {
    FilterOptions,
    IProductInput,
    PaginationOptions,
    SortOptions,
} from '../interfaces/product.interface';
import { IProduct, Product } from '../models/product.model';
import { Keyable } from '../types';

export const createNewProduct = async (
    productData: IProductInput,
): Promise<IProduct> => {
    const newProduct = await new Product(productData).save();

    return newProduct;
};

export const findAllProduct = async (): Promise<IProduct[]> => {
    const product = await Product.find({});

    return product;
};

export const findProductById = async (
    productId: string,
): Promise<IProduct | null> => {
    const product = await Product.findById(productId);

    return product;
};

export const fetchProductsByFilter = async (
    filter: FilterOptions,
    sortBy: SortOptions,
    { skip, limit }: PaginationOptions,
): Promise<IProduct[]> => {
    const products = await Product.find(filter)
        .sort(sortBy)
        .limit(limit)
        .skip(skip)
        .lean();

    return products;
};

export const findAndUpdateProduct = async (
    id: string,
    productData: Partial<IProduct>,
): Promise<IProduct | null> => {
    const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
        new: true,
    });

    return updatedProduct;
};

export const findAndDelete = async (
    productId: string,
): Promise<IProduct | null> => {
    const deleteProduct = await Product.findByIdAndDelete(productId);

    return deleteProduct;
};

export const buildFilterOptions = (query: Keyable): FilterOptions => {
    const { name, category, minPrice, maxPrice } = query;

    const filter: FilterOptions = { quantity: { $gt: 0 } };

    if (category) filter.category = category;

    if (name) filter.name = name;

    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    return filter;
};

export const buildSortOptions = (sort: string | undefined): SortOptions => {
    switch (sort) {
        case 'priceAsc':
            return { price: 1 };
        case 'priceDesc':
            return { price: -1 };
        default:
            return {};
    }
};

export const buildPaginationOptions = (
    page: string | undefined,
    limit: string | undefined,
): PaginationOptions => {
    let pageNo = page ? Number(page) : 1;
    let pageLimit = limit ? Number(limit) : 24;
    let skip = pageNo === 1 ? 0 : pageLimit * (pageNo - 1);

    return {
        page: pageNo,
        limit: pageLimit,
        skip: skip,
    };
};
