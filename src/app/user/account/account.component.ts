import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import {DomSanitizer} from '@angular/platform-browser'
import { OrdersHistoricComponent } from 'src/app/common/components/ordersHistoric/orders.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AccountDetailComponent } from 'src/app/common/components/account-detail/account-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { MenuComponent } from 'src/app/common/components/menu/menu.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @ViewChild('account') template!: TemplateRef<any>
  $customerId!:Observable<any>;
  dynamicComponent: any = OrdersHistoricComponent
  OrdersHistoricComponent = OrdersHistoricComponent
  AccountDetailComponent =AccountDetailComponent
 
 
   constructor(
    public authService: AuthService, 
    public sanitizer: DomSanitizer, 
    private firestore:AngularFirestore, 
    private afAuth: AngularFireAuth, 
    private dialog: MatDialog, 
    private router:Router
  ) { 


  }

 

  // naviguer vers l'historique des commandes 
  goToHistoricComponent(){
    this.dynamicComponent = this.OrdersHistoricComponent
  }

  // naviguer vers les détails du compte
  goToAccountDetailComponent(){
    this.dynamicComponent = this.AccountDetailComponent
  }

  ngOnInit(): void {
 
  }
  
  // ouvrir le menu
  openDialog(){
    return this.dialog.open(this.template, {
      minWidth: '50vw',
      minHeight: 100,
    })
  }

  closeDialog(){
   return  this.dialog.closeAll()
  }

  // se déconnecter
  logOut(){
      return this.authService.logOut().then(
        () => {
          this.router.navigate(['/user/login'])
        }
      )
   }



}

