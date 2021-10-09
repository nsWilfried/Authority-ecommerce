import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';
import { share, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CacheInterceptor implements HttpInterceptor {
    private cache: Map<HttpRequest<any>, HttpResponse<any>> = new Map()
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
      if(req.method !== "GET") {
          return next.handle(req)
      }
      const cachedResponse: HttpResponse<any> | undefined= this.cache.get(req)
      if(cachedResponse) {
          return of(cachedResponse.clone())
      }else {
          return  next.handle(req).pipe(
              tap(stateEvent => {
                  if(stateEvent instanceof HttpResponse) {
                        this.cache.set(req, stateEvent.clone())
                  }
              })
              
          )
          
          
      }
    }  
      
  
}