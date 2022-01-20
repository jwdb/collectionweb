import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProductModel } from '../product/product.model';
import { ShoppingcartService } from './shoppingcart.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {
  public cart: { product: ProductModel, qty: number, image: SafeUrl }[];
  public cartTotal: number;
  public cartCount: number;
  constructor(
    private shoppingCartService: ShoppingcartService,
    private sanitizer:DomSanitizer) {
   }

  ngOnInit(): void {
    this.loadCart();
    this.shoppingCartService.shoppingCartChanged.subscribe((newAmount) => this.updateCounts(newAmount));
    this.updateCounts(0);
  }

  updateCounts(_newAmount: number) : void {
    this.cartTotal = this.shoppingCartService.cartTotal;
    this.cartCount = this.shoppingCartService.cartCount;
    console.log("count changed!");
  }

  loadCart(): void {
    this.cart = this.shoppingCartService.getCart().items.flatMap(item => {
      let objectURL = 'data:image/jpeg;base64,' + item.product.image;
      let image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      return {product: item.product, qty: item.qty, image };
    });
  }

  remove(cartItem: { product: ProductModel, qty: number, image: SafeUrl }) {
    this.shoppingCartService.removeFromCart(cartItem.product, cartItem.qty);
    this.loadCart();
  }

  clearCart() : void {
    this.shoppingCartService.clearCart();
    this.loadCart();
  }
}
