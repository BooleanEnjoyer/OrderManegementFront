import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManegeComponent } from './product-manege.component';

describe('ProductManegeComponent', () => {
  let component: ProductManegeComponent;
  let fixture: ComponentFixture<ProductManegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductManegeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductManegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
