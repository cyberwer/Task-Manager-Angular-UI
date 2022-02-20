import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ITask, IUpdateTask  } from 'src/app/interfaces/interface';



@Injectable({
  providedIn: 'root'
})
export class UserService {

   // api string
   private apiUrl = environment!.apiUrl; 

   public simpleHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };
   
   constructor(private httpPrivate: HttpClient){}    

 
          
 getTaskDetailByID(taskID:number): Observable<ITask[]> {
  const payload = new HttpParams()
  .set('taskID', taskID)
  return this.httpPrivate.get<ITask[]>(this.apiUrl + '/user/GetSelectedTaskByID', {params: payload });
}

getTaskListByUserName(userName:string): Observable<ITask[]> {
  const payload = new HttpParams()
  .set('userName', userName);
  return this.httpPrivate.get<ITask[]>(this.apiUrl + '/user/GetTasksListByUser', {params: payload });
}

getSelectedUserID(userName:string): Observable<string> {
  const payload = new HttpParams()
  .set('userName', userName);
  return this.httpPrivate.get<string>(this.apiUrl + '/user/GetSelectedUserID', {params: payload });
}

postNewTask(newTask: ITask): Observable<any> {
  const headers = { 'content-type': 'application/json' };
  const body = JSON.stringify(newTask);
  return this.httpPrivate.post(this.apiUrl + '/user/PostNewTask', body, { 'headers': headers })
}

updateTask(updateTask: IUpdateTask): Observable<any> {
  const headers = { 'content-type': 'application/json' };
  const body = JSON.stringify(updateTask);
  return this.httpPrivate.put(this.apiUrl + '/user/UpdateTasks', body, { 'headers': headers })
}

deleteSelectedTask(taskID:number): Observable<any> {
  const payload = new HttpParams()
  .set('taskID', taskID);
  return this.httpPrivate.delete<any>(this.apiUrl + '/user/DeleteSelectedTask', {params: payload });
}




}
