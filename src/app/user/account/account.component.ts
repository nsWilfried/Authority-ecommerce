import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';
import {DomSanitizer} from '@angular/platform-browser'
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  $customerId!:Observable<any>;
  displayedColumns = ['num', 'date', 'paiement', 'total', 'status']
  ordersHistoric;
   constructor(
    private productService: ProductService, 
    public authService: AuthService, 
    private firestore: AngularFirestore, 
    public sanitizer: DomSanitizer, 
    private afAuth: AngularFireAuth
  ) { 


  }

  ngOnInit(): void {
    this.getCustomerOrder()
  }

  // pour récupérer les commandes de chaque utilisateur
   getCustomerOrder() {
    this.afAuth.authState.subscribe(user => {
      this.firestore.collection(`users/${user?.uid}/orders`).valueChanges().subscribe(customerOrders => {
        this.ordersHistoric = customerOrders
      })
    })
    
  }


}
