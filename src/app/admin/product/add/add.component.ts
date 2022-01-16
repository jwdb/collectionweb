import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiClientService } from 'src/app/api-client.service';
import { CacheService } from 'src/app/cache.service';
import { ProductModel } from 'src/app/product/product.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  productForm = new FormGroup({
    name: new FormControl(),
    price: new FormControl('0'),
    supply: new FormControl('1'),
    image: new FormControl(),
    imageSource: new FormControl()
  });
  public resultText: string = "";
  public hasError: boolean = false;
  public success: boolean = false;

  constructor(
    private apiClient: ApiClientService,
    private cache: CacheService
  ) { }

  ngOnInit(): void {
  }

  async onFileChange(event: any) {
    let image = event.currentTarget.files[0];

    this.productForm.patchValue({
      imageSource: await this.fileToByteArray(image)
    });
  }

  fileToByteArray(file: File) {
    return new Promise((resolve, reject) => {
      try {
        let reader = new FileReader();
        let fileByteArray: Byte[] = [];
        reader.readAsArrayBuffer(file);
        reader.onloadend = (evt) => {
          if (evt.target?.readyState == FileReader.DONE
            && evt.target.result != null
            && typeof (evt.target.result) != 'string') {
            let arrayBuffer: ArrayBuffer = evt.target.result;
            let array = new Uint8Array(arrayBuffer);
            for (let byte of array) {
              fileByteArray.push(byte);
            }
          }
          resolve(fileByteArray);
        }
      }
      catch (e) {
        reject(e);
      }
    })
  }

  onFormSubmit(): void {
    this.hasError = false;
    this.success = false;
    this.resultText = "";

    var product = new ProductModel();
    product.name = this.productForm.get('name')?.value ?? "";
    product.price = this.productForm.get('price')?.value ?? 0;
    product.supply = this.productForm.get('supply')?.value ?? 0;
    product.image = this.productForm.get('imageSource')?.value;

    this.apiClient
      .postProduct(product)
      .then(result => {
        if (result) {
          this.resultText = "Successfully added product!";
          this.success = true;
        }
      },(error) => {
        this.resultText = `Error occurred: (${error?.status})`
      });
    
    this.cache.cleanLocalStorage();
  }
}
