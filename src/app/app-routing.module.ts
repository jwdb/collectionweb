import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AddComponent as AdminAddProductComponent } from './admin/product/add/add.component';
import { ProductComponent as AdminProductComponent } from './admin/product/product.component';
import { AddComponent as AdminAddProductGroupComponent } from './admin/productgroup/add/add.component';
import { ProductgroupComponent as AdminProductGroupComponent } from './admin/productgroup/productgroup.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DetailComponent as ProductDetailComponent } from './product/detail/detail.component';
import { DetailComponent as ProductGroupDetailComponent } from './productgroup/detail/detail.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'product/:id', component: ProductDetailComponent},
  { path: 'productgroup/:id', component: ProductGroupDetailComponent},
  { path: 'admin', component: AdminComponent, children: [
      { path: 'product', component: AdminProductComponent, children: [
        { path: 'add', component: AdminAddProductComponent},
        { path: 'edit/:id', component: AdminAddProductComponent}
      ]},
      { path: 'productgroup', component: AdminProductComponent, children: [
        { path: 'add', component: AdminAddProductGroupComponent},
        { path: 'edit/:id', component: AdminProductGroupComponent}
      ]},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
