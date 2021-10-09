import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product/product.service';

@Injectable({
    providedIn: 'root'
})
export class ProductsResolve implements Resolve<HttpResponse<Product[]>> {
    page: number = 0;
    constructor(
       private  productService: ProductService

    ){}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<HttpResponse<Product[]>> | Promise<HttpResponse<Product[]>> | any {
        return this.productService.getAllProducts(this.page+1);
    }
}
