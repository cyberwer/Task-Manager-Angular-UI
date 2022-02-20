import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AuthGuard} from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: "", component: LoginComponent },  
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "task", component: TaskListComponent, canActivate: [AuthGuard] },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
