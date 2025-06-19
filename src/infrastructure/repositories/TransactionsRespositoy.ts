import { Transaction } from "@/domain/entities/Transaction";
import { ITransaction, transactionModel } from "../database/TransactionsModel";
import { BaseRepository } from "./BaseRespositroy";
import { Document } from "mongoose";
import { ITransactionRepotitory } from "@/domain/repositories/ITransactionRepotitory";


export class TransactionRespotitory extends BaseRepository<Transaction,ITransaction> implements ITransactionRepotitory{

    constructor(){
        super(transactionModel)
    }

    protected toEntity(data: (ITransaction & Document<unknown, any, any>) | null): Transaction | null {


        if(!data)return null
        return new Transaction(
            data.userId.toString(),
            data.amount,
            data.paymentId,
            data.paymentMethord,
            data.orderId,
            data.status,
            data._id)
    }



}