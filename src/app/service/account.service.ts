import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpBackend , HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {Router} from '@angular/router';
import {IUser, IUserLogin, ITask, IUserRegister  } from '../interfaces/interface';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  token:string =';'
  private _userRole: string;
  private userSubject: BehaviorSubject<IUser>;
  private userLoggedIn = new Subject<boolean>();
  //public token: Observable<Token>;
    
  private httpPublic: HttpClient;
  //private http: HttpClient;

  constructor(private httpPrivate: HttpClient, 
    private router: Router, handler: HttpBackend
    ,public jwtHelper: JwtHelperService
    ) {
        this.httpPublic = new HttpClient(handler);
   
  }

  public get userValue(): IUser {
    return this.userSubject.value;
  } 
  
  private apiUrl = environment!.apiUrl;
  

  public simpleHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };


login(username:string, password:string): Observable<any> {
  const payload = new HttpParams()
  .set('username', username)
  .set('password', password)
  .set('grant_type', 'password');
return this.httpPublic.post('https://localhost:44370/oauth/token', payload)

    .pipe(map(token => {  
      //idle timeout / logout
       this.setUserLoggedIn(true);  
       return token;       
  },
  err => {
    if(err.status == 400){
      console.log(err);
      return('Authenitication failed');
    }     
    else{
      console.log(err);
      return('Authenitication failed');
    }
  }
  ));  
}


isLoggedin(){
  if(localStorage.getItem('userToken') != null || !this.jwtHelper.isTokenExpired('userToken'))
  {
    return true;
  }
  else
  {
    return false;
  }  
}
//!this.jwtHelper.isTokenExpired('userToken')

getToken(){
  return localStorage.getItem('userToken'); 
}

postUserRegister(userRegister :IUserRegister) {
  return this.httpPublic.post(this.apiUrl + '/account/PostUserRegister', userRegister);
}

delete(id: string) {
  return this.httpPrivate.delete(this.apiUrl + '/account/users/${id}')
      .pipe(map(x => {
          // auto logout if the logged in user deleted their own record
         // if (id == this.userValue.token) {
         //     this.logout();
         // }
          return x;
      }));
}

    

    logout() {
      //return this.httpPrivate.get(this.apiUrl + '/account/Logout');
      // remove user from local storage and set current user to 
      //lougout of api here too  add it.
      this.setUserLoggedIn(false);  
      localStorage.clear();
      //this.userSubject.next(null);
      this.router.navigate(['/login']);     
      //localStorage.removeItem('userToken');
      //localStorage.removeItem('userName');
      //window.location.reload();    
    } 
    setUserLoggedIn(userLoggedIn: boolean) {
      this.userLoggedIn.next(userLoggedIn);
    }
    
    getUserLoggedIn(): Observable<boolean> {
      return this.userLoggedIn.asObservable();
    }

    addUserRole(role: string){
      this._userRole = role;
    }

    getUserRole(){
      return this._userRole;
    }

   
}


