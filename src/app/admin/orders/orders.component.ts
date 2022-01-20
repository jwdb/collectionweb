import { Component, OnInit } from '@angular/core';
import { ApiClientService } from 'src/app/api-client.service';
import { OrderRequest } from 'src/app/models/order-request.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public orders: OrderRequest[];
  constructor(private apiClient: ApiClientService) { }

  ngOnInit(): void {
    this.apiClient.getAllOrders().subscribe(result => this.orders = result);
  }
}
