import { Transaction } from "../entities/Transaction";
import { IBaseRepository } from "./IBaseRepository";


export interface ITransactionRepotitory extends IBaseRepository<Transaction>{

 transatonsGrowthByRange(format:string,startDate:Date): Promise<any | null> 

}