import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from '../entity/address/address';
import { Order } from '../entity/order/order';
import { Status } from '../entity/order/status';
import { Product } from '../entity/product/product';
import { OrderService } from '../service/order/order.service';

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css']
})
export class MakeOrderComponent implements OnInit {

  @Input()  isInUpdateMode!: boolean;
  @Input()  orderId!: string;

  @Input()  startingCity = '';
  @Input()  startingHouseNumber !: number;
  @Input()  startingStreet = '';
  @Input()  startingZipCode = '';

  @Input()  targetCity = '';
  @Input()  targetHouseNumber !: number;
  @Input()  targetStreet = '';
  @Input()  targetZipCode = '';

  @Input()  addressId!: string;
  @Input()  trackingCode!: string;
  @Input()  status!: Status;
  @Input()  product!: Product;
  @Input()  dateCreated !: Date;
  @Input()  lastUpdated !: Date;
  productName !: string;
  productPrice !: number;
  @Output() formSubmitted: EventEmitter<Order> = new EventEmitter<Order>();
  @Output() formClosed: EventEmitter<void> = new EventEmitter<void>();
  formGroup!: FormGroup;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.productName = this.product.name;
    this.productPrice = this.product.price;

    this.formGroup = new FormGroup({
      startingCity: new FormControl('', Validators.required),
      startingStreet: new FormControl('', Validators.required),
      startingHouseNumber: new FormControl('', Validators.required),
      startingZipCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{2}-[0-9]{3}')]),
      targetCity: new FormControl('', Validators.required),
      targetStreet: new FormControl('', Validators.required),
      targetHouseNumber: new FormControl('', Validators.required),
      targetZipCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{2}-[0-9]{3}')]),
    });
  }

  get startingCityControl() {return this.formGroup.get('startingCity');}
  get startingStreetControl() {return this.formGroup.get('startingStreet');}
  get startingHouseNumberControl() {return this.formGroup.get('startingHouseNumber');}
  get startingZipCodeControl() {return this.formGroup.get('startingZipCode');}
  get targetCityControl() {return this.formGroup.get('targetCity');}
  get targetStreetControl() {return this.formGroup.get('targetStreet');}
  get targetHouseNumberControl() {return this.formGroup.get('targetHouseNumber');}
  get targetZipCodeControl() {return this.formGroup.get('targetZipCode');}

  submitForm() {
    if (this.formGroup.valid){
      const orderData: Order = {
        id: this.orderId,
        status: this.status,
        trackingCode: this.trackingCode,
        startingAddress: new Address(this.addressId, this.startingStreet,
          this.startingHouseNumber,this.startingCity,this.startingZipCode),
        targetAddress: new Address(this.addressId, this.targetStreet,
          this.targetHouseNumber,this.targetCity,this.targetZipCode),
        product: this.product,
        dateCreated: this.dateCreated,
        lastUpdated: this.lastUpdated
      };

      this.orderService.addOrder(orderData).subscribe(
        (response) => {
          console.log('Zamówienie dodane pomyślnie', response);
          this.formSubmitted.emit(orderData);
        },
        (error) => {
          console.error('Błąd przy dodawaniu zamówienia', error);
        }
      );
    } else {
      console.log('Formularz jest nieprawidłowy. Wypełnij wymagane pola.');
      alert("Zamówienie jest nieprawidłowo wypełnione sprawdź poprawność wprowadzonych danych")
    }
  }

  closeForm() {
    this.formClosed.emit();
  }
}
