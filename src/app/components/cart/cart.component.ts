import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {Observable} from "rxjs";
import {CartModelServer} from "../../models/cart.model";

@Component({
  selector: 'mg-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  // @ts-ignore
  cartData: CartModelServer;
  // @ts-ignore
  cartTotal: number;
  // @ts-ignore
  subTotal: number;

  constructor(public cartService: CartService) {
  }

  ngOnInit() {
    // @ts-ignore
    this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
    // @ts-ignore
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

  ChangeQuantity(id: number, increaseQuantity: boolean) {
    this.cartService.UpdateCartData(id, increaseQuantity);
  }

}
