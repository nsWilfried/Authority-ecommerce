import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree , Router} from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PasswordResetGuard implements CanActivate {
  constructor(
    private router:Router
  ){
 
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(route.queryParams.mode && route.queryParams.oobCode && route.queryParams.apiKey){
        return true
      }else {
        this.router.navigate(['/user/reset'])
      }
      return true
  }
  
}
