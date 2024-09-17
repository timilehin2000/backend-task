import { model, Schema, Document, Types } from 'mongoose';

export interface IProduct extends Document {
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true },
);

// Compound index for category and price to optimize queries that filter by both
ProductSchema.index({ category: 1, price: -1 });

export const Product = model<IProduct>('Product', ProductSchema);
