import { Component, Injectable, OnInit } from '@angular/core';
import {Category} from '../models/category.model'
import { ProductService } from '../services/product/product.service';
import SwiperCore,  {Autoplay, Pagination} from 'swiper/core';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser'
import { Product } from '../models/product.model';
import {CartService} from '../services/cart/cart.service'
SwiperCore.use([Autoplay, Pagination]);
@Injectable(
  {
    providedIn: 'root'
  }
)
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  categories: Category[] = []
  products: Product[] = []
  centered = true ; 
  unbounded = true
  connected
  constructor(

    // import service 
    private productService:ProductService,
    public authService: AuthService, 
    public router: Router, 
    public sanitizer: DomSanitizer, 
    private route: ActivatedRoute, 
    public cartService: CartService,
  ) {


   

   }
  

  //  retourner une certaine limite de produits
   getLimitProducts(){
     return this.route.data.subscribe(response => {
       this.products = response.products.body

       for(let p of this.products) {
        p.quantity = 1
      }
     })
   }
  //  se déconnecter
   logOut(){
      return this.authService.logOut().then(
        () => {
          this.router.navigate(['/user'])
        }
      )
   }

  ngOnInit(): void {
    this.route.data
    .subscribe(response =>{
     this.categories = response.categories

  })

  this.getLimitProducts()
  }

}
