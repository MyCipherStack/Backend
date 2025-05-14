
import { BaseRepository } from "../../infrastructure/repositories/BaseRespositroy.js";
import { IGetRepositoryDataUseCase } from "../interfaces/use-cases/IGetRepositoryDataUseCase.js";



export class GetRepositoryDataUseCase<T> implements IGetRepositoryDataUseCase<T>{
    constructor(
        private respository:BaseRepository<T>

    ){}

    async execute(id: string): Promise<T| null> {
        const data= await this.respository.findById(id)
        if(!data)return null
        return data
    }
}