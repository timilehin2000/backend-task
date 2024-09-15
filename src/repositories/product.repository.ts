import { IProduct, Product } from '../models/product.model';

export const createProduct = async (productData: IProduct): Promise<IProduct> => {
    const newUser = await new Product(Product).save();

    return newUser;
};

export const findAllProduct = async (): Promise<IProduct[]> => {
    const users = await Product.find({});

    return users;
};

export const findProductById = async (id: string): Promise<IProduct | null> => {
    const user = await Product.findOne({ _id: id });

    return user;
};
