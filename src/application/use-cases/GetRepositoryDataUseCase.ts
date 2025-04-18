import { Admin } from "../../domain/entities/admin.js";
import { User } from "../../domain/entities/User.js";
import { IAdminRepository } from "../../domain/repositories/IadminRepository.js";

import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { ProfileDTO } from "../dto/ProfileDTO.js";
import { IGetRepositoryDataUseCase } from "../interfaces/use-cases/IGetRepositoryDataUseCase.js";



export class GetRepositoryDataUseCase<T> implements IGetRepositoryDataUseCase<T>{
    constructor(
        private respository:{findById(id:string):Promise<T| null>}
    ){}

    async execute(id: string): Promise<T| null> {
        const data= await this.respository.findById(id)
        return data ?? null
    }
 
}