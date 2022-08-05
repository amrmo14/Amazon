import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditSellerComponent } from './components/edit-seller/edit-seller.component';

import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UserAuthGuard } from './components/Guards/user-auth.guard';
import { LoginComponent } from './components/login/login.component';

import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { ProductsComponent } from './components/products/products.component';
import { SellersComponent } from './components/sellers/sellers.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: '', component: DashboardComponent, pathMatch: 'full' ,canActivate :[UserAuthGuard]},
  { path: 'users', component: UsersComponent, pathMatch: 'full' },
  { path: 'users/:id', component: EditUserComponent, pathMatch: 'full' },
  { path: 'sellers', component: SellersComponent, pathMatch: 'full' },
  { path: 'sellers/:id', component: EditSellerComponent, pathMatch: 'full' },
  { path: 'products', component: ProductsComponent, pathMatch: 'full' },
  { path: 'addProduct', component: AddProductComponent, pathMatch: 'full' },
  { path: 'addProduct/:pid', component:AddProductComponent },
  { path: 'products/:pid', component: ProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
