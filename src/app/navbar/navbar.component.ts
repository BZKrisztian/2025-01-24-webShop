import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  cart:any

  constructor(private cartServ:CartService){
    this.cartServ.getCart().subscribe(
      (res)=>this.cart = res
    )
  }

  addOrder(){
    this.cartServ.order()
    
  }

}
