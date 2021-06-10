import { Injectable } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private  _http: HttpClientModule) { }

  getprices(){

  // @ts-ignore
    this._http.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=EUR').map(result => this.result = result.json()) ;}
}
