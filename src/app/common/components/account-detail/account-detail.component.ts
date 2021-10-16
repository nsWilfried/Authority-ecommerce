import { Component, ViewChild} from '@angular/core'; 
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AccountComponent } from 'src/app/user/account/account.component';

@Component({
    selector: 'app-account-detail', 
    templateUrl: './account-detail.component.html', 
    styleUrls: ['./account-detail.component.scss']
})

export class AccountDetailComponent {
    userInfoGroup!:FormGroup 
    userInfoValue;
    userName:FormControl = new FormControl(this.authService.name, [Validators.required])
    userEmail: FormControl = new FormControl({value: this.authService.email, disabled: true}, [Validators.required])
    constructor(
        public authService: AuthService, 
        private fb:FormBuilder, 
        private firestore: AngularFirestore, 
        private afAuth: AngularFireAuth
    ){
        this.buildUserInfoForm()
    }


    buildUserInfoForm(){
        this.userInfoGroup = this.fb.group({
            userName: this.userName, 
            userEmail: this.userEmail
        })
    }

    updateUserInfo(){
        this.userInfoValue = this.userInfoGroup.value
        this.afAuth.authState.subscribe(user =>{
            if(user){
        
                this.firestore.doc(`users/${user.uid}`).update({
                    displayName: this.userInfoValue['userName']
                })

            }
        } )
    }
}