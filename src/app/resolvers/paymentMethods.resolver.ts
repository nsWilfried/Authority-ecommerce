import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { paymentGateway } from '../models/payment.model';
import { ProductService } from '../services/product/product.service';

@Injectable({
    providedIn: 'root'
})
export class PaymentMethodsResolver implements Resolve<paymentGateway[]> {
    constructor(
        private productService: ProductService
    ){}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<paymentGateway[]> | Promise<paymentGateway[]> | any {
        return this.productService.getPaymentGateways();
    }
}
