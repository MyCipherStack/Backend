import { IPendingUserRepository } from "../../domain/repositories/IPendingUserRepository.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { IHashAlgorithm } from "../../domain/services/IHashAlgorithm.js";
import { IOtpService } from "../../domain/services/IOtpService.js";
import { IResetPasswordUseCase } from "../interfaces/use-cases/IResetPasswordUseCase.js";


export class ResetPasswordUseCase implements IResetPasswordUseCase {

    constructor(
        private UserRepository:IUserRepository,
        private hashService: IHashAlgorithm
                
                
            ){}
            async execute(email:string,password:string){
                const hashedPassword = await this.hashService.hash(password);
                console.log(email,password);
                this.UserRepository.updatePassword(email,hashedPassword)
    }
}