import { Component, OnInit,OnChanges } from '@angular/core';
import {CartService} from '../../services/cart.service';
import {OrderService} from '../../services/order.service';
import {NavigationExtras, Router} from "@angular/router";
import {NgxSpinnerService} from 'ngx-spinner';
import {CartModelServer} from '../../models/cart.model';
import {render} from 'creditcardpayments/creditCardPayments';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import {OrdService} from '../../services/ord.service';
import {getResponseURL} from '@angular/http/src/http_utils';

var paypal;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit,OnChanges {

// @ts-ignore
  cartTotal: number;
// @ts-ignore
  cartData: CartModelServer;
addScript: boolean =false;

  // @ts-ignore
  private details: string;

// @ts-ignore
  prix : string;
  // @ts-ignore
  x: string;







// @ts-ignore
  // @ts-ignore
//   paypalConfig = {
//   env:'sandbox',
//   client: {
//     sandbox: 'AdpEBmWBfTpyaViXgrZnQXqGXxnq7uTnOl8yCFgu5vd3vMnAjXuorxeD-oSx7fxt4cQZfdACIZupdPbl',
//     production: ''
//   },
//   commit: true,
//     // @ts-ignore
//   payment: (data, actions) => {
//     // @ts-ignore
//     return actions.payment.create({
//     payment: {
//       transaction: [
//
//         {amount: {total: this.cartTotal, currency: 'EUR'}}
//       ]
//     }
//     });
//   },
//     // @ts-ignore
//     ontAuthorize: (data, actions) => {
//       // @ts-ignore
//   return actions.payment.execute().then((payment) => {
//
//   })
//     }
// };


  constructor(private cartService:CartService,
              private orderService: OrderService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private ord:OrdService,

              ) {


  }
  handler:any = null;
  public payPalConfig?: IPayPalConfig;

  ngOnChanges(){
    // this.cartService.cartDataObs$.subscribe(data => this.cartData= data);
    // console.log(this.cartData.data)
    //
    //
    // this.cartService.cartTotal$.subscribe(total => {this.cartTotal = total;
    //   console.log(this.cartTotal)
    //
    //   if (this.cartTotal>0 ){
    //     this.renderPayPalButton();
    //   }
    // });
  }

  ngOnInit(): void {

    this.cartService.cartDataObs$.subscribe(data => this.cartData= data);
    console.log(this.cartData.data)


    this.cartService.cartTotal$.subscribe(total => {this.cartTotal = total;
        console.log(this.cartTotal)

      if (this.cartTotal>0 ){

        this.renderPayPalButton();
      }
    }
    );

    this.loadStripe();
  }

  renderPayPalButton() {

//value: this.cartTotal.toString(),

    render({
      id: "#paypalButton",
      currency: "EUR",
      value: this.cartTotal.toString(),
      onApprove: (details) => {
        console.log(details);

        this.router.navigate(['thank-you']);

      }
    });
  }
  onCheckout() {
    this.spinner.show().then(p => {

      this.cartService.CheckoutFromCart();

    });

  }




  pay(amount: any) {

    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51IlKJMJB5Ala1DpdmJDS9RyhhVD5xRRkSfhwQocSDnJonWPZEJrxzXnoiQypSArMA4RkqeEVH1jH61EiOqdk7X4300hDnSJs6T',
      locale: 'auto',

      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)
        //this.placeorder();
        // alert('Token Created!!');
      }
    });

    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: amount * 100
    });

  }

  loadStripe() {

    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {

        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
          locale: 'auto',

          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token);
           // this.placeorder();
            alert('Payment Success!!');
          }
        });
      }

      window.document.body.appendChild(s);
    }
  }













  //pay with google
  paymentRequest: google.payments.api.PaymentDataRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId'
          }
        }
      }
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant'
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',

      totalPrice:'10',
      currencyCode: 'EUR',
      countryCode: 'FR'
    },
    callbackIntents: ['PAYMENT_AUTHORIZATION']
  };

  onLoadPaymentData = (
    event: Event
  ): void => {
    const eventDetail = event as CustomEvent<google.payments.api.PaymentData>;
    console.log('load payment data', eventDetail.detail);
  }

  onPaymentDataAuthorized: google.payments.api.PaymentAuthorizedHandler = (
    paymentData
  ) => {
    console.log('payment authorized', paymentData);
    return {
      transactionState: 'SUCCESS'
    };
  }

  onError = (event: ErrorEvent): void => {
    console.error('error', event.error);
  }



  order = {

    fname:'',
    lname:'',
    email:'',
    adress: '',
    country:'',
    phone:'',
    description:'',
    order_details:'',


  };
  submitted = false;

 placeorder() {

     // this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
     // let dt = [this.cartService.cartDataObs$.getValue().data];

   let order_dt = '';
      this.cartData.data.forEach(val => {
     order_dt += `${val.numInCart}X ${val.product.name} , `;
   });


   // let fff=((Math.random() * 100000000) + 4);
let fff= makeid(9);


   // debugger
     const data = {
       id:fff ,
       fname: this.order.fname,
       lname: this.order.lname,
       email: this.order.email,
       adress: this.order.adress,
       country: this.order.country,
       phone: this.order.phone,
       description: this.order.description,
       order_details: order_dt,
       total_order: this.cartTotal,
     };


   this.ord.create(data)
       .subscribe(

         response => {

           this.submitted = true;
         },
         error => {
           console.log(error);
         });

   const navigationExtras: NavigationExtras = {
     state: {
        id: fff,
       fname: this.order.fname,
       lname: this.order.lname,
       email: this.order.email,
       adress: this.order.adress,
       country: this.order.country,
       phone: this.order.phone,
       description: this.order.description,
       order_details: order_dt,
       total_order: this.cartTotal,
     }
   };
     this.router.navigate(['/thank-you'], navigationExtras).then(p => {
       this.cartService.cartDataClient = {prodData: [{incart: 0, id: 0}], total: 0};
       this.cartService.cartTotal$.next(0);
       localStorage.setItem('cart', JSON.stringify(this.cartService.cartDataClient));
     });

 }

  newTutorial() {


    this.submitted = false;
    this.order = {

      fname:'',
      lname:'',
      email:'',
      adress: '',
      country:'',
      phone:'',
      description:'',
      order_details: '',



    };
  }
}
// function makeid(length:number) {
//   var result           = [];
//   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   var charactersLength = characters.length;
//   for ( var i = 0; i < length; i++ ) {
//     result.push(characters.charAt(Math.floor(Math.random() *
//       charactersLength)));
//   }
//   return result.join('');
// }
//
// console.log(makeid(8 ));


// let r = Math.random().toString(36).substring(2);
// console.log("random", r);
function makeid(length:number) {
  var result           = [];
  var characters       = '0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result.push(characters.charAt(Math.floor(Math.random() *
      charactersLength)));
  }
  return result.join('');
}

// console.log(makeid(8));
