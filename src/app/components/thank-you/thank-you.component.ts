import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../services/order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {

  orderId: number;

  fname: string;

  lname: string;

  email: string;

  adress: string;

  country: string;
  phone: number;

  description: string;

  order_details: string;

  cartTotal: number;
  constructor(private router: Router,
              private orderService: OrderService) {
    const navigation = this.router.getCurrentNavigation();
    // @ts-ignore
    const state = navigation.extras.state as {
      id: number,
      fname: string,
      lname: string,
      email: string,
      adress: string,
      country: string,
      phone: number,
      description: string,
      order_details: string,
      total_order: number,
    };

      this.orderId= state.id;
      this.fname= state.fname;
      this.lname= state.lname;
      this.email= state.email;
      this.adress= state.adress;
      this.country= state.country;
      this.phone= state.phone;
      this.description= state.description;
      this.order_details= state.order_details;
      this.cartTotal= state.total_order;
  }

  ngOnInit(): void {
  }
  copyMessage(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.orderId.toString();
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    var tooltip = document.getElementById("myTooltip");
    // @ts-ignore
    tooltip.innerHTML = "Copied"

  }

}
