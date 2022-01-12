import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../api-client.service';
import { ProductModel } from '../product/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: ProductModel[];
  constructor(private apiClient: ApiClientService) { }

  ngOnInit(): void {
    this.apiClient
      .getAllProducts()
      .subscribe(products => {
        this.products = products;
      });
  }

}
