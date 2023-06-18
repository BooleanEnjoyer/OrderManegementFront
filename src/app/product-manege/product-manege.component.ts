import { Component, OnInit } from '@angular/core';
import { Product } from '../entity/product/product';
import { ProductService } from '../service/product/product.service';

@Component({
  selector: 'app-product-manege',
  templateUrl: './product-manege.component.html',
  styleUrls: ['./product-manege.component.css']
})
export class ProductManegeComponent implements OnInit {

  constructor(private productService: ProductService) {}

  products: Product[] = [];
  displayedProducts: Product[] = [];
  itemsPerPage = 10;
  currentPage = 0;
  totalPages = 0;
  searchTerm = '';
  selectedSortOption = 'none';
  selectedSortOrder = 'asc';
  isFormOpen: boolean = false;
  isUpdating: boolean = false;
  productId!: string;
  productName!: string;
  productPrice!: number;

  ngOnInit() {
    this.getProducts();
  }

  closeForm() {
    this.isFormOpen = false;
    this.productId = '';
    this.isUpdating = false;
  }

  openAddForm() {
    this.isUpdating = false;
    this.productId = '';
    this.productName = '';
    this.productPrice = 0;
    this.isFormOpen = true;
  }

  openUpdateForm(product: Product) {
    this.isUpdating = true;
    this.productId = product.id;
    this.productName = product.name;
    this.productPrice = product.price;
    this.isFormOpen = true;
  }

  handleFormSubmitted() {
    this.isFormOpen = false;
    this.productId = '';
    this.isUpdating = false;
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts(this.currentPage, this.itemsPerPage,
      this.selectedSortOption, this.selectedSortOrder)
      .subscribe((response: any) => {
        this.processResponseData(response);
      });
  }

  deleteProduct(productId : string) {
    const confirmed = confirm('Napewno chcesz usunąć ten produkt?');
    if (confirmed) {
      this.productService.deleteProduct(productId)
        .subscribe(() => {
            this.getProducts();
          },
          error => {
            console.error('Błąd przy usuwaniu produktu', error);
          }
        );
    }
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
