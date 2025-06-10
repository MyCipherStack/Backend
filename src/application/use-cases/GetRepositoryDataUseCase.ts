
import { IBaseRepository } from "../../domain/repositories/IBaseRepository.js";
import { IGetRepositoryDataUseCase } from "../interfaces/use-cases/IGetRepositoryDataUseCase.js";



export class GetRepositoryDataUseCase<T> implements IGetRepositoryDataUseCase<T>{
    constructor(
        private respository:IBaseRepository<T>

    ){}

    async execute(id: string): Promise<T| null> {
        const data= await this.respository.findById(id)
        return data ?? null
    }
}