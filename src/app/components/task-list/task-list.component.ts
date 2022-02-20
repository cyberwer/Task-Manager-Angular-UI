import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule} from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import {Router, NavigationEnd,ActivatedRoute} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/service/account.service';
import { map } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';
import { ITask  } from 'src/app/interfaces/interface';
import { Observable } from 'rxjs';
import { TaskEditDialogComponent } from '../task-edit-dialog/task-edit-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  loading = false; 
  taskForm:FormGroup;
  dialogValue: string = '';
  deleteRes:any;

  dataSource = new UserDataSource(this.userService);
  msgNoData = this.dataSource.connect().pipe(map(data => data.length === 0));
  displayedColumns: string[] = ['TaskDateTime', "TaskName",  "TaskDetail", 'Action'];

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private accountService: AccountService,
    private toastr : ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog) {} 
     

  ngOnInit(){

    console.log(localStorage.getItem('userName')); 

    this.taskForm = this.formBuilder.group({        
      TaskName: ['',[Validators.required]],   
      TaskDetail: ['', [Validators.required]], 
      TaskDateTime: ['', [Validators.required]],
      UserName:[localStorage.getItem('userName'), [Validators.required]],      
    });  
  }

 onSubmitNewTaskForm(){ this.loading = true;
    // stop here if form is invalid
    if (this.taskForm.invalid) {       
        this.loading = false; 
        return;      
    }
    try {
      this.loading = true;    
      this.userService.postNewTask(this.taskForm.value).subscribe(res => {
      this.toastr.success('Task added successfully');    
      this.clearForm();        
      })   
    } 
    catch(err){
      console.error(err);
      }
      this.loading = false;
      this.refreshComponent();   
  }    

  refresh(){
    this.ngOnInit();
  }

  refreshComponent(){
    this.router.navigate([this.router.url])
 }

  clearForm(){
    this.taskForm.patchValue({      
      TaskName: " ",
      TaskDetail: " ",
      TaskDateTime:" "})

  } 

  openEditialog(id) {
   
    const dialogRef = this.dialog.open(TaskEditDialogComponent, {
      width: '600px',
      height: '350px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: { TaskIDValue: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.dialogValue = result.data;
    });
  }

  logOff(){
    this.accountService.logout();
  }
  

  async delete(id:number){   
    try {
      await this.userService.deleteSelectedTask(id).subscribe((data) => {     
        this.deleteRes = data;  
        this.toastr.success(this.deleteRes);
      })
       
    }
    catch(err){
      console.log(err.message);
    }   
  }

}

export class UserDataSource extends DataSource<ITask> {
  constructor(private userService: UserService) {
    super();
  }
  
  connect(): Observable<ITask[]> {
    let _uerID = localStorage.getItem('userName');    
    return this.userService.getTaskListByUserName(_uerID);
  }
  disconnect() {}
}


