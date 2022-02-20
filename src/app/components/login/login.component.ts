import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AccountService } from 'src/app/service/account.service';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  patientUserID: string = '';
   
  @ViewChild('alert', { static: true }) alert: ElementRef; 

  loginForm: FormGroup;
  loading = false;
  submitted = false;   
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  IsFormInvalid = false;
  IsCredentailValid = false;
  userID:string= '';
  


  constructor(
    private accountService: AccountService,
    private userService: UserService,
      private formBuilder: FormBuilder,    
     private router: Router){}

  ngOnInit() {
    localStorage.clear();
      // convenience getter for easy access to form fields
  
    
      this.loginForm = this.formBuilder.group({
          username: ['', [Validators.required,  Validators.email, Validators.pattern(this.emailRegx)]],
          password: ['', [Validators.required, Validators.minLength(8)]],
          grant_type : 'password'
          
      });     
  }

 

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  } 

  Register(){
    this.router.navigate(['/register']);
  }

  get f() { return this.loginForm.controls; }

  async onSubmitLoginForm() {
    this.loading = true;
    var TwoFactorCode = Math.floor(1000 + Math.random() * 9000);
         
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        this.IsFormInvalid = true;
        this.IsCredentailValid = false;
        this.loading = false;
        return;
    }
    try{    
    this.loading = true;        
    this.accountService.login(this.f?.['username'].value, this.f?.['password'].value)
    .pipe(first())
    .subscribe(
        data => {
            localStorage.setItem('userToken', data.access_token); 
            console.log(data.access_token);           
            localStorage.setItem('userName',this.f?.['username'].value);  
            this.router.navigate(['/task']);         
            },
            (error:any) => {
                console.log(error);   
                this.IsFormInvalid = false;
                this.IsCredentailValid = true;                     
                this.loading = false;                                   
            });      
        }
        catch(err){
            console.error(err);            
          }
   }

 getUserID(username:string) {   
    try{    
    this.loading = true;        
    this.userService.getSelectedUserID(username).subscribe(x => this.userID = x);
        localStorage.setItem('userID', this.userID);  
        console.log("User ID" + this.userID);       
        this.router.navigate(['/task']);                                                           
             
    }
    catch(err){
            console.error(err);  
           // this.router.navigate(['/login']);          
      }
   }
   
}


           
