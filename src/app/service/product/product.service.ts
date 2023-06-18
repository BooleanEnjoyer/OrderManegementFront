import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../../entity/order/order";
import {Product} from "../../entity/product/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private httpClient: HttpClient) { }

  addProduct(product: Product): Observable<Product> {
    let url = environment.apiUrl + `/app/product`;
    return this.httpClient.post<Product>(url, product);
  }

  updateProduct(product: Product): Observable<Product> {
    let url = environment.apiUrl + `/app/product`;
    return this.httpClient.patch<Product>(url, product);
  }

  getProducts(page: number, limit: number, sortOption: string, sortOrder: string):Observable<Product[]> {
    let url = environment.apiUrl + `/app/product/${page}/${limit}?sortOption=${sortOption}&sortOrder=${sortOrder}`;
    return this.httpClient.get<Product[]>(url)
  }

  searchProducts(searchTerm: string, page: number, limit: number, sortOption: string, sortOrder: string) {
    let url = `${environment.apiUrl}/app/product/search/${page}/${limit}?searchTerm=${searchTerm}&sortOption=${sortOption}&sortOrder=${sortOrder}`;
    return this.httpClient.get<Product[]>(url);
  }

  deleteProduct(id : string){
    let url = `${environment.apiUrl}/app/product/${id}`;
    return this.httpClient.delete<Product>(url);
  }
}
