import { Component, OnInit } from '@angular/core';
import { Address } from '../entity/address/address';
import { Order } from '../entity/order/order';
import { Status } from '../entity/order/status';
import { Product } from '../entity/product/product';
import { OrderService } from '../service/order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private orderService: OrderService) {}

  orders: Order[] = [];
  displayedOrders: Order[] = [];
  itemsPerPage = 10;
  currentPage = 0;
  totalPages = 0;
  searchTerm = '';
  selectedSortOption = 'none';
  selectedSortOrder = 'asc';
  findOption = 'all';
  isDetailsFormOpen = false;
  isEditFormOpen = false;
  isAddFormOpen = false;
  selectedOrder !: Order;

  ngOnInit() {
    this.getOrders();
  }

  openEditForm(order: Order) {
    this.selectedOrder = order;
    this.isEditFormOpen = true;
  }

  submitEditForm(updatedOrder: Order) {
    console.log(updatedOrder);
    this.isEditFormOpen = false;
    this.getOrders();
  }

  closeEditForm() {
    this.isEditFormOpen = false;
  }

  openDetailsForm(order: Order): void {
    this.selectedOrder = order;
    this.isDetailsFormOpen = true;
  }

  closeDetailsForm() {
    this.isDetailsFormOpen = false;
  }

  getOrders() {
    this.orderService.getOrders(this.currentPage, this.itemsPerPage,
      this.selectedSortOption, this.selectedSortOrder)
      .subscribe((response: any) => {
        this.processResponseData(response);
      });
  }

  deleteOrder(orderId : string) {
    const confirmed = confirm('Napewno chcesz usunąć zamówienie?');
    if (confirmed) {
      this.orderService.deleteOrder(orderId)
        .subscribe(() => {
            this.getOrders();
          },
          error => {
            console.error('Błąd przy usuwaniu zamówienia:', error);
          }
        );
    }
  }

  search() {
    console.log(this.findOption)
    if(this.findOption === "status"){
      this.orderService.searchOrdersByStatus(this.searchTerm, this.currentPage,
        this.itemsPerPage, this.selectedSortOption, this.selectedSortOrder)
        .subscribe((response: any) => {
          this.processResponseData(response);
        });
    }else if(this.findOption === "trackingCode"){
      this.orderService.searchOrdersByTrackingCode(this.searchTerm, this.currentPage,
        this.itemsPerPage, this.selectedSortOption, this.selectedSortOrder)
        .subscribe((response: any) => {
          this.processResponseData(response);
        });
    }else {
      this.orderService.getOrders(this.currentPage, this.itemsPerPage,
        this.selectedSortOption, this.selectedSortOrder)
        .subscribe((response: any) => {
          this.processResponseData(response);
        });
    }
  }

  private processResponseData(response: any) {
    this.orders = response.content.map(
      (orderData: any) => new Order(
        orderData.id,
        orderData.trackingCode,
        orderData.status,
        orderData.startingAddress,
        orderData.targetAddress,
        orderData.product,
        orderData.dateCreated,
        orderData.lastUpdated)
    );
    this.totalPages = response.totalPages;
    this.displayedOrders = this.orders;
  }

  changePage(pageIndex: number) {
    this.currentPage = pageIndex;
    if (this.searchTerm) {
      this.search();
    } else {
      this.getOrders();
    }
  }
}
