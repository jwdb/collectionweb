import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ApiClientService } from '../api-client.service';
import { ProductModel } from './product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product:ProductModel;
  image : SafeUrl;

  constructor(private apiClient: ApiClientService,
    private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    let objectURL = 'data:image/jpeg;base64,' + this.product.image;
    this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
}
