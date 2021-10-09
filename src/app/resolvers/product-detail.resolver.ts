import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product/product.service';

@Injectable({
    providedIn: 'root'
})
export class ProductDetailResolve implements Resolve<Product[]> {
    productId!:number
    constructor(
        private productService: ProductService
        ){
    }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Product[]> | Promise<Product[]> | any {
        const  id: any = route.paramMap.get('id')
        return this.productService.getSingleProduct(id);
    }
}
