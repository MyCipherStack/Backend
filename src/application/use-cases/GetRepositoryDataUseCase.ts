
import { IBaseRepository } from "../../domain/repositories/IBaseRepository";
import { IGetRepositoryDataUseCase } from "../interfaces/use-cases/IGetRepositoryDataUseCase";



export class GetRepositoryDataUseCase<T> implements IGetRepositoryDataUseCase<T>{
    constructor(
        private respository:IBaseRepository<T>
    ){}

    async OneDocumentByid(id: string): Promise<T| null> {
        const data= await this.respository.findById(id)
        return data ?? null
    }

    async allDoucuments():Promise<T[]|null>{
        const data=await this.respository.findAll()
        return data ?? null
    }
}