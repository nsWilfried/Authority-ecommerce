import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product/product.service';
import { CartService } from '../services/cart/cart.service'
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  page: number= 0
  per_page:number = 10
  categorySlug: any;
  productFilter:Product[]  = []
  products: Product[] | any = []
  showLoader: boolean = true
  constructor(
    public homeService: HomeComponent, 
    private productService: ProductService,
    private route:ActivatedRoute, 
    public cartService: CartService, 
    private sn: NbToastrService
  ) {
   }


    /**
   * 
   * @param {number} id - it is the id of category who user click
   * @function getProductByCategory
   * @return {array} productFilterArray
   */

  
  

  getProductByCategory(name:any): Product[]{


  // get all products
  this.productService.getAllProductsWithoutPages()
  .subscribe(products => {

    // assign products to an variable
    this.products = products


    /**
       * find in list of products element 
       * browse element to find category who is same of category name click and return element
       */ 
    this.products.find(element => {
      
    element.categories.forEach(prod =>{

      /**
       * if element's name === category's name 
       * then push the element in the productFilter array 
       */
      if(prod.slug === name){
         this.productFilter.push(element)

         for(let p of this.productFilter){
           p.quantity = 1
         }

      }

        //  change state of loader
        this.showLoader = false 
    })
    

  })
        



  })



    
    return this.productFilter

   
  }

  ngOnInit(): void {
   

        // capture category request 
        this.route.queryParams.subscribe(params => {

          this.productFilter = []
          this.showLoader = true
          this.categorySlug =  params['categorie']

          // console.log(this.categoryName)

          if(this.categorySlug != undefined )  {
           this.getProductByCategory(this.categorySlug)
           
      
      }
      
        })
  
        // function who get automatically category (what the user clicked) products
  
      
  }


}
