import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CatalogComponent } from './components/catalog/catalog.component';

export const routes: Routes = [
    {path: '', component: CatalogComponent},
    {path: 'details/:id', component: ProductDetailsComponent},
];
