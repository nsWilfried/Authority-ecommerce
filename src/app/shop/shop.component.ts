import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { CartService } from '../services/cart/cart.service';
import { AuthService } from '../services/auth/auth.service';
import { Category  } from '../models/category.model'
import {DomSanitizer} from '@angular/platform-browser';
import {CategoryComponent} from '../category/category.component'
import { BoutiqueComponent } from '../common/components/boutique/boutique.component';
import { ActivatedRoute, Router } from '@angular/router';
import {Location } from '@angular/common'
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, AfterViewInit {
  items:any = [1, 2,3, 4,5, 6, 7]
 categories:Category[] =[]
  CategoryComponent:any;
  BoutiqueComponent:any;
  dynamicComponent: any = BoutiqueComponent


  constructor(
	private productService: ProductService, 
  public  cartService:CartService, 
  public authService: AuthService, 
  public sanitizer: DomSanitizer, 
  private route: ActivatedRoute,
  private router: Router, 
  private location: Location
  ){


    this.route.queryParams.subscribe(params => {

      const categoryParam = params['categorie']
      if(categoryParam != undefined){
         this.dynamicComponent = CategoryComponent
      }else if (categoryParam === undefined ){
        this.dynamicComponent = BoutiqueComponent
      }
    })
    // éxecuter des fonctions
    this.CategoryComponent = CategoryComponent
    this.BoutiqueComponent = BoutiqueComponent

   

  }



  // get all categories
  getAllCategories(){

    this.route.data.subscribe(response => {
      this.categories = response.categories

    })

  }
  
	
  ngOnInit(){

    // get products
    
    this.getAllCategories()
 
  }

  ngAfterViewInit(){
    // this.productService.goTop()
  }

}
