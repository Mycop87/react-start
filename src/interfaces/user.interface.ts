export interface IUser{
  email:string;
  firstName:string;
  lastName:string;
  phone:string;
  isDefault:boolean;
  password:string;
  [index:string]: any;
}
