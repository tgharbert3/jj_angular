import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LoggedInComponent } from './components/logged-in/logged-in.component';
import { AccCreatedComponent } from './components/acc-created/acc-created.component';

export const routes: Routes = [

    { path: "", component: HomeComponent },
    { path: "blog", component: BlogComponent },
    { path: "gallery", component: GalleryComponent },
    { path: "product_list", component: ProductListComponent },
    { path: "contact_us", component: ContactUsComponent },
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'logged_in', component: LoggedInComponent },
    { path: 'account_created', component: AccCreatedComponent },
    { path: '**', component: HomeComponent },

];
