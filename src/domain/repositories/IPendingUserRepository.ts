
import { temUser } from "../entities/temUser.js";


export interface IPendingUserRepository {
    save(name:string,email:string,password:string,otp?:string):Promise<string>;
    findValidUser(email:string):Promise< temUser | null>;
    delete(email:string):Promise<void>
    updateOtp(email:string,otp:string):Promise<void>
}