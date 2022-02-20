export interface IUser
{

}

export interface ITask{
  TaskID:number;
  TaskName:string;
  TaskDetail:string;
  TaskDateTime:string;
  UserName:string;
  Created:string;
}

export interface IUpdateTask{
  TasksID:number;
  TaskName:string;
  TaskDetail:string;
  TaskDateTime:string;
  UserName:string;
  Created:string;
}

export interface IUserRegister {   
    FirstName: string;
    LastName: string;     
    MobileNumber: string;
    Email: string;
    Password: String;
    ConfirmPassword: string;
    
  }

  export interface IUserLogin
  {
    username: string;
    password: string;
    grant_type:string;

  }