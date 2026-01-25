import { RouterModule,Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { NgModule } from '@angular/core';
import { ProductCRUD } from './components/product-crud/product-crud';

export const routes: Routes = [

    // 1. Redirect the empty path to 'login'
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // 2. Define the login route
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'ProductCRUD', component: ProductCRUD },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule {}