import { IBaseRepository } from '@/domain/repositories/IBaseRepository';
import { IGetRepositoryDataUseCase } from '@/application/interfaces/use-cases/IGetRepositoryDataUseCase';

export class GetRepositoryDataUseCase<T> implements IGetRepositoryDataUseCase<T> {
  constructor(
        private repository:IBaseRepository<T>,
  ) {}

  async OneDocumentById(id: string): Promise<T| null> {
    const data = await this.repository.findById(id);
    return data ?? null;
  }

  async allDocuments():Promise<T[]|null> {
    const data = await this.repository.findAll();
    return data ?? null;
  }
}
