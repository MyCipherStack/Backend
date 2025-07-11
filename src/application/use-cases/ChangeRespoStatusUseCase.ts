
import { IBaseRepository } from "@/domain/repositories/IBaseRepository.js";
import { IChangeRespoStatusUseCase } from "../interfaces/use-cases/IChangeRespoStatusUseCase.js";



export class ChangeRespoStatusUseCase<Entity> implements IChangeRespoStatusUseCase<Entity> {
    constructor(
        private repository: IBaseRepository<Entity>

    ) { }


    async execute(id: string, status: Partial<Entity>): Promise<Entity | null> {
        const data = await this.repository.updateOneById(id, {status})

        return data ?? null
    }

}
