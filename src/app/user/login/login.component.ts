import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   errMsg!: string
  hide: boolean= true 
  loginGroup!: FormGroup;  // ===> propriété pour construire un groupe de formulaire
  email!:string; // ===> email entré par l'utilisateur
  password!: string; // ===> mot de passe entré par l'utilisateur
  formValue; // ===> la valeur du formulaire
  constructor(  
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private sn: NbToastrService

  ) {

    // exécuter les fonctions
    this.createLoginForm()
 
   }

  ngOnInit(): void {
  }


 
  //  Google connection 
  googleConnection(){
    return this.authService.googleConnection()
  }

  // créer le formulaire de connection
  createLoginForm(){
   return  this.loginGroup = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.pattern( "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]) , 
      password: new FormControl('', [Validators.required, Validators.minLength(6)]) ,
    })

  }


  /**
   * 
   * @returns this.authService.signInWithEmail
   */

  onSubmit(){ // fonction à éxecuter lorsque l'utilisateur valide le formulaire

    this.formValue = this.loginGroup.value // fonction pour récupérer les valeurs des entrées du formulaire
    this.email = this.formValue['email'] // affecter l'email entré à une variable 
    this.password = this.formValue['password'] // affecter le password entré à une variable 
   
    return this.authService
    .signInWithMail(this.email, this.password)

  }
}
