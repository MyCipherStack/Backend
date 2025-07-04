import { IBaseRepository } from "@/domain/repositories/IBaseRepository"; 
import { ICreateRepoUseCase } from "@/application/interfaces/use-cases/ICreateRepoUseCase"; 




export class CreateRepoUseCase<Entity> implements ICreateRepoUseCase<Entity> {
    constructor(
        private repository: IBaseRepository<Entity>
    ) { }
    async execute(data: Partial<Entity>): Promise<Entity | null> {
        const response = this.repository.create(data as Entity)
        return response ?? null
    }
}