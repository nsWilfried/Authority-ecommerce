import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { CartService  } from '../services/cart/cart.service'
import { ProductService } from '../services/product/product.service';
import {DomSanitizer} from '@angular/platform-browser';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})


export class ProductDetailComponent implements OnInit {

 
  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 3,
    navigation: true,
    pagination: true,
    autoplay: {
      delay:3000
    },
    // breakpoints:{
    //    640:{
    //         slidesPerView: 1, 
    //        }
    // }
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
  ) { 
    this.getSingleProductInfo()
    
  }
  

    /**
     * Get single product information
     * @param {number}  urlKey -- urlKey define an url id 
     * @type {Object} product type
     */

     getSingleProductInfo() {

      
    return  this.route.data.subscribe(response => {

     // push single product to an array 
     this.singleProduct = response.product
     console.log(this.singleProduct)

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
  
     getSimilaryProductInfo(id:any){
      // this.showLoader = true
      // this.singleProduct.splice(0, 1)


       this.router.navigate([`/products/${id}`]).then(() => {
       })
      
     }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

}
