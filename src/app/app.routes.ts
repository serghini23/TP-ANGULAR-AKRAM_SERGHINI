import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { UsersListesComponent } from './components/users-listes/users-listes.component';
import { LoginComponent } from './components/login/login.component';
import { LoginSuccessComponent } from './components/login-success/login-success.component';

export const routes: Routes = [
    {path: '', component: CatalogComponent},
    {path: 'details/:id', component: ProductDetailsComponent},
    {path: 'users', component:UsersListesComponent },
    {path: 'login', component: LoginComponent}, 
    {path: 'login-success', component: LoginSuccessComponent},
];
