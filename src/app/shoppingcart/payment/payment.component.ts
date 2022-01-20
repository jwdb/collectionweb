import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingcartService } from '../shoppingcart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public status: string;
  public disableButton: boolean;

  constructor(
    private router : Router,
    private shoppingCart: ShoppingcartService) { }

  ngOnInit(): void {
    this.status = "Pay!";
  }

  pay() : void {
    this.disableButton = true;
    this.status = "Processing...";
    this.shoppingCart.setPaid(true);
    this.shoppingCart.submitOrder().then(c => {
      this.status = "Processing...";
      if (c) {
        this.status = "";
        this.shoppingCart.clearCart();
        this.router.navigate(['cart','success']);
      } else {
        this.status = "An error occurred! try again later";
      }
      this.disableButton = false;
    })
  }

}
