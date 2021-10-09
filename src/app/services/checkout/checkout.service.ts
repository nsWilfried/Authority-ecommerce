import { Injectable } from '@angular/core';
import { paymentGateway } from 'src/app/models/payment.model';
import { ShippingZones } from 'src/app/models/shipping.model';
import {ipInfo} from '../../models/ip.model'; 
import { ProductService } from '../product/product.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  userInfo: ipInfo[] =[]
  paymentGw: paymentGateway[] = []
  shippingZones: ShippingZones[] =[]

  ci!: string 

  constructor(
    private productService: ProductService, 
  ) { 

    // executer des fonctions pour récupérer et affecter des données à l'initialisation 
    this.showPayments()
  }

  /**
   * récupérer des données utilisateurs grâce à son ip (country, city)
   */
  getUserInfoByIp(){
   this.productService.getUserIpInfo()
    .subscribe(info=> {
       this.userInfo.push(info)
       for(let ui of this.userInfo)  {
         ui.city
       }
    })
  }


  /**
   * récupérer les moyens de paiement
   */

  showPayments(){
    this.productService.getPaymentGateways().subscribe(
      (payments) => {

        for(let payment of payments){
          if(payment.enabled === true ){
            this.paymentGw.push(payment)
          }
        }
      }
    )

  }


    getShippingZonesMethods(){

    }

    getPaymentGateways()
    {

    }

}
