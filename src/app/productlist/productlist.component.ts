import { Component } from '@angular/core';
import { ProductListService } from '../product-list.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.css'
})
export class ProductlistComponent {
  products:any

  constructor(private pServ: ProductListService, private cartServ:CartService){
    this.pServ.getProducts().subscribe(
      (termekek)=>this.products=termekek
    )
  }

  addProduct(product:any){
    this.cartServ.addProduct(product)
  }


}
