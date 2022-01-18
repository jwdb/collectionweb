import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

  onFormSubmit() : void {

  }

  validateInput(field: string) : boolean {
    return (this.addressForm.get(field)?.invalid
           && (this.addressForm.controls[field]?.dirty 
                || this.addressForm.controls[field]?.touched))
          ?? false;
  }
}
