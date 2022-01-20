import { ProductModel } from "../product/product.model";

export class Shoppingcart {
  items: { product: ProductModel, qty: number }[] = [];
  name: string;
  street: string;
  zip: string;
  city: string;
  isPaid: boolean = false;

  public isAddressFufilled() : boolean {
    if (this.name && this.street && this.zip && this.city) {
      return true;
    }

    return false;
  }
}
