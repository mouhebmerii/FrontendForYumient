import { Component, OnInit } from '@angular/core';
import {CartModelServer} from '../../models/cart.model';
import {CartService} from '../../services/cart.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // @ts-ignore
 authState : boolean;
      // @ts-ignore
  cartData: CartModelServer;
      // @ts-ignore
  cartTotal: number;


  constructor(public cartService: CartService,
         public userService: UserService
              ) { }

  ngOnInit(): void {

    // @ts-ignore
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
    this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
 this.userService.authState$.subscribe(authState => this.authState = authState);

  }

}
