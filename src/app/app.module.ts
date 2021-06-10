import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxSpinnerModule} from "ngx-spinner";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import {FormsModule} from '@angular/forms';
// @ts-ignore
import {AuthServiceConfig, GoogleLoginProvider} from 'angularx-social-login';
import { SocialLoginModule } from 'angularx-social-login';
import { PizzaComponent } from './components/pizza/pizza.component';
import { KfcComponent } from './components/kfc/kfc.component';
import { SandwichComponent } from './components/sandwich/sandwich.component';
import {render} from 'creditcardpayments/creditCardPayments';
import {NgxPayPalModule} from 'ngx-paypal';
import { SaladeComponent } from './components/salade/salade.component';
import {PastaComponent} from './components/pasta/pasta.component';
import { DessertComponent } from './components/dessert/dessert.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { TermsComponent } from './components/terms/terms.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import {DataService} from './services/data.service';
import {GooglePayButtonModule} from '@google-pay/button-angular';




let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('699475759331-qrh04ddaaabia646lhgr7j9u43luot8i.apps.googleusercontent.com')
  }
]);
export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    HomeComponent,
    ProductComponent,
    ThankYouComponent,
    LoginComponent,
    ProfileComponent,
    PizzaComponent,
    KfcComponent,
    SandwichComponent,
    SaladeComponent,
    PastaComponent,
    DessertComponent,
    AboutusComponent,
    TermsComponent,
    PrivacyComponent,
    ContactusComponent


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    NoopAnimationsModule,
    FormsModule,
    SocialLoginModule,
    NgxPayPalModule,
    GooglePayButtonModule,



  ],
  providers: [
          {
            provide: AuthServiceConfig,
            useFactory: provideConfig
          },
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
