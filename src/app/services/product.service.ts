import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ProductModelServer} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 private SERVER_URL = environment.serverURL;


constructor(private http: HttpClient) { }

/* fetch products m servers */
  getAllProducts(NumberOfResults=9) {
    return this.http.get(this.SERVER_URL + '/products', {
      params: {
        limit: NumberOfResults.toString()
      }
    });

}

  getAllPizza() {
    return this.http.get(this.SERVER_URL + '/products/category/pizza', {
    });

  }
  getAllPasta() {
    return this.http.get(this.SERVER_URL + '/products/category/pasta', {
    });

  }
  getAllSalade() {
    return this.http.get(this.SERVER_URL + '/products/category/salade', {
    });

  }
  getAllKfc() {
    return this.http.get(this.SERVER_URL + '/products/category/kfc', {
    });

  }

  getAllDessert() {
    return this.http.get(this.SERVER_URL + '/products/category/dessert', {
    });

  }

  getAllSandwich() {
    return this.http.get(this.SERVER_URL + '/products/category/Sandwich', {
    });

  }
  getAll(NumberOfResults=9) {
    return this.http.get(this.SERVER_URL + '/products/category/kfc', {
      params: {
        limit: NumberOfResults.toString()
      }
    });

  }
  getSingleProduct(id: number): Observable<ProductModelServer> {
    return this.http.get<ProductModelServer>(this.SERVER_URL + '/products/' + id);
  }
  getProductsFromCategory(catName: string): Observable<ProductModelServer[]> {
    return this.http.get<ProductModelServer[]>(this.SERVER_URL + 'products/category/' + catName);
  }
}
