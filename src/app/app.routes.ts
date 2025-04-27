import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { UsersListesComponent } from './components/users-listes/users-listes.component';

export const routes: Routes = [
    {path: '', component: CatalogComponent},
    {path: 'details/:id', component: ProductDetailsComponent},
    {path: 'users', component:UsersListesComponent },
];
