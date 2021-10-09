import { Component, Injectable, OnInit } from '@angular/core';
import {Category} from '../models/category.model'
import { ProductService } from '../services/product/product.service';
import SwiperCore,  {Autoplay, Pagination} from 'swiper/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';


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
  centered = true ; 
  unbounded = true
  connected
  constructor(

    // import service 
    private productService:ProductService,
    public authService: AuthService, 
    public router: Router
  ) {



    this.productService.getAllCategories()
      .subscribe(categories =>{
       this.categories = categories

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
  }

}
