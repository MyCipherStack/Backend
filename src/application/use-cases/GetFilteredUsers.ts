import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { FilterDTO } from "../dto/FilterDTO.js";

import { IGetFilteredUsersUseCase } from "../interfaces/use-cases/IGetFilteredUsersUseCase.js";



/// WANT to rewrite this
export class GetFilteredUsersUseCase implements IGetFilteredUsersUseCase{
    constructor(
    private userRepository: IUserRepository,

    ){}

   async execute(filters:FilterDTO){

     const users= await this.userRepository.getFiltersUsers(filters)
      return users

   }
}