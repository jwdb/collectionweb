import { Component, OnInit } from '@angular/core';
import { ApiClientService } from 'src/app/api-client.service';
import { ProductModel } from 'src/app/product/product.model';

@Component({
  selector: 'app-admin-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: ProductModel[];
  constructor(private apiClientService: ApiClientService) { }

  ngOnInit(): void {
    this.apiClientService.getAllProducts().subscribe(items => this.products = items);
  }
}
