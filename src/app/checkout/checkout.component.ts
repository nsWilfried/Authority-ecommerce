import { CurrencyPipe } from '@angular/common';
import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ipInfo } from '../models/ip.model';
import { lineItems, Order, shippingLines } from '../models/order.model';
import { paymentGateway } from '../models/payment.model';
import { Product } from '../models/product.model';
import { ShippingZones, ShippingZonesMethod } from '../models/shipping.model';
import { AuthService } from '../services/auth/auth.service';
import { CartService } from '../services/cart/cart.service';
import { CheckoutService } from '../services/checkout/checkout.service';
import { ProductService } from '../services/product/product.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { StripeService, StripeCardNumberComponent ,StripeCardComponent} from 'ngx-stripe';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { AngularFireAuth } from '@angular/fire/auth';
import { CartComponent } from '../cart/cart.component';


@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {


  @ViewChild('demo')  template!: TemplateRef<any>;


  showLoader:boolean = false

  userInfo: any;
  // order and payment data
  orderSummary:Product[] = []
  paymentGw: paymentGateway[] = []
  paymentId!: string ;
  order !: Order
  public static orderId: any 


 


  // form control 
  email!: FormControl
  city!:FormControl
  firstName!:FormControl
  country!:FormControl
  surname!:FormControl
  phone!:FormControl
  customer_note!:FormControl
  adress!:FormControl


//  shipping form data
  shippingForm!: FormGroup
  shippingFormValue;
  shippingZones:ShippingZones[] = []
  shippingMethod: ShippingZonesMethod[] =[]
  deliveryPrice: any = 'livraison gratuite'
  clientID;

  // cart
  price: number = 0// <== fait réference aux frais de livraison
  subtotal: number = 0
  total!: number
  promoValue:any = sessionStorage.getItem('promoValue')



  constructor(
    private productService:ProductService,
    private fb:FormBuilder,
    private cartService:CartService, 
    private checkoutService: CheckoutService, 
    private cp:CurrencyPipe, 
    private router: Router, 
    private route:ActivatedRoute,
    private dialog: MatDialog, 
    private authService: AuthService, 
    private firestore:AngularFirestore, 
    private http: HttpClient,
    private stripeService:StripeService, 
    private bottomSheet: MatBottomSheet, 
    private afAuth: AngularFireAuth
  ) { 
    

    this.afAuth.authState.subscribe(user => {
      this.firestore.doc<any>(`users/${user?.uid}/customerId/customer`).valueChanges().subscribe(id  => {
        this.clientID = id.clientID
      })
    }) 
 

  this.userInfo = this.checkoutService.getUserInfoByIp()


    // executer des fonctions
    this.buildShoppingFormControls()
   this.buildShippingForm()
  this.getShippingZones()

    // affecter les valeurs récupérées
    this.paymentGw = this.checkoutService.paymentGw
    this.orderSummary = this.cartService.cart
    this.subtotal = this.cartService.getSubtotal()

    // fonction à executer en dernier
      this.getTotal()


  }


  // ouvrir le bottom sheet des moyens de paiement
  openBottomSheet(config?:MatBottomSheetConfig){
    return this.bottomSheet.open(this.template,config)
  }


   payWithStripe() {
    this.http.post('/create-checkout-session', {data: this.cartService.cart})
    .pipe(
      switchMap((session:any) => {
        return this.stripeService.redirectToCheckout({ sessionId: session.id })
      })
    )
    .subscribe(result => {
      // If `redirectToCheckout` fails due to a browser or network
      // error, you should display the localized error message to your
      // customer using `error.message`.
      if (result.error) {
        alert(result.error.message);
      }
    });

   }
  // créer les form control du shopping form 
  
  buildShoppingFormControls(){
   
    this.firstName  = new FormControl('',  [Validators.required])
    this.surname = new FormControl('',  [Validators.required])
    this.city = new FormControl( this.userInfo,  [Validators.required])
    this.country =new FormControl('Togo',  [Validators.required])
    this.email = new FormControl(this.authService.email,  [Validators.required , Validators.email])
    this.phone = new FormControl('',  [Validators.required] )
    this.customer_note = new FormControl('')
    this.adress = new FormControl('', [Validators.required])
  }

  // creer les formulaires du checkout 
  buildShippingForm(){
    return this.shippingForm = this.fb.group({
      city:this.city, 
      country:this.country, 
      firstName: this.firstName, 
      surname: this.surname, 
      email:  this.email, 
      phone: this.phone, 
      customer_note:this.customer_note ,
      address_1: this.adress
    })
  }


  //  shipping zones
  getShippingZones(){
    this.route.data
    .subscribe(response =>{
      this.shippingZones = response.shippingZones

    })
  }


  // récupérer les prix de livraison en fonction des zones
  getShippingZonesMethod(zone:number) {
    this.showLoader = true
    this.productService.getShippingZonesMethod(zone)
      .subscribe(method => {

        // méthode de livraison 
          this.shippingMethod = method

          /**
           * on parcourt les méthode et on récupère la valeur en fonction de la méthode choisie 
           * si le prix de livraison n'est pas un nombre alors on attribue son titre à la variable delivery price 
           * sinon si c'est un nombre alors on parseInt sa valeur et on la récupère
           */
          
          for(let method of this.shippingMethod){

            // prix de livraison 
           let  price = parseInt(method.settings.cost.value) 

            if(isNaN(price)){

              this.deliveryPrice = method.title 

            }
            
            else {
              this.deliveryPrice = parseInt(method.settings.cost.value)

                  // ajoute le prix de la livraison -- PLACER AVANT LE DELIVERYPRICE
                  this.price = this.deliveryPrice 


              // tranformer pour avoir la devise du franc CFA
              this.deliveryPrice = this.cp.transform(this.deliveryPrice, 'XOF')

          
            }
            

          }
          this.showLoader = false
          // et on retourne le total
          return this.getTotal()
      })


  }
  

  
  /**
   * 
   * @param {paymentGateway}  payment <== constitue le moyen de paiement choisi par l'utilisateur
   * nous permet ainsi de récupérer son id 
   */

   getPaymentId(payment:paymentGateway){

    // récupérer le contenu des formulaires et l'identifiant du moyen de paiment
    this.shippingFormValue = this.shippingForm.value
    this.paymentId = payment.id


    //  récupérer les informations des produits que le client ajouté au panier et le passer dans la commande (order)
   
    let cartData: lineItems[] = [] 
    for (let index = 0; index < this.orderSummary.length; index++) {

      let cd = this.orderSummary[index]
      cartData.push({
        product_id: cd.id,
        quantity: cd.quantity,
        price: cd.price, 
      })

     
    }
    

    // récupérer les informations sur la zone de livraison 
    let shippingData: shippingLines[] = []
    for (let index = 0; index < this.shippingMethod.length; index++) {

      let sm = this.shippingMethod[index]
      shippingData.push({
        method_title: sm.title, 
        method_id: sm.method_title, 
        total: sm.settings.cost.value
      })
      
    }
  
    let coupon_code: any ={
      code: sessionStorage.getItem('promoInput')
    } 
    if(coupon_code.code != null){
       // order data json
    this.order = {
      payment_method: payment.method_title, 
      payment_method_title: payment.title, 
      set_paid: false , 
      customer_id: this.clientID, 
      customer_note: this.shippingFormValue['customer_note'],
      shipping: {
        first_name: this.shippingFormValue['fistName'], 
        last_name: this.shippingFormValue['surname'],
        city: this.shippingFormValue['city'], 
        country: this.shippingFormValue['country'], 
        phone: this.shippingFormValue['phone'], 
        email: this.shippingFormValue['email'],
        address_1: this.shippingFormValue['address_1']
      }, 
      billing: {
        first_name: this.shippingFormValue['fistName'], 
        last_name: this.shippingFormValue['surname'],
        city: this.shippingFormValue['city'], 
        country: this.shippingFormValue['country'], 
        phone: this.shippingFormValue['phone'], 
        email: this.shippingFormValue['email'],
        address_1: this.shippingFormValue['address_1']
      }, 
      line_items: cartData, 
      shipping_lines: shippingData,
      coupon_lines: [
        {
          code:coupon_code.code
        }
      ]
  
    }
    }else {
     // order data json
     this.order = {
      payment_method: payment.method_title, 
      payment_method_title: payment.title, 
      set_paid: false , 
      customer_id: this.clientID, 
      customer_note: this.shippingFormValue['customer_note'],
      shipping: {
        first_name: this.shippingFormValue['firstName'], 
        last_name: this.shippingFormValue['surname'],
        city: this.shippingFormValue['city'], 
        country: this.shippingFormValue['country'], 
        phone: this.shippingFormValue['phone'], 
        email: this.shippingFormValue['email'], 
        address_1: this.shippingForm['address_1']
      }, 
      billing: {
        first_name: this.shippingFormValue['firstName'], 
        last_name: this.shippingFormValue['surname'],
        city: this.shippingFormValue['city'], 
        country: this.shippingFormValue['country'], 
        phone: this.shippingFormValue['phone'], 
        email: this.shippingFormValue['email'], 
        address_1: this.shippingFormValue['address_1']

      }, 
      line_items: cartData, 
      shipping_lines: shippingData,
  
    }
    }

    
   
  

  }



  // retourner le prix total 
  getTotal(){
    if(this.promoValue !== null){
      return this.total = this.subtotal + this.price - parseInt(this.promoValue)

    }else {
      return this.total = this.subtotal + this.price
    }

  }

 
  // créer la commande 
  createOrder(){
    this.productService.createOrder(this.order).subscribe(order  => {



      // récupérer l'idenfiant de commande
      if(order.id != undefined){
        localStorage.setItem('orderId', order.id.toString())

      }
      CheckoutComponent.orderId = JSON.parse(localStorage.getItem('orderId') || '' )


      // ajouter les commandes dans la base de données de chaque utilisateur
      this.afAuth.authState.subscribe(user => {
        if(user ){
          this.firestore.doc(`users/${user.uid}`).collection('orders').doc(`${order.id}`).set(order)
        }
      })
        


      // naviguer vers la page de remmerciement
      this.router.navigate(['/thankyou']).then(
        () =>{

            // fonctions
        this.shippingForm.reset()
        this.cartService.emptyCart()
    sessionStorage.removeItem('promoValue')
        sessionStorage.removeItem('promoInput')
        }
      )

      

     } )

  }

  // créer la commande flooz
  createFloozOrder(){
    this.productService.createOrder(this.order).subscribe(order  => {



      // récupérer l'idenfiant de commande
      if(order.id != undefined){
        localStorage.setItem('orderId', order.id.toString())

      }
      CheckoutComponent.orderId = JSON.parse(localStorage.getItem('orderId') || '' )


      const data = {
        auth_token: environment.paygateKey, 
        amount: this.total, 
        phone_number: this.shippingFormValue['phone'], 
        identifier: CheckoutComponent.orderId,  
        network: 'TMONEY'
      } 
      this.productService.floozTmoney(data.auth_token, data.amount, data.identifier).subscribe(result => {

         // ajouter les commandes dans la base de données de chaque utilisateur
      this.firestore.doc(`users/${this.authService.uid}`).collection('orders').doc(`${order.id}`).set(order)
        this.shippingForm.reset()
        this.cartService.emptyCart()
        sessionStorage.removeItem('promoValue')
        sessionStorage.removeItem('promoInput')
        this.showLoader = false

        return window.location.href = `https://paygateglobal.com/v1/page?token=${data.auth_token}&amount=${data.amount}&identifier=${data.identifier}&url=http://localhost:4200/thankyou`
      }, 
      error => {
        console.log(error.message)
      }
      
      )

   
      

     } )

  }

  // checkout fonction
  checkout(){

    this.showLoader = true
    // paiement à la livraison
    if(this.paymentId === 'cod'){

      // spinner 
     return  this.createOrder()
      
      

    }

  
    // flooz or tmoney
    if (this.paymentId === 'paygateglobal_gateway' ) {

     return this.createFloozOrder()

      
    }


    // stripe
    if(this.paymentId === 'stripe') {

      // this.http.post('http://localhost:4242/api', this.orderSummary).subscribe((result) => {
      //   console.log('jusque la ca va niquel')
      //   console.log(result)

      // })
    return this.payWithStripe()
 
      }
       
  
      
  }
  ngOnInit(): void {



  }

}


