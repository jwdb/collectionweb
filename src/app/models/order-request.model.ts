export class OrderRequest {
    id: string;
    name: string;
    street: string;
    zip: string;
    city: string;
    products: { productID : string, productName?: string, qty: number }[]
}
