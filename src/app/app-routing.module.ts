import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ProductComponent} from './components/product/product.component';
import {CartComponent} from './components/cart/cart.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {ThankYouComponent} from './components/thank-you/thank-you.component';
import {LoginComponent} from './components/login/login.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProfileGuard} from './components/guard/profile.guard';
import {PizzaComponent} from './components/pizza/pizza.component';
import {KfcComponent} from './components/kfc/kfc.component';
import {SandwichComponent} from './components/sandwich/sandwich.component';
import {SaladeComponent} from './components/salade/salade.component';
import {PastaComponent} from './components/pasta/pasta.component';
import {DessertComponent} from './components/dessert/dessert.component';
import {AboutusComponent} from './components/aboutus/aboutus.component';
import {TermsComponent} from './components/terms/terms.component';
import {PrivacyComponent} from './components/privacy/privacy.component';
import {ContactusComponent} from './components/contactus/contactus.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'product/:id', component: ProductComponent
  },
  {
   path: 'cart', component: CartComponent
  },
  {
    path: 'checkout', component: CheckoutComponent
  },
  {
    path: 'thank-you', component: ThankYouComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'profile', component: ProfileComponent , canActivate:[ProfileGuard]
  },
  {
    path: 'pizza', component: PizzaComponent
  },
  {
    path: 'kfc', component: KfcComponent
  },
  {
    path: 'sandwich', component: SandwichComponent
  },
  {
    path:'salade', component: SaladeComponent
  },
  {
    path:'pasta', component: PastaComponent
  },
  {
    path:'dessert', component: DessertComponent
  },
  {
    path:'aboutus', component: AboutusComponent
  },
  {
    path:'terms', component: TermsComponent
  },
  {
    path:'privacy', component: PrivacyComponent
  },
  {
    path:'contactus', component: ContactusComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
