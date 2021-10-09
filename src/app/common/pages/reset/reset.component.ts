import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'reset-password',
    templateUrl: './reset.component.html',
    styleUrls: [`./reset.component.scss`]
})
export class ResetPasswordComponent implements OnInit {

    resetEmailForm = new FormControl('', [Validators.required, Validators.email]);
    constructor(

        private authService: AuthService

    ) { }
    

    ngOnInit(): void { }


  sendPasswordEmail() {
    return this.authService.resetPassword(this.resetEmailForm.value)
    
    .then(result => {

      this.resetEmailForm.reset()
      console.log('email envoyé');
    });

}

}
