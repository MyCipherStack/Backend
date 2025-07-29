import { Transaction } from "../entities/Transaction";
import { IBaseRepository } from "./IBaseRepository";


export interface ITransactionRepotitory extends IBaseRepository<Transaction> {

    transatonsGrowthByRange(format: string, startDate: Date): Promise<{
        transactionDetails: {
            range: string;
            revenue: string;
        }[], thisMonth: number
    } | null>

    getFiltersTrasations(filters: { page: number, limit: number, status?: string }): Promise<{
        transaction: any[];
        totalTransaction: number;
        totalPages: number
    }
    >


}