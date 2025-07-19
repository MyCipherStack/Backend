import { ITransactionUseCase } from "@/application/interfaces/use-cases/IAdminUseCase";
import { AppError } from "@/domain/error/AppError";
import { logger } from "@/logger";
import { NextFunction, Request, Response } from "express";




export class TransationController {
    constructor(
        private TransactionUseCase: ITransactionUseCase
    ) {

    }


    allTransations = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const status = req.query.status as string;
            
            const data = await this.TransactionUseCase.execute({ page, limit, status })
            
            logger.info("get all transation",{data})
            res.status(200).json({ status: true, message: "all transations", transactions: data });

        } catch (error) {


            logger.error("er", { error })
            return next(new AppError("Internal server error", 500))


        }
    }
}