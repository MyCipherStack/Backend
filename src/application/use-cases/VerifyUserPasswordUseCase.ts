import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { IHashAlgorithm } from "../../domain/services/IHashAlgorithm.js";
import { IVerifyUserPasswordUseCase } from "../interfaces/use-cases/IVerifyUserPasswordUseCase.js";




export class VerifyUserPasswordUseCase implements IVerifyUserPasswordUseCase  {

    constructor(
      private userRepository:IUserRepository,
      private hashService:IHashAlgorithm
    ){}

   async execute(email: string, password: string): Promise<Boolean> {
        const userData= await this.userRepository.findByEmail(email)
        if(userData?.password){
            const isValid=await this.hashService.compare(password,userData.password)
            return isValid
        }
        return false
   }
        
}