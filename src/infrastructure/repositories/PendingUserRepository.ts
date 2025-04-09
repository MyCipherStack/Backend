import { SignPrivateKeyInput } from "crypto";
import { temUser } from "../../domain/entities/temUser.js";
import { IPendingUserRepository } from "../../domain/repositories/IPendingUserRepository.js";
import { PendingUser } from "../database/PendingUser.js";

export class PendingUserRepository  implements IPendingUserRepository {

    async save(name:string,email: string,password:string,otp?:string): Promise<string> {
     const user=await PendingUser.create({name,email,password,otp})
     return user.email

    }

    async updateOtp(email:string,temUser: string):Promise<void> {
        await PendingUser.findOneAndUpdate({email},{otp:temUser,createdAt:new Date()})
    }
    async findValidUser(email: string): Promise<temUser | null> {
    const found=await PendingUser.findOne({email})
    if(!found) return null
    return new temUser(found.name,found.email,found.password,found.createdAt,found.otp ?? "",)
    }   

    async delete(email: string): Promise<void> {
        await PendingUser.deleteOne({email})   
    }

   
}