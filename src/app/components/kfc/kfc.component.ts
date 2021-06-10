import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {CartService} from '../../services/cart.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-kfc',
  templateUrl: './kfc.component.html',
  styleUrls: ['./kfc.component.scss']
})
export class KfcComponent implements OnInit {
  products: any[] = [];
  constructor( private productService: ProductService,
               private cartService: CartService,
               private router: Router) { }

  ngOnInit(): void {
    // @ts-ignore
    this.productService.getAllKfc().subscribe((prods: serverResponse ) => {
      this.products = prods.products;
      console.log(this.products);
    });



  }
  selectProduct(id: Number) {
    this.router.navigate(['/product', id]).then();

  }

  AddToCart(id: number) {
    this.cartService.AddProductToCart(id);

  }
}
