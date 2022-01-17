import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingcartService } from 'src/app/shoppingcart/shoppingcart.service';

@Component({
  selector: 'app-cartinfo',
  templateUrl: './cartinfo.component.html',
  styleUrls: ['./cartinfo.component.scss']
})
export class CartinfoComponent implements OnInit {
  cartCount: number = 0;
  shoppingCartSub: Subscription;
  constructor(private shoppingCart: ShoppingcartService) {
    this.shoppingCartSub = shoppingCart.shoppingCartChanged.subscribe(c => this.cartCount = c);
   }

  ngOnInit(): void {
    this.cartCount = this.shoppingCart.getCart().reduce((sum, item) => sum += item.qty, 0);
  }

  ngOnDestroy(): void {
    this.shoppingCartSub.unsubscribe();
  }

}
