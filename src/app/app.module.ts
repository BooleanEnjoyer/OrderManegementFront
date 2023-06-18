import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes} from "@angular/router";
import { HeaderComponent } from './header/header.component';
import { ProductComponent } from './product/product.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './order/order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { MakeOrderComponent } from './make-order/make-order.component';
import { ProductManegeComponent } from './product-manege/product-manege.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { EditOrderFormComponent } from './edit-order-form/edit-order-form.component';


const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'product', component: ProductComponent},
  {path: 'order', component: OrderComponent},
  {path: 'order/details', component: OrderDetailsComponent},
  {path: 'order/make', component: MakeOrderComponent},
  {path: 'product-manege', component: ProductManegeComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    ProductComponent,
    OrderComponent,
    OrderDetailsComponent,
    MakeOrderComponent,
    ProductManegeComponent,
    ProductFormComponent,
    EditOrderFormComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
