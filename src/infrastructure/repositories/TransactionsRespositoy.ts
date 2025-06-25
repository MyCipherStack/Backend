import { Transaction } from "@/domain/entities/Transaction";
import { ITransaction, transactionModel } from "../database/TransactionsModel";
import { BaseRepository } from "./BaseRespositroy";
import { Document } from "mongoose";
import { ITransactionRepotitory } from "@/domain/repositories/ITransactionRepotitory";
import { logger } from "@/logger";


export class TransactionRespotitory extends BaseRepository<Transaction, ITransaction> implements ITransactionRepotitory {

    constructor() {
        super(transactionModel)
    }


    async transatonsGrowthByRange(format: string, startDate: Date): Promise<any | null> {
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


        const mapper = (data) => { return data.map((obj => ({ range: obj._id, revenue: obj.revenue }))) }

        logger.info("this month",thisMonth[0])

        return { transactionDetails: mapper(data), thisMonth: thisMonth[0].thisMonthRevenu }
    }

    
    protected toEntity(data: (ITransaction & Document<unknown, any, any>) | null): Transaction | null {


        if (!data) return null
        return new Transaction(
            data.userId.toString(),
            data.amount,
            data.paymentId,
            data.paymentMethord,
            data.orderId,
            data.status,
            data.id)
    }



}