


export interface IVerifyUserPasswordUseCase{
    execute(email:string,password:string):Promise<Boolean>
}