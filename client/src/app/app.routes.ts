import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [

    { path: "", component: HomeComponent },
    { path: "blog", component: BlogComponent },
    { path: "gallery", component: GalleryComponent },
    { path: "product_list", component: ProductListComponent },
    { path: "contact_us", component: ContactUsComponent },
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: '**', component: HomeComponent },

];
