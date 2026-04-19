import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: bigint;
    pdf_url: string;
    image_url: string;
    name: string;
    description?: string;
    created_at: bigint;
    price: number;
    razorpay_link: string;
}
export interface backendInterface {
    addProduct(name: string, price: number, image_url: string, razorpay_link: string, pdf_url: string, description: string | null): Promise<Product>;
    deleteProduct(id: bigint): Promise<boolean>;
    getProducts(): Promise<Array<Product>>;
    getUploadUrl(filename: string, contentType: string): Promise<string>;
    updateProduct(id: bigint, name: string, price: number, image_url: string, razorpay_link: string, pdf_url: string, description: string | null): Promise<Product | null>;
}
