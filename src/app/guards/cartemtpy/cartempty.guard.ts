import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class CartemptyGuard implements CanActivate {
  constructor(
    private cartService:CartService, 
    private router:Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.cartService.cart.length === 0){
      return this.router.navigate(['/'])
    }else {
      return true
    }
  }
  
}
