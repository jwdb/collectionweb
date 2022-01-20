export class OrderRequest {
    name: string;
    street: string;
    zip: string;
    city: string;
    products: { productID : string, qty: number }[]
}
