import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar'
@Component({
    selector: 'password-page',
    templateUrl: './password-page.component.html',
    styleUrls: ['./password-page.component.scss']
})

export class PasswordPageComponent implements OnInit {


    horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    newPasswordGroup!: FormGroup;
    newPasswordValue; 
    confirmPassword!:FormControl;
    newPassword!:FormControl;

    constructor(
        private fb:FormBuilder, 
        private authService: AuthService, 
        private router: Router, 
        private route: ActivatedRoute,
        private snackbar: MatSnackBar

    ) { 

        this.createFormControl()
        // exécuter les fonctions 
        this.createNewPasswordForm()
    }

    createFormControl(){
        this.confirmPassword = new FormControl(null,Validators.compose([Validators.required, Validators.minLength(6)]))
        this.newPassword = new FormControl(null, Validators.compose([Validators.required, Validators.minLength(6)]))
    }

    static passwordMatchValidator(control: AbstractControl){
        let np:any =control.get('newPassword')
        let cp:any = control.get('confirmPassword')
        const password = cp.value; // get password from our password form control
        const confirmPassword = cp.value; // get password from our confirmPassword form control
        // compare is the password math
        if (password !== confirmPassword) {
          // if they don't match, set an error in our confirmPassword form control
         cp.setErrors({ NoPassswordMatch: true });
        }
      }
    // créer le formulaire pour enregister un nouveau mot de passe
    createNewPasswordForm(){
        return  this.newPasswordGroup = this.fb.group({
        newPassword: this.newPassword , 
        confirmPassword: this.confirmPassword ,
        },
        {
            // our validator for the form group
            validator: PasswordPageComponent.passwordMatchValidator
          })
    
    }


    // configurer un nouveau mot de passe
    addNewPassword(){

        let oobCode  = this.route.snapshot.queryParams['oobCode']

        // console.log(oobCode)

        this.newPasswordValue = this.newPasswordGroup.value
        this.newPassword = this.newPasswordValue['newPassword']
        this.confirmPassword = this.newPasswordValue['confirmPassword']

        if(this.newPassword === this.confirmPassword)  {
        
        
             this.authService.addNewPassword(this.confirmPassword, oobCode)

                .then(
                    result => {
                        this.router.navigate(['/user'])
                    }, 
                    error => {
                        this.newPasswordGroup.reset()
                        switch(error.code){
                            case 'auth/id-token-expired ': 
                               console.log('Cette action a expiré.Veuillez reccommencer le processus.')
                               break;
                            case 'auth/argument-error': 
                                 console.log('Erreur dans le processus de rénitialisation. Veuillez réesayer plus tard')
                                 break;
                            default: 
                                console.log('Oops,une erreur s\'est produite. Veuillez réessayer plus tard')

                        }
                    }
                )
            
        }

        else {
    //          this.snackbar.open('Mot de passe incorrect', 'dance' , {
    //              duration:3000, 
    //               horizontalPosition: this.horizontalPosition,
    //   verticalPosition: this.verticalPosition,
    //          })
    console.log('mot de passe incorrect')

        }
    }

    ngOnInit(): void { }
}
