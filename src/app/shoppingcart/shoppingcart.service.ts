import { Injectable } from '@angular/core';
import { ProductModel } from '../product/product.model';
import { Subject } from 'rxjs';
import { Shoppingcart } from './shoppingcart.model';
import { ApiClientService } from '../api-client.service';
import { OrderRequest } from '../models/order-request.model';

@Injectable()
export class ShoppingcartService {
  private cart: Shoppingcart;
  shoppingCartChanged = new Subject<number>();
  public cartTotal: number;
  public cartCount: number;

  constructor(private apiClient: ApiClientService) { }

  addToCart(product: ProductModel, qty: number, max: number) : void {
    let cartItem = this.getCart().items.find(item => item.product.id == product.id);
    if (cartItem) {
      if ((cartItem.qty + qty) <= max) {
        cartItem.qty += qty;
      }
    } else if (qty <= max) {
      this.cart.items.push({ product, qty });
    }

    this.saveCart();
  }

  removeFromCart(product: ProductModel, qty: number) : void {
    let cartItem = this.getCart().items.find(item => item.product.id == product.id);

    if (cartItem == null)
      return;

    if (cartItem.qty >= qty) {
      this.cart.items.splice(this.cart.items.indexOf(cartItem), 1);
    } else {
      cartItem.qty -= qty;
    }

    this.saveCart();
  }

  clearCart() : void {
    this.cart.items = [];
    this.saveCart();
  }

  saveCart() : void {
    localStorage.setItem("cart", JSON.stringify(this.cart));
    this.calculateTotal();
  }

  getCart(): Shoppingcart {
    this.cart = localStorage.getItem("cart") ? Object.assign(new Shoppingcart(),JSON.parse(localStorage.getItem("cart") ?? "")) : new Shoppingcart();
    this.calculateTotal();
    return this.cart;
  }

  calculateTotal() : void {
    this.cartTotal = this.cart?.items?.reduce((sum, c) => sum += c.qty * c.product.price, 0) ?? 0;
    this.cartCount = this.cart?.items?.reduce((sum, c) => sum += c.qty, 0) ?? 0;
    this.shoppingCartChanged.next(this.cartCount);
  }

  saveAddress(name: string, street: string, zip: string, city: string) : void {
    this.getCart();
    this.cart.name = name;
    this.cart.street = street;
    this.cart.zip = zip;
    this.cart.city = city;
    this.saveCart();
  }

  setPaid(paid: boolean) {
    this.getCart();
    this.cart.isPaid = paid;
    this.saveCart();
  }

  submitOrder() : Promise<boolean> {
    const orderRequest = new OrderRequest();
    orderRequest.name = this.cart.name;
    orderRequest.zip = this.cart.zip;
    orderRequest.city = this.cart.city;
    orderRequest.street = this.cart.street;
    
    orderRequest.products = this.cart.items.map(c => {
      return {productID: c.product.id, qty: c.qty}
    });
    return this.apiClient
      .postOrder(orderRequest)
      .then(c => this.apiClient.clearCache())
      .then(c => c != null);
  }
}
