import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AddComponent as AddProductComponent } from './admin/product/add/add.component';
import { ProductComponent as AdminProductComponent } from './admin/product/product.component';
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
      { path: 'product', component: AdminProductComponent},
      { path: 'product/add', component: AddProductComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
