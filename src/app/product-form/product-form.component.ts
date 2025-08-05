import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../entity/product/product';
import { ProductService } from '../service/product/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Input() product: Product = {
    id: '',
    name: '',
    price: 0
  };
  @Input() isInUpdateMode!: boolean;
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();
  @Output() formClosed: EventEmitter<void> = new EventEmitter<void>();

  constructor(private productService: ProductService) {}

  ngOnInit() {}

  submitForm() {
    if (this.nameIsValid() || this.priceIsValid()) {
      alert('Prosze wprowadzic poprawne pola.');
      return;
    }

    const productData = {
      id: this.product.id,
      name: this.product.name,
      price: this.product.price
    };

    if (this.isInUpdateMode) {

      if (!this.product.id) {
        alert('Ktoś mógł usunąć twój produkt.');
        return;
      }
      // if (!this.product.id) {
      //   alert('Ktoś mógł usunąć twój produkt.');
      //   return;
      // }
      console.log('PRODUCT DATA ' + productData)
      this.productService.updateProduct(productData).subscribe(response => {
        console.log('Produkt zmieniony pomyślnie', response);
        this.formSubmitted.emit();
      }, error => {
        console.error('Bład przy zmienianiu produktu', error);
      });
    } else {
      this.productService.addProduct(productData).subscribe(response => {
        console.log('Produkt dodany pomyślnie', response);
        this.formSubmitted.emit();
      }, error => {
        console.error('Błąd przy dodawaniu produktu', error);
      });
    }
  }

  private priceIsValid() {
    return !this.product.price || this.product.price <= 0;
  }

  private nameIsValid() {
    return !this.product.name;
  }

  closeForm() {
    this.formClosed.emit();
  }
}
