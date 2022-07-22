import { HttpResponse } from '@angular/common/http';
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
export class ProductsResolve implements Resolve<HttpResponse<Product[]>> {
    page: number = 0;
    constructor(
       private  productService: ProductService, 
       @Inject(PLATFORM_ID) private platformId,

    ){}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<HttpResponse<Product[]>> | Promise<HttpResponse<Product[]>> | any {
        if(isPlatformBrowser(this.platformId)){
            return this.productService.getAllProducts(this.page+1);

        }
    }
}
