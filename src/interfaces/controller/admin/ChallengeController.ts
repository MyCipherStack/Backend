import { IUpdateRepositoryDataUseCase } from "@/application/interfaces/use-cases/ISharedUseCase";
import { AppError } from "@/domain/error/AppError";
import { logger } from "@/infrastructure/logger/WinstonLogger/logger";
import { NextFunction, Request, Response } from "express";
import { IChallengeRepository } from "@/domain/repositories/IChallengeRepository";
import { GroupChallenge } from "@/domain/entities/GroupChallenge";




export class ChallengeController {

    constructor(
        private challengeRepository: IChallengeRepository,
        private updateRepositoryDataUseCase: IUpdateRepositoryDataUseCase<GroupChallenge>,

    ) { }

    allGroupChallenges = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const parseBoolean=(str:string)=>{
                return  str==="true"
            }

            const page = parseInt(req.query.page as string) || 1;
            const search = req.query.search as string 
            const limit = parseInt(req.query.limit as string) || 10
            const status = req.query.status as string;
            const isBlocked =req.query.isBlocked as string

            logger.info("page", {isBlocked,search})
            const data = await this.challengeRepository.paginatedData({ page, limit,isBlocked,search, status })

            res.status(200).json({ message: "all group challenge data fetched", challenges: data })

        } catch (error) {
            logger.error("err", error)
            next(new AppError("err in getting data", 400))
        }

    }





    changeStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {

            console.log("change status", req.body);

            const data = await this.updateRepositoryDataUseCase.execute(req.body.id,{isBlocked:req.body.isBlocked})
            logger.info("data", data)
            res.status(200).json({ message: "status changed", challenge: data })


        } catch (error) {
            logger.error(error)
            return next(new AppError("err in change status", 500))

        }
    }
}