import { IUserRepository } from "../../domain/repositories/IUserRepository.js";



export class UpdateUserUseCase{
      constructor(
    private userRepository: IUserRepository,

    ){}


 async   execute(userId:string,updateData:{}){
        const updatedUser = await this.userRepository.updateFeildsById(userId, updateData);
        return updatedUser
    }   
}