import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingcartModule } from 'src/app/shoppingcart/shoppingcart.module';

@Component({
  selector: 'app-cartinfo',
  templateUrl: './cartinfo.component.html',
  styleUrls: ['./cartinfo.component.scss']
})
export class CartinfoComponent implements OnInit {
  cartCount: number = 0;
  shoppingCartSub: Subscription;
  constructor(private shoppingCart: ShoppingcartModule) {
    this.shoppingCartSub = shoppingCart.shoppingCartChanged.subscribe(c => this.cartCount = c);
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.shoppingCartSub.unsubscribe();
  }

}
