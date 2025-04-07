import { User } from "./User.js";


export class temUser extends User{
    constructor(
        name:string,
        email:string,
        password:string,
        public otp:string,
        public createdAt:Date
    ){
        super(name,email,password)
    }
  
}