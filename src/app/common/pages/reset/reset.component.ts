import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NbToastrService } from  '@nebular/theme';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'reset-password',
    templateUrl: './reset.component.html',
    styleUrls: [`./reset.component.scss`]
})
export class ResetPasswordComponent implements OnInit {

    resetEmailForm = new FormControl('', [Validators.required, Validators.email]);
    showError:boolean = false;
    constructor(

        private authService: AuthService, 
        private sn: NbToastrService, 

    ) { 
    }
    

    ngOnInit(): void { }


    // envoyer l'email de rénitialisation du password
  sendPasswordEmail() {
    this.showError  = false

    return this.authService.resetPassword(this.resetEmailForm.value)
    
    .then(result => {
      this.sn.show('vous avez reçu un email de rénitialisation', 'Email Envoyé', {status: 'success'})
      this.resetEmailForm.reset()
    }).catch(err => {
      this.showError = true
    })

}

  // close alert 
  onClose(){
    this.showError = false
  }

}
