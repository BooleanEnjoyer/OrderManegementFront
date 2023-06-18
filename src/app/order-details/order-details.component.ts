import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Address } from '../entity/address/address';
import { Order } from '../entity/order/order';
import { Status } from '../entity/order/status';
import { Product } from '../entity/product/product';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  @Input() selectedOrder !: Order;
  @Output() formClosed: EventEmitter<void> = new EventEmitter<void>();
  @Output() formSubmitted: EventEmitter<Order> = new EventEmitter<Order>();

  id!: string;
  status!: Status;
  trackingCode!: string;

  startingCity!: string;
  startingHouseNumber!: number;
  startingStreet!: string;
  startingZipCode!: string;

  targetCity!: string;
  targetHouseNumber!: number;
  targetStreet!: string;
  targetZipCode!: string;

  productName!: string;
  productPrice!: number;
  dateCreated!: Date;
  lastUpdated!: Date;

  constructor() { }

  ngOnInit(): void {
    this.id = this.selectedOrder.id;
    this.status = this.selectedOrder.status;
    this.trackingCode = this.selectedOrder.trackingCode;

    this.startingCity = this.selectedOrder.startingAddress.city;
    this.startingHouseNumber = this.selectedOrder.startingAddress.houseNumber;
    this.startingStreet = this.selectedOrder.startingAddress.street;
    this.startingZipCode = this.selectedOrder.startingAddress.zipCode;

    this.targetCity = this.selectedOrder.targetAddress.city;
    this.targetHouseNumber = this.selectedOrder.targetAddress.houseNumber;
    this.targetStreet = this.selectedOrder.targetAddress.street;
    this.targetZipCode = this.selectedOrder.targetAddress.zipCode;

    this.productName = this.selectedOrder.product.name;
    this.productPrice = this.selectedOrder.product.price;
    this.dateCreated = this.selectedOrder.dateCreated;
    this.lastUpdated = this.selectedOrder.lastUpdated;
  }

  closeForm() {
    this.formClosed.emit();
  }
}
