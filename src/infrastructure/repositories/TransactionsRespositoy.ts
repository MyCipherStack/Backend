import { Transaction } from "@/domain/entities/Transaction";
import { ITransaction, transactionModel } from "../database/TransactionsModel";
import { BaseRepository } from "./BaseRepository";
import { Document } from "mongoose";
import { ITransactionRepotitory } from "@/domain/repositories/ITransactionRepotitory";
import { logger } from "@/infrastructure/logger/WinstonLogger/logger";


export class TransactionRespotitory extends BaseRepository<Transaction, ITransaction> implements ITransactionRepotitory {

    constructor() {
        super(transactionModel)
    }


    async transatonsGrowthByRange(format: string, startDate: Date): Promise<{ transactionDetails: { range: string; revenue: string; }[]; thisMonth: number; } | null> {


        logger.info("userRepodata", { format, startDate })

        const data = await transactionModel.aggregate([{
            $match: {
                createdAt: { $gte: startDate }, status: "success"
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: {
                        format,
                        date: '$createdAt'
                    }
                },
                revenue: { $sum: "$amount" }
            }
        }
        ])

        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)


        const thisMonth = await transactionModel.aggregate([{
            $match: {
                status: "success",

                createdAt: { $gte: startOfMonth }
            }
        }, {
            $group: {
                _id: null,
                thisMonthRevenu: { $sum: "$amount" }
            },
        }
        ])


        const mapper = (data: { _id: string, revenue: string }[]) => { return data.map((obj => ({ range: obj._id, revenue: obj.revenue }))) }

        logger.info("this month", thisMonth[0])

        return { transactionDetails: mapper(data), thisMonth: thisMonth[0].thisMonthRevenu }
    }





    async getFiltersTrasations(filters: { page: number, limit: number, status?: string }): Promise<{
        transaction: any[];
        totalTransaction: number;
        totalPages: number;
    }> {
        let query: any = {}

        if (filters.status) query.status = filters.status

        const skip = (filters.page - 1) * filters.limit
        const totalTransaction = await transactionModel.countDocuments(query);
        const totalPages = Math.ceil(totalTransaction / filters.limit);
        let Transaction = await transactionModel.find(query).skip(skip).limit(filters.limit).lean().sort({ createdAt: -1 })
        let updatedTransaction = Transaction.map(data => this.toEntity(data))
        return { transaction: updatedTransaction, totalTransaction, totalPages }
    }















    protected toEntity(data: (ITransaction & Document<unknown>) | null): Transaction | null {


        if (!data) return null
        return new Transaction(
            data.userId.toString(),
            data.amount,
            data.paymentMethord,
            data.paymentId,
            data.orderId,
            data.status,
            data.id)
    }



}