import { Component, OnInit } from '@angular/core';
import { Product } from '../entity/product/product';
import { ProductService } from '../service/product/product.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Order } from '../entity/order/order';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  constructor(private productService: ProductService) {}

  products: Product[] = [];
  displayedProducts: Product[] = [];
  itemsPerPage = 10;
  currentPage = 0;
  totalPages = 0;
  searchTerm = '';
  selectedSortOption = 'none';
  selectedSortOrder = 'asc';
  isAddFormOpen = false;
  selectedProduct !: Product ;

  ngOnInit() {
    this.getProducts();
  }

  openAddForm(selectedProduct : Product) {
    this.selectedProduct = selectedProduct;
    this.isAddFormOpen = true;
  }

  submitAddForm(newOrder: Order) {
    if(newOrder){
      alert('Pomyślnie złożyłeś zamówienie');
    }else {
      alert('Błąd przy składaniu zamówienia');
    }
    this.isAddFormOpen = false;
  }

  closeAddForm() {
    this.isAddFormOpen = false;
  }

  getProducts() {
    this.productService.getProducts(this.currentPage, this.itemsPerPage,
      this.selectedSortOption, this.selectedSortOrder)
      .subscribe((response: any) => {
        this.processResponseData(response);
      });
  }

  search() {
    this.productService.searchProducts(this.searchTerm, this.currentPage,
      this.itemsPerPage, this.selectedSortOption, this.selectedSortOrder)
      .subscribe((response: any) => {
        this.processResponseData(response);
      });
  }

  private processResponseData(response: any) {
    this.products = response.content.map(
      (productData: any) => new Product(productData.id, productData.name, productData.price)
    );
    this.totalPages = response.totalPages;
    this.displayedProducts = this.products;
  }

  changePage(pageIndex: number) {
    this.currentPage = pageIndex;
    if (this.searchTerm) {
      this.search();
    } else {
      this.getProducts();
    }
  }
}
