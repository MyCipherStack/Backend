import { IBaseRepository } from '@/domain/repositories/IBaseRepository';
import { IUpdateRepositoryDataUseCase } from '@/application/interfaces/use-cases/ISharedUseCase';

export class UpdateRepositoryDataUseCase<Entity> implements IUpdateRepositoryDataUseCase<Entity> {
  constructor(
        private repository: IBaseRepository<Entity>,

  ) { }

  async execute(id: string, updateData: Partial<Entity>): Promise<Entity | null> {
    const data = await this.repository.updateOneById(id, updateData);

    return data ?? null;
  }
}
