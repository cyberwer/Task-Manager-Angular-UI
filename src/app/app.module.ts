import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { GlobalErrorHandler } from './global_error/GlobalErrorHandler';
import { ErrorHandler } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { InterceptorService } from './service/interceptor.service';
import {AuthGuard} from './guards/auth.guard';
import {httpInterceptProviders} from './../../src/app/interceptors/index';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskEditDialogComponent } from './components/task-edit-dialog/task-edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    LoginComponent,
    RegisterComponent,  
    TaskEditDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,    
    MaterialModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: 'dashboard', component:TaskListComponent}
    ],{ onSameUrlNavigation: 'reload' })
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: InterceptorService, multi:true
    },   
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService, 
   // {
    //  provide: ErrorHandler, 
    //  useClass: GlobalErrorHandler
   // },
    httpInterceptProviders    
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
