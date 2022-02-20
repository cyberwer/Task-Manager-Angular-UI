import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AccountService } from 'src/app/service/account.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  subscribedParam: string;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
 

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private formBuilder: FormBuilder,
    private accountService: AccountService){}  


  ngOnInit() {
    localStorage.clear();
    
     

    this.registerForm = this.formBuilder.group({
          FirstName: ['', [Validators.required]], 
          LastName: ['', [Validators.required]],          
          MobileNumber: ['', [Validators.required]],          
          Email: ['', [Validators.required, Validators.email]],
          Password: ['', [Validators.required, Validators.minLength(8)]],
          ConfirmPassword: ['', [Validators.required, RxwebValidators.compare({fieldName:'Password'})]]      
            
      });        
  }

  clearForm(){
    this.registerForm.patchValue({      
      eventSubject: " ",
      //eventDateTime: " ",
      eventDetail:" ",
      selectedUser:" "  
    })   
  } 

 
   // convenience getter for easy access to form fields
   get f() { return this.registerForm.controls; }

   async onSubmitSignUpForm() {
      this.loading = true; 
      console.log(this.registerForm.value);      
       if (this.registerForm.invalid) {
        this.loading = false; 
        return;
       }
      
       try{         
          this.accountService.postUserRegister(this.registerForm.value)
              .pipe(first())
              .subscribe(
                  data => {                         
                    this.loading = false;
                    this.router.navigate(['/login'], { relativeTo: this.route });
                  },
                  error => {
                    this.loading = false;      
                    
                  });
      }
     catch(err){
        this.loading = false;
        console.error(err);	     
      }
   }

   MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}



 }