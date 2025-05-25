import { IBaseRepository } from "../../domain/repositories/IBaseRepository.js";
import { ICreateRepoUseCase } from "../interfaces/use-cases/ICreateRepoUseCase.js";







export class CreateRepoUseCase<T> implements ICreateRepoUseCase<T>{
    constructor(
        private repository:IBaseRepository<T>
    ){}
 async   execute(data: Partial<T>): Promise<T| null> {
      const response =this.repository.create(data as T)
        return response ?? null
    }
}