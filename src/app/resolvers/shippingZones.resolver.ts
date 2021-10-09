import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ShippingZones } from '../models/shipping.model';
import { ProductService } from '../services/product/product.service';

@Injectable({
    providedIn: 'root'
})
export class ShippingZonesResolver implements Resolve<ShippingZones[]> {
    constructor(
        private productService: ProductService
    ){}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<ShippingZones[]> | Promise<ShippingZones[]> | any {
        return this.productService.getShippingZones();
    }
}
