import { PendingUser } from "../entities/PendingUser";
import { IBaseRepository } from "./IBaseRepository";

export interface IPendingUserRepository extends IBaseRepository<PendingUser> {
    // save(name:string,email:string,password:string,otp?:string):Promise<string>;

    findValidUser(email:string):Promise<PendingUser | null>;
    delete(email:string):Promise<void>
    updateOtp(email:string, otp:string):Promise<void>
}
