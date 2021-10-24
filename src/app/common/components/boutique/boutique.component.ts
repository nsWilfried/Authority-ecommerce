import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/app/services/product/product.service';
import {Product} from 'src/app/models/product.model'
import { AngularFireDatabase } from '@angular/fire/database';
import {AngularFirestore} from '@angular/fire/firestore'
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Category  } from 'src/app/models/category.model'
import {DomSanitizer} from '@angular/platform-browser';
import {CategoryComponent} from 'src/app/category/category.component'
import { NbToastrService } from '@nebular/theme';
import { ShopComponent } from 'src/app/shop/shop.component';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.scss']
})
export class BoutiqueComponent implements OnInit {
  items:any = [1, 2,3, 4,5, 6, 7]
 products:Product[] | any  = []
 categories:Category[] =[]
 showLoader: boolean = true
 research!: string 
  page: number= 0
  showContent: boolean = false
  showFiller: boolean = false;
  showResearchText: boolean = false;
  CategoryComponent:any;
  totalPages: any = 1

sortingProducts:Product[] = []

//  sorting options to order products
 sortingOptions =  [

   {
     name: 'Trier par tarif croissant', 
     sorting: 'price', 
     order: 'asc'
, 
active: false
   },
 
   {
    name: 'Trier par tarif décroissant', 
     sorting: 'price', 
     order: 'desc'
, 
active: false 
   }
]

  constructor(
    private http: HttpClient,
	private productService: ProductService, 
  private router:Router,
  private route: ActivatedRoute,
  private db: AngularFireDatabase, 
  private afs: AngularFirestore,
  public  cartService:CartService, 
  public authService: AuthService, 
  public sanitizer: DomSanitizer, 
  private sn: NbToastrService, 
  @Inject(PLATFORM_ID) private platformId,
  ){
    // éxecuter des fonctions
    this.CategoryComponent = CategoryComponent

  }
  
 

  nextAndPrevious(page){
    this.showLoader = true 
    if(this.page <= this.totalPages){
      this.productService.getAllProducts(page).subscribe(response => {
        this.products = response.body
        this.page = page
        this.showLoader  = false
        this.productService.goTop()
      })
    }
  }
  // récupérer les produits
  getProducts(page){
    this.showLoader = true 
    if(isPlatformBrowser(this.platformId)){
      if(this.page <= this.totalPages){


        // je récupère la réponse du resolver
        this.route.data.subscribe(response => {
          this.totalPages = response.products.headers.get("x-wp-totalpages")
          this.page = page 
         this.products = response.products.body
    
    
            /**
              * initialiser la valeur de la quantité à 1 quand la carte est vide 
              * quand il ne l"est pas alors on itère dessus et on attribue au produit selectionné sa valeur dans la cart
              */
    
          for(let p of this.products) {
            p.quantity = 1
          }
          
            
            
            // change state of  showloader
            this.showLoader = false
        }
          )
      }
      
    }
   

}

/**
 * Récupérer les paramètres de l'url ,
 * si les paramètres orderby et order sont vides ou undefined, on retourne à la page principale
 * par contre si les params existent on trie nos produits et on les récupère
 */
  filterProducts(order){

  switch(order){
    case 'asc': {
      this.products = this.products.sort((low, high) => {
        return low.price - high.price;
      })
      break
    }
    case 'desc': {
      this.products = this.products.sort((low, high) => {
        return high.price - low.price
      })

    }
}



  }


    /**
   * orderProducts function
   * when users click an option , he will redirect to the same url but the new params come (order, sorting)
   * 
   * use sortingProducts function to get ordered products 
   */


  orderProducts(orderby, order, index:number){
    for(let option of this.sortingOptions){
    option.active = false
    }
     this.filterProducts(order)

   return   this.sortingOptions[index].active = true

  }
  

    // incrémenter la quantité
    increase(product){
        product.quantity+=1
    }


    /**
     * search function
     * @param {any} event -- return event value of searh input in real time 
     */
    
    
  search(){
    
    if(this.research && this.page <= this.totalPages){
      this.showLoader = true
      this.showContent = false
       this.productService.searchProducts(this.research, this.page)
  
              .subscribe(products =>{
  
                this.showResearchText = true
                this.totalPages = products.headers.get('x-wp-totalpages')
                this.products = products.body
              
                if(this.products.length > 0){
                  for(let p of this.products){
                    p.quantity = 1
                  }
                }else if (this.products.length === 0 ){
                  this.showContent = true
                }
                
  
                this.showLoader = false
              })
    }
   

    }
   




  // get all categories
  getAllCategories(){
    if(isPlatformBrowser(this.platformId)){
       this.productService.getAllCategories().subscribe(categories =>{
        this.categories = categories
  
      })
    }
  
  }
	
  ngOnInit(){

    // get products
    
    this.getProducts(this.page +1)
    this.getAllCategories()
  }

}
