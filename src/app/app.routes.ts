import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ProductFormComponent } from './components/product-form/product-form';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'create', component: ProductFormComponent },
	{ path: 'edit/:id', component: ProductFormComponent }
];
