export interface ISendOtpUseCase{
    execute(email:string):Promise<void>
}

export interface IVerifyOtpUseCase{
    execute(email:string, otp:string):Promise<boolean>
}
