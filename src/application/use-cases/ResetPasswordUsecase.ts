import { IPendingUserRepository } from "../../domain/repositories/IPendingUserRepository.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { IOtpService } from "../../domain/services/IOtpService.js";


export class ResetPasswordUseCase{

    constructor(
        private UserRepository:IUserRepository
    ){}
    async execute(email:string,password:string){
        
        this.UserRepository.updatePassword(email,password)
    }
}