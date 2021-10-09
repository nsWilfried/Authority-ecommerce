import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import auth from 'firebase'
import {User} from '../../models/user.model'
import { AngularFirestore } from "@angular/fire/firestore";
import { ProductService } from "../product/product.service";
import { NbToastrService } from '@nebular/theme';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

   //Permet de récupérer les infos concernant le user
   $users!: Observable<User | undefined> ;
  //  $customerId!: Observable<any | undefined>
   

    isConnected:any = localStorage.getItem('isConnected' || 'false'  ) 
  customersOrders!: Observable<any[]>
  $customerId!:Observable<any>

    userEmail: string | null = ''
    uid; 

    // auth error var et snackbar
    errMsg!: string
    hPos = 'center'
    vPos = 'bottom'
    ph!: any




   constructor(
     private afDb: AngularFireDatabase,
     private afAuth: AngularFireAuth,
     private router: Router,
     private firestore: AngularFirestore, 
     private productService:ProductService,
     private sn:NbToastrService,

   ) {
  
    this.setUserData()
  
   }

   setUserData() {
        // si l'uid de l'utilisateur est présent alors je l'ajoute dans la base de données et je récupère ses identifiants
 
       return  this.afAuth.authState.subscribe((user)   => {
          if (user) {

          
           this.userEmail = user.email
           this.uid = user.uid
   
           // l'utilisateur est conneecté


           this.isConnected = localStorage.setItem('isConnected', 'true' );
           this.isConnected= localStorage.getItem('isConnected')
   
           //  si l'utilisateur a une image de profil , alors on le lui atrribue
           this.ph = user.photoURL
            
               //  ajouter les informations de l'utilisateur dans la base de donnée
             
           this.firestore.doc(`users/${user?.uid}`).set({
                     uid: user?.uid,
                     email: user?.email, 
                     displayName: user?.displayName,
                     photoURL: user?.photoURL,
                    //  id: this.customerId
              });
                
   
            if(user.displayName === null && user.photoURL === null ){
             let displayName ="user"
             let photoURL ='https://avatars.dicebear.com/api/jdenticon/bricia.svg'
              this.firestore.doc(`users/${user.uid}`).update({
                displayName: displayName, 
                photoURL:photoURL
              })
   
             //  si l'utilisateur n'a pas d'image de profil alors on lui attribue une image de profil par deafaut
                this.ph = photoURL
   
            }
   
           //  récupérer les informations du dit utilisateur
            this.$users = this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
            // this.$customerId = this.firestore.doc<any>(`users/${user.uid}/customerId/customer`).valueChanges()
         
           
          }
        });
   }

  /**
   * 
   * @param email ==> user email
   * @param password ==> user password
   * @returns 
   */

   registerWithMail(email: string, password: string) {
     const data = {
       email: email ,
     }
    return this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(
      () => {
      
        this.productService.createCustomer(data).subscribe(data => {
          this.saveUserData(data)
        }
        )
        this.router.navigate(["/"])

    }
    ).catch(error => {
      return this.catchAuthError(error)
    })
    
  }

  // enregistrer les informations utilisateur à la connexion
  saveUserData(data){
    this.afAuth.authState.subscribe(user => {
      this.firestore.doc(`users/${user?.uid}`).collection('customerId').doc('customer').set({
        clientID: data.id
      })

    })
  }

  signInWithMail(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
    .then(
      () => {

      this.router.navigate(["/"]);
    }
    ).catch(
      error =>{
        return this.catchAuthError(error)
      }
    );
    ; 
  }


  // google provider login
  googleConnection(){
    return this.authLogin(new auth.auth.GoogleAuthProvider())
    .then(
      (data:any) => {
      
      return this.router.navigate(["/"]);


      }
    ).catch(
      error => {
        return this.catchAuthError(error)
      }
    )
  }


  /**
   *  auth logic for providers
   * @param provider fournisseur de connexion
   * @returns 
   */

  authLogin(provider){
    return this.afAuth.signInWithPopup(provider)
    .then((provider:any ) => {
      const d = {
        email: provider.user.email
      }
       this.productService.createCustomer(d).subscribe((data) => {
        this.saveUserData(data)

      })
    
    }).catch(error => {
      console.log(error.message)      
       this.catchAuthError(error)
       return null 
    })
  }


  /**
   * 
   * @param resetEmail Email entré par l'utilisateur
   * @returns 
   */
  resetPassword(resetEmail) {

    return this.afAuth.sendPasswordResetEmail(resetEmail)

  }

  /**
   * 
   * @param error permet de récupérer l'erreur dans le process d'auth et de l'afficher
   * @returns 
   */
  catchAuthError(error){


        switch (error.code){

          case 'auth/popup-closed-by-user': 
          this.errMsg = "La popup a été fermée par l'utilisateur avant de finaliser l'opération."
          break 
          case 'auth/weak-password': 
          this.errMsg = 'Le mot de passe doit comporter au moins 6 caractères'
          break 

          case 'auth/invalid-email': 
          this.errMsg = 'L\'adresse e-mail est mal formatée'
          break 
          
          case 'auth/wrong-password': 

            
              this.errMsg = 'Mot de passe incorrect'


            break;
        
            case 'auth/email-already-exists': 
              this.errMsg = "L'adresse e-mail est déjà utilisée"
            break; 

            case 'auth/user-not-found':
              this.errMsg =
                'Nous n \'avons pas trouvé de compte utilisateur associé à l \'adresse e-mail.';
              break;
          
            case 'auth/invalid-email  ':
              this.errMsg = 'Adresse email invalide';
              break;
            case 'auth/cannot-delete-own-user-account':
              this.errMsg = 'Vous ne pouvez pas supprimer votre propre compte utilisateur.';
              break;

              case 'auth/network-request-failed':
                this.errMsg = 'S \'il vous plait, vérifiez votre connexion internet';
                break;
              case 'auth/too-many-requests':
                this.errMsg =
                  'Nous avons détecté trop de demandes de votre appareil.';
                break;
              case 'auth/user-disabled':
                this.errMsg =
                  'Votre compte a été désactivé ou supprimé.';
                break;
              case 'auth/requires-recent-login':
                this.errMsg = 'Veuillez vous reconnecter et réessayer!';
                break;
              case 'auth/email-already-in-use': 
                  this.errMsg = 'Email déjà utilisé par un autre utilisateur'
              break; 
            default:
              this.errMsg = 'Oops! Un problème est survenu. Réessayez plus tard.';
              break;

        }


         return this.sn.show( this.errMsg, 'Erreur', {status: 'danger'})

  }


  /**
   * 
   * @param {string} newPassword  correspond au nouveau mot de passe entré par l'utilisateur
   * @param {string} code   correspond au code de la demande, ici il s'agit de supprimer son mot de passe
   * @returns 
   */
  addNewPassword(newPassword, oobcode) {
    return this.afAuth.confirmPasswordReset(oobcode, newPassword)
  }


  // log out
  logOut() {
    return this.afAuth.signOut().then(
      () => {
        this.isConnected = localStorage.setItem('isConnected', 'false')
        this.isConnected = localStorage.getItem('isConnected')
      }
    );
  }
 
}

