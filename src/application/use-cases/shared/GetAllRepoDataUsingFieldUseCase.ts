import { IGetAllRepoDataUsingFieldUseCase } from '@/application/interfaces/use-cases/ISharedUseCase';
import { IBaseRepository } from '@/domain/repositories/IBaseRepository';

export class GetAllRepoDataUsingFieldUseCase<Entity> implements IGetAllRepoDataUsingFieldUseCase<Entity> {
  constructor(
        private repository: IBaseRepository<Entity>,
  ) { }

  async execute(field: Partial<Entity>): Promise<Entity[] | null> {
    const filterData = await this.repository.findAllwithField({ ...field});

    return filterData ?? null;
  }
}

GetAllRepoDataUsingFieldUseCase;
