import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {CartService} from '../../services/cart.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {
  products: any[] = [];
  constructor( private productService: ProductService,
               private cartService: CartService,
               private router: Router) { }

  ngOnInit(): void {
    // @ts-ignore
    this.productService.getAllPizza().subscribe((prods: serverResponse ) => {
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
