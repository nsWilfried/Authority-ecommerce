import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { share } from 'rxjs/operators';
export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable({
    providedIn: 'root'
})
/**
 * Interceptor take request manipulate this
 */
export class ProductsInterceptor implements HttpInterceptor {
    cache: any;

   
   
     
    intercept(req: HttpRequest<any>,  next: HttpHandler ): Observable<HttpEvent<any>>  {
        

                if (req.headers.has(InterceptorSkipHeader)) {
                    const headers = req.headers.delete(InterceptorSkipHeader);
                    return next.handle(req.clone({ headers }));

                }

              

        
                if (req.url.includes('/wordpress/wp-json/wc')){
                    const  cloneReq= req.clone({
                        // url: req.url.replace('http://', 'https://'),
                        setParams: {
                            consumer_key: environment.woocommerce.consumer_key, 
                            consumer_secret: environment.woocommerce.consumer_secret
                        }

                        
                  })
                  return next.handle(cloneReq)

                  
              
                } else {
                    return next.handle(req.clone())

                }



        

        
      

    
    }
    
}