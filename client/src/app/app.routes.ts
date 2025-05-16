import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "blog", component: BlogComponent },
    { path: "gallery", component: BlogComponent },
    { path: "product_list", component: BlogComponent },
    { path: "contact_us", component: BlogComponent }
];
