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


    
  // pour récupérer les commandes de chaque utilisateur
   getCustomerOrder() {
    this.afAuth.authState.subscribe(user => {
      this.firestore.collection(`users/${user?.uid}/orders`).valueChanges().subscribe(customerOrders => {
        this.ordersHistoric = customerOrders
        for(let order of this.ordersHistoric){
            switch(order.status){
                case 'pending': 
                 order.status = 'En attente'
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