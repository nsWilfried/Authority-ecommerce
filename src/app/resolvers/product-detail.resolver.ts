import { Inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product/product.service';
import {PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
    providedIn: 'root'
})
export class ProductDetailResolve implements Resolve<Product[]> {
    productId!:number
    constructor(
        private productService: ProductService,
        @Inject(PLATFORM_ID) private platformId,
        ){
    }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Product[]> | Promise<Product[]> | any {
        const  id: any = route.paramMap.get('id')
        if(isPlatformBrowser(this.platformId)){
            return this.productService.getSingleProduct(id);

        }
    }
}
