import { Inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { paymentGateway } from '../models/payment.model';
import { ProductService } from '../services/product/product.service';
import {PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
    providedIn: 'root'
})
export class PaymentMethodsResolver implements Resolve<paymentGateway[]> {
    constructor(
        private productService: ProductService, 
        @Inject(PLATFORM_ID) private platformId,
    ){}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<paymentGateway[]> | Promise<paymentGateway[]> | any {
        if(isPlatformBrowser(this.platformId)){
            return this.productService.getPaymentGateways();

        }
    }
}
