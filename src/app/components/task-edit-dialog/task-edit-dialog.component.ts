import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule} from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-edit-dialog',
  templateUrl: './task-edit-dialog.component.html',
  styleUrls: ['./task-edit-dialog.component.css']
})
export class TaskEditDialogComponent implements OnInit {

  loading = false; 
  taskEditForm:FormGroup;
  taskID: number = -1;
  taskData = null;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr : ToastrService,  
    public dialogRef: MatDialogRef<TaskEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(){    
    //passing value from parent to this dialog
   this.taskID = this.data.TaskIDValue;  
   this.GetSelectedTask(this.taskID); 
  

    this.taskEditForm = this.formBuilder.group({   
      TasksID:  ['',[Validators.required]],    
      TaskName: ['',[Validators.required]],   
      TaskDetail: ['', [Validators.required]], 
      TaskDateTime: ['', [Validators.required]],
      UserName:[localStorage.getItem('userName'), [Validators.required]],      
    });  
  }

  clearForm(){
    this.taskEditForm.patchValue({      
      TaskName: " ",
      TaskDetail: " ",
      TaskDateTime:" "})

  } 

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.taskEditForm });
  }


  async GetSelectedTask(ID:number){
    try{
      await this.userService.getTaskDetailByID(ID).subscribe((data) => {     
        this.taskData = data;  
      })
    }
    catch(err){
      console.error(err);
    }  
    finally{
      this.taskEditForm.patchValue({      
        TasksID: this.taskID})
    }      
  }



  onSubmitEditrTaskForm(){
     // stop here if form is invalid
     if (this.taskEditForm.invalid) {       
      this.loading = false; 
      return;      
    }
    try {
      this.loading = true;    
      this.userService.updateTask(this.taskEditForm.value).subscribe(res => {
      this.toastr.success('Task updated successfully');    
      this.clearForm();  
      this.closeDialog();      
      })   
    } 
    catch(err){
      console.error(err);
      }
      this.loading = false;
      //this.refresh();   
    }


  }


