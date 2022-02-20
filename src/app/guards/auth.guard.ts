import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../service/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AccountService, private router: Router){}

  canActivate(): boolean {
    if(this.authService.isLoggedin()){
      return true;
    }
    else
    {
      this.router.navigate(['/login'])    
      return false;
    }
  }
   
}
  

