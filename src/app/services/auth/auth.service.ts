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

   

    isConnected:any = localStorage.getItem('isConnected' || 'false'  ) 
 

    uid; 

    // auth error var et snackbar
    errMsg!: string
    hPos = 'center'
    vPos = 'bottom'
    ph!: any
    name!:any
    email!:any 





   constructor(
     private afDb: AngularFireDatabase,
     private afAuth: AngularFireAuth,
     private router: Router,
     private firestore: AngularFirestore, 
     private productService:ProductService,
     private sn:NbToastrService,

   ) {
  
    this.getUserData()
   }

 

  //  envoyer les données de connexion de l'utilisateur vers la base de données
   setUserData() {
        // si l'uid de l'utilisateur est présent alors je l'ajoute dans la base de données et je récupère ses identifiants
 
       return  this.afAuth.authState.subscribe((user)   => {
          if (user) {

          
           this.uid = user.uid
   
           // l'utilisateur est conneecté


           this.isConnected = localStorage.setItem('isConnected', 'true' );
           this.isConnected= localStorage.getItem('isConnected')
   
           //  on récupère le profil de l'utilisateuru
           this.ph = user.photoURL
           this.name = user.displayName
           this.email = user.email

            
               //  ajouter les informations de l'utilisateur dans la base de donnée
             
           this.firestore.doc(`users/${user.uid}`).set({
                     uid: user.uid,
                     email: user.email, 
                     displayName: user.displayName,
                     photoURL: user.photoURL,
              });
                

           this.getUserData()
          }
        });
   }

  //  récupérer le profil usilisateur
   getUserData(){
    this.afAuth.authState.subscribe(user => {
      if(user){
        this.isConnected = localStorage.setItem('isConnected', 'true' );
        this.isConnected= localStorage.getItem('isConnected')
         // récupérer les informations de l'utilisateur
         this.firestore.doc(`users/${user.uid}`).valueChanges().subscribe((data: any) => {
           if(data.displayName === null && data.photoURL === null ){
             let displayName ="user"
             let photoURL ='https://avatars.dicebear.com/api/jdenticon/bricia.svg'
             this.firestore.doc(`users/${user.uid}`).update({
               displayName: displayName, 
               photoURL:photoURL
             })

             //  si l'utilisateur n'a pas d'image de profil alors on lui attribue une image de profil par deafaut
               this.ph = photoURL
               this.name = displayName
               this.email = user.email

           } else {
             this.ph = data.photoURL
             this.name = data.displayName
             this.email = data.email
           }
         })
      }
 
    })
  
  }

  //  s'inscrire avec son adresse mail 
   registerWithMail(email: string, password: string) {
   
    return this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(
      () => {
      
        this.setUserData()
        this.router.navigate(["/"])

    }
    ).catch(error => {
      return this.catchAuthError(error)
    })
    
  }

  /**
   * 
   * @param data correspond aux données de l'utilisateur dans wordpress comme son id 
   * permet d'enregistrer les informations de l'utilisateuer dans la base de données
   */
  saveUserData(data){
    this.afAuth.authState.subscribe(user => {
      this.firestore.doc(`users/${user?.uid}`).collection('customerId').doc('customer').set({
        clientID: data.id
      })

    })
  }

  // se connecter avec son adresse mail
  signInWithMail(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
    .then(
      () => {

        const data = {
          email: email ,
        }
        this.setUserData()
        this.productService.createCustomer(data).subscribe(data => {
          this.saveUserData(data)
        }
        )

      this.setUserData()
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
      this.setUserData()
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

