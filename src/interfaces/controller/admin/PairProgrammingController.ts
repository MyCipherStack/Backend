import { IUpdateRepositoryDataUseCase } from "@/application/interfaces/use-cases/ISharedUseCase";
import { PairProgramming } from "@/domain/entities/PairProgramming";
import { AppError } from "@/domain/error/AppError";
import { logger } from "@/infrastructure/logger/WinstonLogger/logger";
import { NextFunction, Request, Response } from "express";
import { IPairProgrammingRepository } from "@/domain/repositories/IPairProgrammingRepository";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";




export class PairProgrammingController {

    constructor(
        private pairProgrammingRepo: IPairProgrammingRepository,
        private updateRepositoryDataUseCase: IUpdateRepositoryDataUseCase<PairProgramming>,

    ) { }



    getAllPairProgramming = async (req: Request, res: Response, next: NextFunction) => {
        try {



            const parseBoolean = (str: string) => {
                return str === "true"
            }
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10
            const status = req.query.status as string;
            const isBlocked =req.query.isBlocked as string
            const search = req.query.search as string 


            const data = await this.pairProgrammingRepo.paginatedData({ page, limit, status,search,isBlocked })

            res.status(HttpStatusCode.OK).json({ message: "all pairPrograrmming data fetched", pairProgram: data })

        } catch (error) {
            next(new AppError("err in getting data", HttpStatusCode.BAD_REQUEST))
        }

    }


    changeStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {

            console.log("change status", req.body);

            const data = await this.updateRepositoryDataUseCase.execute(req.body.id, { isBlocked: req.body?.isBlocked })
            logger.info("data", data)
            res.status(HttpStatusCode.OK).json({ message: "status changed", challenge: data })


        } catch (error) {
            logger.error(error)
            return next(new AppError("err in change status", HttpStatusCode.BAD_REQUEST))

        }
    }
}