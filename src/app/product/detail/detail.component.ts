import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ApiClientService } from 'src/app/api-client.service';
import { ShoppingcartService } from 'src/app/shoppingcart/shoppingcart.service';
import { ProductModel } from '../product.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  product: ProductModel;
  image: SafeUrl;

  constructor(
    private apiClient: ApiClientService,
     private routeState: ActivatedRoute,
    private sanitizer:DomSanitizer,
    private shoppingCart : ShoppingcartService) { }

  ngOnInit(): void {
    this.routeState.params.subscribe(c => {
      this.apiClient.getProduct(c["id"]).subscribe(h => {
        this.product = h;
        let objectURL = 'data:image/jpeg;base64,' + this.product.image;
        this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      });
    })
  }

  addToCart(amount: number) : void {
    this.shoppingCart.addToCart(this.product, amount, this.product.supply);
  }
}
