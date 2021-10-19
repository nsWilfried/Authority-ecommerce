import {Component} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
    selector: 'app-orders', 
    templateUrl: './orders.component.html', 
    styleUrls: ['./orders.component.scss']
})

export class OrdersHistoricComponent {
  showLoader: boolean  = true
    displayedColumns = ['num', 'date', 'paiement', 'total', 'status']
    ordersHistoric;
    
    constructor(
        private afAuth: AngularFireAuth, 
        private firestore: AngularFirestore
    ){

    this.getCustomerOrder()
        
    }

 changeColor (element){
   let color;
   switch(element){
    case 'En attente': 
       color = 'orange'
   break; 
   case 'En cours': 
       color = 'green'
    break; 
    case 'Annulée': 
      color= 'red'
    break
    case 'Complètée': 
     color = 'green'
    break
    case 'Echouée': 
      color='red'
    break
   }
  return color 
 }
    
  // pour récupérer les commandes de chaque utilisateur
   getCustomerOrder() {
    this.afAuth.authState.subscribe(user => {
      this.firestore.collection(`users/${user?.uid}/orders`).valueChanges().subscribe(customerOrders => {
        this.ordersHistoric = customerOrders
        for(let order of this.ordersHistoric){
            switch(order.status){
                case 'pending': 
                  order.status = 'En attente'
                 break; 
                 case 'processing': 
                  order.status = 'En cours'
                 break; 
                 case 'cancelled': 
                  order.status = 'Annulée'
                 break;
                 case 'failed': 
                  order.status = 'Echouée'
                 break; 
                 case 'completed': 
                  order.status = 'Complètée'
                 break
            }
        }

        if(this.ordersHistoric.length >  0 ){
          this.showLoader = false
        }
      })
    })
    
  }
}