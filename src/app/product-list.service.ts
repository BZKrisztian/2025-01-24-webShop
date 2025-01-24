import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  // private productApiURL = "http://localhost:3000/termekek/";
  private productApiURL = "https://webshop01-d2a2b-default-rtdb.europe-west1.firebasedatabase.app/termekek/";
  private productsSub = new BehaviorSubject<any>(null); //?

  constructor(private http: HttpClient) { // private http: HttpClient
    this.downloadProducts();
  }  

  getProducts(){
    return this.productsSub;
  }

  private downloadProducts(){ //private = tenyleges adatletoltes ne tortenjen, 
    this.http.get(this.productApiURL+".json").subscribe( //subscribe=? / ".json" = 
      (products:any)=>{
        console.log(Object.keys(products)) //array az id-k miatt
        
        let tomb=[]
        for (const key in products) {
            tomb.push({id:key,db:0, ...products[key]}) 
        } // forciklus id adasnak
        console.log(tomb)
        this.productsSub.next(tomb)
      } //?
    )
  }

  postProduct(products:any){
    this.http.post(this.productApiURL,products).forEach(
      ()=>this.downloadProducts() // pattern+logic ?
    )
  }
  putProduct(products:any){
    this.http.put(this.productApiURL+products.id,products).forEach(
      ()=>this.downloadProducts()
    )
  }
  deleteProduct(products:any){
    this.http.delete(this.productApiURL+products.id).forEach(
      ()=>this.downloadProducts()
    )
  }


}
