import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   * 
   * @param afAuth 
   * @param router 
   * 
   * si l'utilisateur n'est pas connecté on lui refuse l'accès au checkout, au thankyou
   * s'il est connecté on lui refuse l'accès au login et au register
   */
  constructor(private afAuth: AngularFireAuth, private router:Router) {
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     this.afAuth.authState.subscribe(user => {
      if(user) {
         true
      }else {
        this.router.navigate(['/user'])

      }
      return false
    });
    
    return true 
  }
  
}
