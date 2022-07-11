import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
<<<<<<< HEAD
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { SellersComponent } from './components/sellers/sellers.component';
import { ProductsComponent } from './components/products/products.component';
import { UsersService } from './services/users.service';
import { HttpClientModule } from '@angular/common/http';
=======
import { HomeComponent } from './components/home/home.component';

>>>>>>> AmrElkoumy
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
<<<<<<< HEAD
    DashboardComponent,
    UsersComponent,
    SellersComponent,
    ProductsComponent,
=======
    HomeComponent
>>>>>>> AmrElkoumy
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [UsersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
