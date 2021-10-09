import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  hide: boolean= true 
  registerForm!: FormGroup;  // ===> propriété pour construire un groupe de formulaire
  email!:string; // ===> email entré par l'utilisateur
  password!: string; // ===> mot de passe entré par l'utilisateur
  formValue; // ===> la valeur du formulaire

  constructor(  
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {

      // executer les fonctions 
      this.createRegisterForm()
   }


  ngOnInit(): void {
  }

   // google connection
   googleConnection() {
    return this.authService.googleConnection()
  }


  // créer le formulaire de connection
  createRegisterForm(){
   return  this.registerForm = this.fb.group({
      email: ['',[ Validators.required,Validators.pattern( "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]], 
      password: ['', [Validators.required, Validators.minLength(6)]]
    })

  }


  /**
   * 
   * @returns this.authService.registerWithMail
   */

  onSubmit(){ // fonction à éxecuter lorsque l'utilisateur valide le formulaire

    this.formValue = this.registerForm.value // fonction pour récupérer les valeurs des entrées du formulaire
    this.email = this.formValue['email'] // affecter l'email entré à une variable 
    this.password = this.formValue['password'] // affecter le password entré à une variable 
   
    return this.authService
    .registerWithMail(this.email, this.password)
    

  }

}
