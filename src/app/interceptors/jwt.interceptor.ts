import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor,HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { Router} from '@angular/router';
import { tap} from 'rxjs/operators';
import { AccountService } from '../service/account.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private injector: Injector, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 

    let authService = this.injector.get(AccountService);
 
    let tokenizedRequest = request.clone({      
       headers: request.headers.set('Authorization','Bearer ' + authService.getToken())                             
    });
       return next.handle(tokenizedRequest)
       .pipe(tap(
           succ => {
               
           },
           err => {
             if (err.status === 401)
             console.log("401 error");
             this.router.navigateByUrl('/login');
           }  
                  
         ));   
  }
 }
 
 
 