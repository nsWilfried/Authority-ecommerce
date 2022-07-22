import { Component, Injectable, OnInit, AfterViewInit } from '@angular/core';
import {Category} from '../models/category.model'
import { ProductService } from '../services/product/product.service';
import SwiperCore,  {Autoplay, Pagination} from 'swiper/core';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser'
import { Product } from '../models/product.model';
import {CartService} from '../services/cart/cart.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
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
export class HomeComponent implements OnInit, AfterViewInit {
  
  public bannerConfig:SwiperConfigInterface = {
    direction:'horizontal', 
    slidesPerView:1, 
    navigation: true, 
    pagination: false , 
    autoplay: {
      delay: 5000
    }
  }
  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 3,
    navigation: true,
    pagination: true,
    autoplay: {
      delay:3000
    },
    breakpoints:{
       320:{
            slidesPerView: 1, 
           }, 

      600: {
        slidesPerView: 2,
      }
      , 
      900: {
        slidesPerView: 3,
      }
       
    }
};
  offers: any[] = [
    {
      title: 'Restauration', 
      desc: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, quos recusandae aliquam, ratione consectetur, libero odit repellat unde ab nam iure voluptates veniam molestias quae quaerat explicabo commodi natus corrupti?', 
      img: '', 
      alt: '', 
      url: '/notre-menu'
    },
    {
      title: 'Community Management', 
      desc: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, quos recusandae aliquam, ratione consectetur, libero odit repellat unde ab nam iure voluptates veniam molestias quae quaerat explicabo commodi natus corrupti?', 
      img: '', 
      alt: '', 
      url: '/services/community-management'
    },
    {
      title: 'évenements', 
      desc: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, quos recusandae aliquam, ratione consectetur, libero odit repellat unde ab nam iure voluptates veniam molestias quae quaerat explicabo commodi natus corrupti?', 
      img: '', 
      alt: '',
      url: '/evenements'
    }
  ]
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
     @Inject(PLATFORM_ID) private platformId: object
  ) {

    this.getCategories()
    this.getLimitProducts()

   

   }
  

  //  retourner une certaine limite de produits
   getLimitProducts(){
     if(isPlatformBrowser(this.platformId)){
      this.route.data.subscribe(response => {
        this.products = response.products.body
 
        for(let p of this.products) {
         p.quantity = 1
       }
      })
     }
  
   }

   getCategories(){
     if(isPlatformBrowser(this.platformId)){
      this.route.data
      .subscribe(response =>{
       this.categories = response.categories
  
    })
     }
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

  ngAfterViewInit(){
    this.productService.goTop()
  }
}