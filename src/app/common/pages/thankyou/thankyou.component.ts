import { Component, OnInit } from '@angular/core';
import { CheckoutComponent } from 'src/app/checkout/checkout.component';
import { CartService } from 'src/app/services/cart/cart.service';
import {BannerComponent} from 'src/app/common/components/banner/banner.component'

@Component({
    selector: 'thank-you',
    templateUrl: './thankyou.component.html', 
    styleUrls:['./thankyou.component.scss']
})
export class ThankYouComponent implements OnInit {

    
    orderId
    constructor(
        public cartService:CartService
    ) { 

        if(localStorage.getItem('orderId') !== null){
            CheckoutComponent.orderId = JSON.parse(localStorage.getItem('orderId') || '')
            return this.orderId = CheckoutComponent.orderId
          }

    }

    ngOnInit(): void { }
}
