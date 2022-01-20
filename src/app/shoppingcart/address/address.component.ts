import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShoppingcartService } from '../shoppingcart.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  addressForm = new FormGroup({
    name: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    zip: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
  });
  
  public resultText: string = "";
  public hasError: boolean = false;
  public success: boolean = false;

  constructor(private router: Router, private shoppingCart: ShoppingcartService) { }

  ngOnInit(): void {
  }

  onFormSubmit() : void {
    if (this.addressForm.invalid)
    {
      this.addressForm.markAllAsTouched();
      return;
    }
    const addressName = this.addressForm.value.name;
    const addressStreet = this.addressForm.value.street;
    const addressZip = this.addressForm.value.zip;
    const addressCity = this.addressForm.value.city;
    this.shoppingCart.saveAddress(addressName, addressStreet, addressZip, addressCity);

    this.router.navigate(['cart','payment']);
  }

  validateInput(field: string) : boolean {
    return (this.addressForm.get(field)?.invalid
           && (this.addressForm.controls[field]?.dirty 
                || this.addressForm.controls[field]?.touched))
          ?? false;
  }
}
