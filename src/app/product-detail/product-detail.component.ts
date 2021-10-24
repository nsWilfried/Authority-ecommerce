import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { CartService  } from '../services/cart/cart.service'
import { ProductService } from '../services/product/product.service';
import {DomSanitizer} from '@angular/platform-browser';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})


export class ProductDetailComponent implements OnInit, AfterViewInit {

 
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
        pagination: false,
        navigation: false,
       }, 

  600: {
    slidesPerView: 2,
    pagination: false,
    navigation: false, 
  }
  , 
  900: {
    slidesPerView: 3,
  }
    }
};
   singleProduct: any= {}
   similarProduct: Product[] = []
   showLoader: boolean = false

  constructor(

    private route: ActivatedRoute, //for get route info
    private productService: ProductService, 
    public cartService: CartService, 
    public sanitizer: DomSanitizer, 
    private router: Router, 
    @Inject(PLATFORM_ID) private platformId: object
  ) { 
    this.getSingleProductInfo()
    
  }
  

    /**
     * Get single product information
     * @param {number}  urlKey -- urlKey define an url id 
     * @type {Object} product type
     */

  getSingleProductInfo() {
      this.similarProduct = []

      if(isPlatformBrowser(this.platformId)){
        this.route.data.subscribe(response => {

          // push single product to an array 
          this.singleProduct = response.product
     
          // add default quantity and related products
            this.singleProduct.quantity = 1
            // browse the array and retrieve related id
            for(let id of this.singleProduct.related_ids){
     
              // rretrieve all produts and find product to correspond of related id
              this.route.data.subscribe(response => {
     
               const products = response.allProducts
               products.find(element => {
                 if(id === element.id){
                   this.similarProduct.push(element)
                 }
               })
                // add product to array
                 // this.similarProduct.push(product)
     
                //  initialise product quantity
                 for(let prod of this.similarProduct) {
                    prod.quantity =  1
                 }
              })
            }
           })  
     
      }
      
     }
  
     getSimilaryProductInfo(id:any){

       this.router.navigate([`/products/${id}`]).then(() => {
         this.getSingleProductInfo()
       })
      
     }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.productService.goTop()
  }
}
