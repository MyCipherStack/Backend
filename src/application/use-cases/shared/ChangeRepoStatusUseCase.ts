import { IBaseRepository } from '@/domain/repositories/IBaseRepository';
import { IChangeRepoStatusUseCase } from '@/application/interfaces/use-cases/ISharedUseCase';

export class ChangeRepoStatusUseCase<Entity> implements IChangeRepoStatusUseCase<Entity> {
  constructor(
        private repository: IBaseRepository<Entity>,

  ) { }

  async execute(id: string, status: Partial<Entity>): Promise<Entity | null> {
    const data = await this.repository.updateOneById(id, status);

    return data ?? null;
  }
}
