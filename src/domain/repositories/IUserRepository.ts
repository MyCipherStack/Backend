import { promises } from "dns";
import { User } from "../entities/User.js";

export interface IUserRepository{
    create(user:User):Promise<User>;
    findByEmail(email:string):Promise<User | null >;
    findById(id:string):Promise<User |null >
    findByUserName(name:string):Promise<User |null >
}


export interface IAuthRepository{
    login(email:string,password:string):Promise<{token:string,user:User}>
    logout(userId:string):Promise<void>
    verifyToken(token:string):Promise<User |null>
}
