import { User } from "./User.js";


export class temUser extends User{
    constructor(
        name:string,
        email:string,
        password:string,
        public createdAt:Date,
        public otp?:string,
    ){
        super(name,email,password)
    }
  
}