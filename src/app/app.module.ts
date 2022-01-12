import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './header/menu/menu.component';
import { BreadcrumbComponent } from './header/breadcrumb/breadcrumb.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProductgroupComponent } from './productgroup/productgroup.component';
import { ProductComponent } from './product/product.component';
import { AdminComponent } from './admin/admin.component';
import { AddComponent } from './admin/product/add/add.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { InfoComponent } from './admin/orders/info/info.component';
import { DetailComponent } from './product/detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    BreadcrumbComponent,
    FooterComponent,
    HomeComponent,
    ProductgroupComponent,
    ProductComponent,
    AdminComponent,
    AddComponent,
    OrdersComponent,
    InfoComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
