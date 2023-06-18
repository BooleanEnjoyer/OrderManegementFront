import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/entity/order/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  addOrder(order: Order): Observable<Order> {
    let url = environment.apiUrl + `/app/order`;
    return this.httpClient.post<Order>(url, order);
  }

  updateOrder(order: Order): Observable<Order> {
    let url = environment.apiUrl + `/app/order`;
    return this.httpClient.patch<Order>(url, order);
  }

  getOrders(page: number, limit: number, sortOption: string, sortOrder: string):Observable<Order[]> {
    let url = environment.apiUrl + `/app/order/${page}/${limit}?sortOption=${sortOption}&sortOrder=${sortOrder}`;
    return this.httpClient.get<Order[]>(url)
  }

  searchOrdersByTrackingCode(searchTerm: string, page: number, limit: number, sortOption: string, sortOrder: string) {
    let url = `${environment.apiUrl}/app/order/search/trackingCode/${page}/${limit}?searchTerm=${searchTerm}&sortOption=${sortOption}&sortOrder=${sortOrder}`;
    return this.httpClient.get<Order[]>(url);
  }

  searchOrdersByStatus(searchTerm: string, page: number, limit: number, sortOption: string, sortOrder: string) {
    let url = `${environment.apiUrl}/app/order/search/status/${page}/${limit}?searchTerm=${searchTerm}&sortOption=${sortOption}&sortOrder=${sortOrder}`;
    return this.httpClient.get<Order[]>(url);
  }

  deleteOrder(id : string){
    let url = `${environment.apiUrl}/app/order/${id}`;
    return this.httpClient.delete<Order>(url);
  }
}
