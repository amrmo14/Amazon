import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { SellersComponent } from './components/sellers/sellers.component';
import { ProductsComponent } from './components/products/products.component';
import { UsersService } from './services/users.service';
import { HttpClientModule } from '@angular/common/http';

import { EditUserComponent } from './components/edit-user/edit-user.component';


import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductComponent } from './components/product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
// 1. Import the libs you need
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { EditSellerComponent } from './components/edit-seller/edit-seller.component';

const firebaseConfig = {
  apiKey: "AIzaSyCpz7N83mSb4Rop6a6WvgVb3DZo8bCcZ8E",
  authDomain: "fir-92dfa.firebaseapp.com",
  projectId: "fir-92dfa",
  storageBucket: "fir-92dfa.appspot.com",
  messagingSenderId: "943817146627",
  appId: "1:943817146627:web:810503725eb277d60aa936",
  measurementId: "G-4VFHKVQL68"
};


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    DashboardComponent,
    UsersComponent,
    SellersComponent,
    ProductsComponent,
    AddProductComponent,
    EditUserComponent,
    ProductDetailsComponent,
    ProductComponent,
    EditSellerComponent,
  ],

  imports: [BrowserModule,

    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    


    AngularFirestoreModule,
    AngularFireAuthModule, 
    AngularFireStorageModule,
    AngularFireModule.initializeApp(firebaseConfig)
   

  ],
  providers: [UsersService],
  bootstrap: [AppComponent],
})
export class AppModule { }
