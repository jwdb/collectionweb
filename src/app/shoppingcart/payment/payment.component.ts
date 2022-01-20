import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingcartService } from '../shoppingcart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(private router : Router, private shoppingCart: ShoppingcartService) { }

  ngOnInit(): void {
  }

  pay() : void {
    this.shoppingCart.setPaid(true);
    this.router.navigate(['cart','success']);
  }

}
