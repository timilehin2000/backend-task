export interface IProductInput {
    name: string;
    description: string;
    category: string;
    price: number;
    quantity: number;
}

export interface FilterOptions {
    category?: string;
    price?: {
        $gte?: number;
        $lte?: number;
    };
    name?: string;
    rating?: { $gte: number };
    quantity: { $gt: number };
}

export interface PaginationOptions {
    page: number;
    limit: number;
    skip: number;
}

export interface SortOptions {
    [key: string]: 1 | -1;
}
