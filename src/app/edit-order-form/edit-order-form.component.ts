import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Address } from '../entity/address/address';
import { Order } from '../entity/order/order';
import { Status } from '../entity/order/status';
import { Product } from '../entity/product/product';
import { OrderService } from '../service/order/order.service';

@Component({
  selector: 'app-edit-order-form',
  templateUrl: './edit-order-form.component.html',
  styleUrls: ['./edit-order-form.component.css']
})
export class EditOrderFormComponent implements OnInit {
  
  @Input() selectedOrder !: Order;
  @Input()  status = Status.PLACED;
  @Output() formSubmitted: EventEmitter<Order> = new EventEmitter<Order>();
  @Output() formClosed: EventEmitter<void> = new EventEmitter<void>();
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {}

  submitForm() {
    const orderData: Order = {
      id: this.selectedOrder.id,
      status: this.status,
      trackingCode: this.selectedOrder.trackingCode,
      startingAddress: this.selectedOrder.startingAddress,
      targetAddress: this.selectedOrder.targetAddress,
      product: this.selectedOrder.product,
      dateCreated: this.selectedOrder.dateCreated,
      lastUpdated: this.selectedOrder.lastUpdated
    };
    
    if (!this.selectedOrder.id) {
      alert('Ktoś mógł usunąć twoje zamówienie.');
      return;
    }

    this.orderService.updateOrder(orderData).subscribe(
      (response) => {
        console.log('Zamówienie zmodyfikowane pomyślnie.', response);
        this.formSubmitted.emit(orderData);
      },
      (error) => {
        console.error('Błąd podczaz modyfikacji zamówienia.', error);
      }
    );
  }

  closeForm() {
    this.formClosed.emit();
  }
}
