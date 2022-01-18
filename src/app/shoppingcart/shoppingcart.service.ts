import { Injectable } from '@angular/core';
import { ProductModel } from '../product/product.model';
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingcartService {
  private cart: { product: ProductModel, qty: number }[];
  shoppingCartChanged = new Subject<number>();
  public cartTotal: number;
  public cartCount: number;

  constructor() { }

  addToCart(product: ProductModel, qty: number, max: number) : void {
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

  removeFromCart(product: ProductModel, qty: number) : void {
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

  clearCart() : void {
    this.cart = [];
    this.saveCart();
  }

  saveCart() : void {
    localStorage.setItem("cart", JSON.stringify(this.cart));
    this.calculateTotal();
  }

  getCart(): { product: ProductModel, qty: number }[] {
    this.cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart") ?? "") : [];
    this.calculateTotal();
    return this.cart;
  }

  calculateTotal() {
    this.cartTotal = this.cart.reduce((sum, c) => sum += c.qty * c.product.price, 0);
    this.cartCount = this.cart.reduce((sum, c) => sum += c.qty, 0);
    this.shoppingCartChanged.next(this.cartCount);
  }
}
