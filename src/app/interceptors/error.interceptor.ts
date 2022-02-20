import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor,HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { Router} from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AccountService } from 'src/app/service/account.service';
//import { ErrorObservable } from 'rxjs/observable/ErrorObservable';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private injector: Injector, private router: Router, private accountService: AccountService) {}

 handleError(error: HttpErrorResponse){
    //add servive to record the error
   console.log('Interceptor reporting error');
   return throwError(error);
 }

  handleErrors(errorResponse: HttpErrorResponse){
    if (errorResponse.error instanceof ErrorEvent){
      console.error('Client side error: ', errorResponse.error.message);
    } else {
      console.error('Server side error: ', errorResponse);
    }
   // return new ErrorObservable('There is a problem with the service. We are working to reslove it quickly')
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('this is client side error');
            errorMsg = `Error: ${error.error.message}`;
            //this.accountService.logout();
          }
          else {
            console.log('this is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            //this.accountService.logout();
          }
          console.log("Error Msg" + errorMsg);
          return throwError(errorMsg);
        })
      )
  }
}


