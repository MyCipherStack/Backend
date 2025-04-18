
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