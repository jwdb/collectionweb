import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModel } from '../product/product.model';
import { Observable, Subject } from 'rxjs';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ShoppingcartModule { 
  cart: {product: ProductModel, qty: number}[];
  shoppingCartChanged = new Subject<number>();

  constructor() {
    this.cart = [];
  }

  addToCart(product: ProductModel, qty: number) {
    let cartItem = this.cart.find(item => item.product.id == product.id);
    if (cartItem) {
      cartItem.qty += qty;
    } else {
      this.cart.push({product, qty});
    }

    this.shoppingCartChanged.next(this.cart.reduce((a,b) => a + b.qty,0));
  }

  getCart() : {product: ProductModel, qty: number}[] {
    return this.cart;
  }
}
