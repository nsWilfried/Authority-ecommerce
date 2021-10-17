import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http'
import {OnInit} from '@angular/core'
import { Observable } from 'rxjs';
import {Product} from 'src/app/models/product.model'
import {paymentGateway} from '../../models/payment.model'
import { Category } from 'src/app/models/category.model';
import { AngularFirestore } from '@angular/fire/firestore';
import {catchError, retry} from 'rxjs/operators'
import { throwError } from 'rxjs';
import { HttpErrorResponse} from '@angular/common/http';

import { InterceptorSkipHeader, ProductsInterceptor } from '../http.interceptor';
import { environment } from 'src/environments/environment';
import { ipInfo } from 'src/app/models/ip.model';
import { ShippingZones, ShippingZonesMethod } from 'src/app/models/shipping.model';
import { Order } from 'src/app/models/order.model';
import { Customer } from 'src/app/models/user.model';
import { ISmoothScrollOption, SmoothScrollService } from '@boatzako/ngx-smooth-scroll';
@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnInit{

 
  constructor(
    private http: HttpClient, 
    private afs: AngularFirestore,
    private httpInterceptor: ProductsInterceptor, 
    private smooth: SmoothScrollService
  ) {
    
        // this.getAllProducts()
        // this.getAllCategories()
        // this.getPaymentGateways()
        // this.getShippingZones()
   }
   handleError (error: HttpErrorResponse){

    if(error.status == 0){

        // if an client server or network error occured
        console.log("une erreur s'est produite")
    } else {

      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.

        console.log('erreur');

        
    }
     
    return throwError('erreur, veuillez reessayer plus tard')

}

   /**
    * A function who type is not 'void' or 'any' must be return a value
    */
   getAllProducts(page, per_page =12): Observable<HttpResponse<Product[]>>{
 
    return this.http.get<Product[]>(`${environment.origin}/${environment.wcEndpoint}/products?page=${page}&per_page=${per_page}`, {observe: 'response'} )
    
   }

   /**
    * get single product by id 
    * @param {number} id --- it is an variable who stock part of url correpond to product id and is use to 
    * get same product info
    */
   getSingleProduct(id: number): Observable<Product>{
     
      return this.http.get<Product>(`${environment.origin}/${environment.wcEndpoint}/products/${id}`)
   }

   /**
    * get all categories
    */
   getAllCategories(): Observable<Category[]>{
      return this.http.get<Category[]>(`${environment.origin}/${environment.wcEndpoint}/products/categories`)
   }

   /**
    * une fonction getproduct by category  qui en prend en paramètre l'id du de la catégorie cliqué 
    * ensuite , cette fonction itère sur nos produits et nous renvoie un tableau renfermant les produits qui ont 
    * la même catégorie que le produit cliqué
    */


    /**
     * 
     * @param {string} keyword  
     * il s'agit des informations que l'utilisteur a rentré dynamiquement et en temps réel dans le search input
     */
   searchProducts(keyword:string,page, per_page=12): Observable<HttpResponse<Product[]>>{
    return this.http.get<Product[]>(`${environment.origin}/${environment.wcEndpoint}/products?search=${keyword}&per_page=${per_page}&page=${page}`, {observe: 'response'})
   }


    /**
     * 
     * @param {string} order  permet de définir si le rangement sera ascendant ou descendant
     * @param  {string} sorting  permet de définir la propriété avec laquelle se fera le rangement
     */


  sortingProducts(order: string , sorting:string, search?:string,  ): Observable<Product[]>{
    if(search){
      return this.http.get<Product[]>(`${environment.origin}/${environment.wcEndpoint}/products?search=${search}&orderby=${sorting}&order=${order}`)

    }else {
      return this.http.get<Product[]>(`${environment.origin}/${environment.wcEndpoint}/products?orderby=${sorting}&order=${order}`)

    }
  }

    
  /**
   * retourner les moyens de paiement
   * @returns 
   */
  getPaymentGateways(): Observable<paymentGateway[]>{
    
    return this.http.get<paymentGateway[]>(`${environment.origin}/${environment.wcEndpoint}/payment_gateways`)

  }



  // retourner les informations de l'utilisateur à partir de l'api 

  getUserIpInfo(): Observable<ipInfo>{
    return this.http.get<ipInfo>('http://ip-api.com/json')
  }

  // permet de retourner les zones de livraison
  getShippingZones(): Observable<ShippingZones[]>{
   return  this.http.get<ShippingZones[]>(`${environment.origin}/${environment.wcEndpoint}/shipping/zones`)
  }


  /**
   * 
   * @param {ShippingZones} zone il s'agit de la zone de livraison cliqué 
   * @returns 
   */
  getShippingZonesMethod(zoneId:number): Observable<ShippingZonesMethod[]>{
      return this.http.get<ShippingZonesMethod[]>(`${environment.origin}/${environment.wcEndpoint}/shipping/zones/${zoneId}/methods`)
  }

  floozTmoney(token, amount, identifier){
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
    }).set(InterceptorSkipHeader, '')
    return this.http.get(`https://paygateglobal.com/v1/page?token=${token}&amount=${amount}&identifier=${identifier}&url=http://localhost:4200/thankyou`,{responseType: 'text', observe:'response'})
  }


  /**
   * 
   * @param orderData fait référence aux informations de la commande
   * @returns 
   */

  createOrder(orderData: Order): Observable<Order>{
    return this.http.post<Order>(`${environment.origin}/${environment.wcEndpoint}/orders`, orderData)
  }


  /**
   * 
   * @param {number} id récupérer les commandes de chaque utilisateur grâce à leur id
   */
  getOrderById(id): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.origin}/${environment.wcEndpoint}/orders?customer=${id}`)
  }


  /**
   * 
   * @param {Customer} data  il s'agit de l"email de l'utilisateur
   * @returns 
   */
  createCustomer(data: Customer):Observable<Customer>{
    return this.http.post<Customer>(`${environment.origin}/${environment.wcEndpoint}/customers`, data)
  }


  /**
   * 
   * @returns retouner tous les produits disponibles sans gestion de la page
   */

  getAllProductsWithoutPages(per_page = 100): Observable<Product[]>{
    return this.http.get<Product[]>(`${environment.origin}/${environment.wcEndpoint}/products?per_page=${per_page}`)
  }

  getCoupons(){
    return this.http.get(`${environment.origin}/${environment.wcEndpoint}/coupons`)
  }

  goTop() {
    let opt: ISmoothScrollOption = { duration: 500, easing: "linear" };
    this.smooth.smoothScrollToTop(opt);
  }
  
   ngOnInit(): void {

     //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
     //Add 'implements OnInit' to the class.
     
  

     
     
   }
}
 