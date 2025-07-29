import { FilterDTO } from "@/application/dto/FilterDTO";
import { ITransactionUseCase } from "@/application/interfaces/use-cases/IAdminUseCase";
import { Transaction } from "@/domain/entities/Transaction";
import { ITransactionRepotitory } from "@/domain/repositories/ITransactionRepotitory";



export  class TransactionUseCase implements ITransactionUseCase {
    constructor(
        private transactionRepotitory:ITransactionRepotitory
    ) {
        
    }
  async  execute(filters:FilterDTO): Promise<{ transaction: Transaction[]; totalTransaction: number; totalPages: number; }> {
        
    const response=await    this.transactionRepotitory.getFiltersTrasations(filters)
        
    return  response
    }


} 