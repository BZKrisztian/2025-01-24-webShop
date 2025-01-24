import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private kosar:any=[]
  private kosarSub=new BehaviorSubject<any>([]) //megjegyzi az erteket feliratkozaskor

  private productApi= "https://webshop01-d2a2b-default-rtdb.europe-west1.firebasedatabase.app/megrendelesek/" //check if name is the same


  constructor(private http: HttpClient) { }

  order(){
    let body={
      userName: "Sajtos Stangli",
      address: "Blaha aluljáró",
      order: this.kosar,
      status: "Felvéve",
      date: Date.now()
    }
    this.http.post(this.productApi+".json",body).subscribe({
      next: (res)=>{
      console.log("Rendelés leadva",res)
      this.deleteCart()
    },
    error:(err)=>console.log(err)
    }
    )
  }



  getCart(){
    return this.kosarSub
  }

  deleteCart(){
    this.kosar=[]
    this.kosarSub.next(this.kosar)
  }

  addProduct(product:any){
    let x = this.kosar.findIndex(
      (p:any)=>{return p.id=product.id}
    )
    console.log("elem",this.kosar[x])
    if(x!=-1){
      this.kosar[x].db = product.db
    }
    else{
      let termek = {...product}
      delete termek.leiras
      delete termek.keplink
      delete termek.mennyiseg
      this.kosar.push(termek)
    }

    this.kosar.push(product)

    this.kosarSub.next(this.kosar)
  }


}
