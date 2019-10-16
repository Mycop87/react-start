export interface IUser{
  email:string;
  firstName:string;
  lastName:string;
  phone:string;
  isDefault:boolean;
  [index:string]: any;
}
