import { axiosInstance } from "../config/config.axios";

export interface IProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    sizes: string[];
    images: string[];
    createdAt: string;
    updatedAt: string;
    slug: string;
}

export interface IPagination {
    currentPage: number;
    limit: number;
    numberOfPages: number;
}

export interface ProductResponse {
    status: string;
    code: number;
    message: string;
    results: number;
    pagination: IPagination;
    data: IProduct[];
}

export const getProducts = async (): Promise<ProductResponse> => {
    const response = await axiosInstance.get<ProductResponse>("api/v1/products");
    return response.data;
};
