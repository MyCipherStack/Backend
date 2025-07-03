import { IChangeRespoStatusUseCase } from "@/application/interfaces/use-cases/IChangeRespoStatusUseCase";
import { IGetRepositoryDataUseCase } from "@/application/interfaces/use-cases/IGetRepositoryDataUseCase";
import { PairProgramming } from "@/domain/entities/PairProgramming";
import { AppError } from "@/domain/error/AppError";
import { logger } from "@/logger";
import { NextFunction, Request, Response } from "express";




export class PairProgrammingController {

    constructor(
        private getPairprogamming: IGetRepositoryDataUseCase<PairProgramming>,
        private changeStatusUseCase: IChangeRespoStatusUseCase<PairProgramming>
    ) { }

 


    getAllPairProgramming = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const data = await this.getPairprogamming.allDoucuments()

            res.status(200).json({ message: "all pairProgarming data fetched", pairProgram: data })

        } catch (error) {
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