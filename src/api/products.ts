import { axiosInstance } from "../config/config.axios";

export interface IProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    sizes: string[];
    colors: string[];
    images: string[];
    createdAt: string;
    updatedAt: string;
    slug: string;
}

export interface IPagination {
    currentPage: number;
    limit: number;
    numberOfPages: number;
    next?: number;
}

export interface ProductResponse {
    status: string;
    code: number;
    message: string;
    results: number;
    pagination: IPagination;
    data: IProduct[];
}

export interface SingleProductResponse {
    status: string;
    code: number;
    message: string;
    data: IProduct;
}

export interface GetProductsParams {
    page?: number;
    limit?: number;
    category?: string;
    sort?: string;
}

export const getProducts = async (params: GetProductsParams = {}): Promise<ProductResponse> => {
    const queryParams: any = {
        page: params.page,
        limit: params.limit,
        sort: params.sort,
    };

    if (params.category && params.category !== "All") {
        queryParams.category = params.category;
    }

    const response = await axiosInstance.get<ProductResponse>("api/v1/products", {
        params: queryParams,
    });
    return response.data;
};

export const getProductById = async (id: string): Promise<SingleProductResponse> => {
    const response = await axiosInstance.get<SingleProductResponse>(`api/v1/products/${id}`);
    return response.data;
};
