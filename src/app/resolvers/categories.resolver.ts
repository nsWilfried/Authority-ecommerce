import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { ProductService } from '../services/product/product.service';

@Injectable({
    providedIn: 'root'
})
export class CategoriesResolve implements Resolve<Category[]> {
    constructor(
        private productService: ProductService
    ){}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Category[]> | Promise<Category[]> | any {
        return this.productService.getAllCategories();
    }
}
