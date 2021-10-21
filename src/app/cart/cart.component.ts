import { AfterViewInit, Component, OnInit } from '@angular/core';
import {Product} from '../models/product.model'
import {CartService} from '../services/cart/cart.service'
import {DomSanitizer} from '@angular/platform-browser';
import { ProductService } from '../services/product/product.service';
import { NbToastrService } from '@nebular/theme';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, AfterViewInit {

  showLoader: boolean = false 
   cart: Product[] = [];
  total: number = 0;
  subtotal: number = 0;
  minimum_amount:number = 0
 promoInput!: string;
promoValue: any  = sessionStorage.getItem('promoValue');
  constructor(
    public cartService: CartService, 
    public sanitizer: DomSanitizer, 
    private productService: ProductService, 
    private sn: NbToastrService, 
    private cp: CurrencyPipe
    
    ) {

  
    
      this.cart = this.cartService.cart //get cart
     this.subtotal = this.cartService.getSubtotal(); //get total
     this.getTotal()
  }

  // calculer le total
  getTotal(){
    if(this.promoValue !== null){
      this.total = this.cartService.getSubtotal() - parseInt(this.promoValue)
    }else{
      this.total = this.cartService.getSubtotal()
    }
  }


  // appliquer le code promo
  applyPromoCode(){
  
    this.showLoader = true
    let date = new Date()
    this.productService.getCoupons().subscribe((coupons: any) =>{

     for (let c of coupons ) { 
      let expire_date = new Date(c.date_expires_gmt)
      if(this.promoInput === c.code){
        if(this.promoValue === null && this.subtotal >= parseInt(c.minimum_amount) && date < expire_date){
          this.promoValue =  this.subtotal*parseInt(c.amount)/100
          sessionStorage.setItem('promoValue', `${this.promoValue}`)
          this.minimum_amount = parseInt(c.minimum_amount)
          sessionStorage.setItem('promoInput', this.promoInput)
          this.getTotal()
        }
      }
        
      }

      

      this.showLoader = false
      this.promoInput =''
    })
  }

  // supprimer les produits de la cart
  removeCart(){
    return   this.cart =  this.cartService.removeCart()
  }

  // supprimer un produit de la cart
  removeCartProduct(product, index){
     this.cartService.removeCartProduct(product, index)
    //  mettre à jour le prix
     this.subtotal = this.cartService.getSubtotal()
     this.promoValue = null 
    sessionStorage.removeItem('promoValue')
    return  this.getTotal()

  }

  // augmenter la quantité du produit
  increaseProduct(c){
   
     this.cartService.increaseProduct(c)

    this.cartService.cartCounter++
     //  mettre à jour le prix
       this.subtotal = this.cartService.getSubtotal()
 
       return this.getTotal()
  }

  // diminuer la quantité du produit
  decreaseProduct(c){
    this.subtotal = this.cartService.getSubtotal()
    this.promoValue = null 
   sessionStorage.removeItem('promoValue')
     this.cartService.decreaseProduct(c)
    this.cartService.cartCounter--
     //  mettre à jour le prix
      this.subtotal = this.cartService.getSubtotal()
      return this.getTotal()
  }
 
  

  ngOnInit() {

  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.productService.goTop()
  }
}
