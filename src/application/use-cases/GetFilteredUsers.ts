import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { FilterDTO } from "../dto/FilterDto.js";



export class GetFilteredUsers{
    constructor(
    private userRepository: IUserRepository,

    ){}

   async exicute(filters:FilterDTO){

  const users= await this.userRepository.getFiltersUsers(filters)
    console.log(users);
    

   }
}