
import { IBaseRepository } from "@/domain/repositories/IBaseRepository"; 
import { IGetRepositoryDataUseCase } from "@/application/interfaces/use-cases/IGetRepositoryDataUseCase"; 



export class GetRepositoryDataUseCase<T> implements IGetRepositoryDataUseCase<T>{
    constructor(
        private respository:IBaseRepository<T>
    ){}

    async OneDocumentById(id: string): Promise<T| null> {
        const data= await this.respository.findById(id)
        return data ?? null
    }

    async allDocuments():Promise<T[]|null>{
        const data=await this.respository.findAll()
        return data ?? null
    }
}