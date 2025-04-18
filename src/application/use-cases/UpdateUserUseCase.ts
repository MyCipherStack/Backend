import { IUserRepository } from "../../domain/repositories/IUserRepository.js";



export class UpdateUserUseCase{
      constructor(
    private userRepository: IUserRepository,

    ){}


 async   execute(email:string,updateData:{}){
        try{

          const updatedUser = await this.userRepository.updateFeildsByEmail(email,updateData);
          console.log(updatedUser,"updated useCase");
          return updatedUser ?? null

        }catch(error:any){
          console.log(error);
          throw new Error(error.message)
          
        }
        
    }   
}