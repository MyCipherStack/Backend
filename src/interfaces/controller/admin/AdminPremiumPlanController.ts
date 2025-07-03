import { NextFunction, Request, Response } from "express";
import { PremiumPlanDTO } from "../../../application/dto/PremiumPlanDTO";
import { ICreateRepoUseCase } from "@/application/interfaces/use-cases/ICreateRepoUseCase";
import { IGetRepositoryDataUseCase } from "@/application/interfaces/use-cases/IGetRepositoryDataUseCase";
import { IEditPlanUseCase } from "@/application/interfaces/use-cases/IPlanUseCases";
import { PremiumPlan } from "@/domain/entities/PremiumPlan";
import { AppError } from "@/domain/error/AppError";




/// CREATE COMMON USE CASE FOR THIS TYPE OF CREATIG NEW MODEL

export class AdminPremiumPlanController {
    constructor(
        private createPremiumRepoUseCase: ICreateRepoUseCase<PremiumPlan>,
        private getPremiumDataUseCase: IGetRepositoryDataUseCase<PremiumPlan>,
        private EditPlanUseCase: IEditPlanUseCase

    ) { }

    createNewPlan = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = new PremiumPlanDTO(req.body)

            const response = await this.createPremiumRepoUseCase.execute(data)

            res.status(200).json({ status: true, message: "new premium plan created", response })

        } catch (error) {

            if (error.code == 11000) {
                return next(new AppError("plan name alreay exits", 409))
            }
            next(new AppError("erro in creating new plan", 409))


        }
    }



    editPlan = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = new PremiumPlanDTO(req.body)

            const response = await this.EditPlanUseCase.execute(data._id, data)

            res.status(200).json({ status: true, message: "new premium plan created", response })

        } catch (error) {

            if (error.code == 11000) {
                return next(new AppError("plan name alreay exits", 409))
            }
            res.status(400).json({ status: false, message: error })
        }
    }


    getPlans = async (req: Request, res: Response) => {
        try {
            const response = await this.getPremiumDataUseCase.allDoucuments()
            if (response) {
                const plans = response.filter(plan => plan.status != "deleted")
                res.status(200).json({ status: true, message: " fetched all Plans", plans })
            }

        } catch (error) {
            res.status(400).json({ status: false, message: error })
        }
    }
}



