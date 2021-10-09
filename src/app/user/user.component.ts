import {Component, OnInit} from '@angular/core'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'

@Component({
    selector: 'user', 
    templateUrl: './user.component.html', 
    styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

    dynamicComponent:any
    login: any  = LoginComponent
    register: any = RegisterComponent
    constructor(){}

    ngOnInit(){
        this.dynamicComponent = this.login
    }

    goToRegister(){
        return this.dynamicComponent = this.register
    }
    goToLogin(){
        return this.dynamicComponent = this.login 
    }

}