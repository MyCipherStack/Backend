import { PendingUser } from "@/domain/entities/PendingUser"



export interface IVerifyUserPasswordUseCase{
    execute(email:string,password:string):Promise<Boolean>
}


export interface IResetPassswordOtpUseCase{
    execute(email:string):Promise<PendingUser | null>
}


export interface IResetPassverifyOtpUseCase{
    execute(data:{email:string,otp:string}):Promise<boolean | {email:string,verified:boolean}>
}