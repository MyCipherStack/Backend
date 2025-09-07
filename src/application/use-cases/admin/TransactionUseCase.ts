import { FilterDTO } from '@/application/dto/FilterDTO';
import { ITransactionUseCase } from '@/application/interfaces/use-cases/IAdminUseCase';
import { Transaction } from '@/domain/entities/Transaction';
import { ITransactionRepository } from '@/domain/repositories/ITransactionRepository';

export class TransactionUseCase implements ITransactionUseCase {
  constructor(
        private transactionRepository:ITransactionRepository,
  ) {

  }

  async execute(filters:FilterDTO): Promise<{ transaction: Transaction[]; totalTransaction: number; totalPages: number; }> {
    const response = await this.transactionRepository.getFiltersTrasations(filters);

    return response;
  }
}
