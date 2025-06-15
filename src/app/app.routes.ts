import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { UsersListesComponent } from './components/users-listes/users-listes.component';
import { LoginComponent } from './components/login/login.component';
import { LoginSuccessComponent } from './components/login-success/login-success.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: 'catalogue', component: CatalogComponent},
    {path: '', component: HomeComponent},
    {path: 'details/:id', component: ProductDetailsComponent},
    {path: 'users', component:UsersListesComponent },
    {path: 'login', component: LoginComponent}, 
    {path: 'login-success', component: LoginSuccessComponent},
    {path: 'register', component: RegisterComponent},
];
