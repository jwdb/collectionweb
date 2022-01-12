import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../product/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: ProductModel[] = [
     { ID: "", Name: "Item 1", Price: 1, Supply: 0, GroupID: "" },
     { ID: "", Name: "Item 2", Price: 2, Supply: 0, GroupID: "" },
     { ID: "", Name: "Item 3", Price: 3, Supply: 0, GroupID: "" },
     { ID: "", Name: "Item 4", Price: 4, Supply: 0, GroupID: "" },
     { ID: "", Name: "Item 5", Price: 5.99, Supply: 0, GroupID: "" },
     { ID: "", Name: "Item 6", Price: 6, Supply: 0, GroupID: "" },
     { ID: "", Name: "Item 7", Price: 7, Supply: 0, GroupID: "" },
     { ID: "", Name: "Item 8", Price: 8, Supply: 0, GroupID: "" },
     { ID: "", Name: "Item 9", Price: 9, Supply: 0, GroupID: "" },
     { ID: "", Name: "Item 10", Price: 9.99, Supply: 0, GroupID: "" },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
