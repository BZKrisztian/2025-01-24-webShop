import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private kosar:any=[]
  private kosarSub=new BehaviorSubject<any>([]) //megjegyzi az erteket feliratkozaskor

  constructor() { }

  getCart(){
    return this.kosarSub
  }


  addProduct(product:any){
    this.kosar.push(product)
    
    this.kosarSub.next(this.kosar)
  }


}
