import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { InfoComponent as AdminOrderInfoComponent } from './admin/orders/info/info.component';
import { OrdersComponent as AdminOrdersComponent } from './admin/orders/orders.component';
import { AddComponent as AdminAddProductComponent } from './admin/product/add/add.component';
import { ProductComponent as AdminProductComponent } from './admin/product/product.component';
import { AddComponent as AdminAddProductGroupComponent } from './admin/productgroup/add/add.component';
import { ProductgroupComponent as AdminProductGroupComponent } from './admin/productgroup/productgroup.component';
import { AdminguardService } from './guards/adminguard.service';
import { CartprogressguardService } from './guards/cartprogressguard.service';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DetailComponent as ProductDetailComponent } from './product/detail/detail.component';
import { DetailComponent as ProductGroupDetailComponent } from './productgroup/detail/detail.component';
import { AddressComponent } from './shoppingcart/address/address.component';
import { PaymentComponent } from './shoppingcart/payment/payment.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { SuccessComponent } from './shoppingcart/success/success.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: ShoppingcartComponent },
  { path: 'cart/address', component: AddressComponent, canActivate: [CartprogressguardService] },
  { path: 'cart/payment', component: PaymentComponent, canActivate: [CartprogressguardService] },
  { path: 'cart/success', component: SuccessComponent, canActivate: [CartprogressguardService]  },
  { path: 'product/:id', component: ProductDetailComponent},
  { path: 'productgroup/:id', component: ProductGroupDetailComponent},
  { path: 'admin',
   component: AdminComponent,
   canActivate: [AdminguardService],
   children: [
      { path: 'product', component: AdminProductComponent, children: [
        { path: 'add', component: AdminAddProductComponent},
        { path: 'edit/:id', component: AdminAddProductComponent}
      ]},
      { path: 'productgroup', component: AdminProductGroupComponent, children: [
        { path: 'add', component: AdminAddProductGroupComponent},
        { path: 'edit/:id', component: AdminAddProductGroupComponent}
      ]},
      { path: 'order', component: AdminOrdersComponent, children: [
        { path: 'detail/:id', component: AdminOrderInfoComponent},
      ]},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
