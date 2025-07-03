import { IChangeRespoStatusUseCase } from "@/application/interfaces/use-cases/IChangeRespoStatusUseCase";
import { IGetRepositoryDataUseCase } from "@/application/interfaces/use-cases/IGetRepositoryDataUseCase";
import { PairProgramming } from "@/domain/entities/PairProgramming";
import { AppError } from "@/domain/error/AppError";
import { logger } from "@/logger";
import { NextFunction, Request, Response } from "express";




export class ChallengeController<Entity> {

    constructor(
        private getGroupChallengeData: IGetRepositoryDataUseCase<Entity>,
        private changeStatusUseCase: IChangeRespoStatusUseCase<Entity>
    ) { }

    allGroupChallenges = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const data = await this.getGroupChallengeData.allDoucuments()

            res.status(200).json({ message: "all group challenge data fetched", challenges: data })

        } catch (error) {
            logger.error("err",error)
            next(new AppError("err in getting data", 400))
        }

    }





    changeStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {

            console.log("change status",req.body);
            
            const data = await this.changeStatusUseCase.execute(req.body.id, req.body.status)
            logger.info("data",data)
            res.status(200).json({ message: "status changed", challenge: data })

            
        } catch (error) {
            logger.error(error)
            return next(new AppError("err in change status",500))

        }
    }
}