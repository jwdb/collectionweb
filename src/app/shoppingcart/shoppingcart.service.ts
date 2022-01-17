import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModel } from '../product/product.model';
import { Observable, Subject } from 'rxjs';



@Injectable()
export class ShoppingcartService {
  private cart: { product: ProductModel, qty: number }[];
  shoppingCartChanged = new Subject<number>();

  constructor() {
  }

  addToCart(product: ProductModel, qty: number, max: number) {
    let cartItem = this.getCart().find(item => item.product.id == product.id);
    if (cartItem) {
      if ((cartItem.qty + qty) <= max) {
        cartItem.qty += qty;
      }
    } else if (qty <= max) {
      this.cart.push({ product, qty });
    }
    this.saveCart();
  }

  removeFromCart(product: ProductModel, qty: number) {
    let cartItem = this.getCart().find(item => item.product.id == product.id);

    if (cartItem == null)
      return;

    if (cartItem.qty >= qty) {
      this.cart.splice(this.cart.indexOf(cartItem), 1);
    } else {
      cartItem.qty -= qty;
    }
    this.saveCart();
  }

  saveCart( ) {

    localStorage.setItem("cart", JSON.stringify(this.cart));
    this.calculateTotal();

  }

  calculateTotal() {
    this.shoppingCartChanged.next(this.cart.reduce((a, b) => a + b.qty, 0));

  }

  getCart(): { product: ProductModel, qty: number }[] {
    this.cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart") ?? "") : [];
    return this.cart;
  }
}
