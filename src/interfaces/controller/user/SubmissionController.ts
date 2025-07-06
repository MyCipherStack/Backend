import { NextFunction, Request, Response } from "express";
import { IGetAllSubmissionByProblemuseCase, IGetAllUsesrSubmissionUseCase } from "../../../application/interfaces/use-cases/IGetAllSubmissionByProblemuseCase";
import { AppError } from "@/domain/error/AppError";
import { logger } from "@/logger";



export class SubmissionController {

    constructor(
        private getAllSubmissionByProblemuseCase: IGetAllSubmissionByProblemuseCase,
        private getAllUsersSubmissionUseCase: IGetAllUsesrSubmissionUseCase
    ) { }


    getSubmissionData = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { problemId } = req.query as { problemId: string }

            const user = req.user as { id: "string" }

            const submissions = await this.getAllSubmissionByProblemuseCase.execute(user.id, problemId)

            res.status(200).json({ status: true, message: "test submissiondata by problem", submissions })

        } catch (error) {

            next(new AppError("Something went wrong", 500))

            // res.status(400).json({status:false,message:"Something went wrong"})
        }
    }



    getUserSubmissons = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user as { id: "string" }

            const submissions = await this.getAllUsersSubmissionUseCase.execute(user.id)

            logger.info("allsubmmsion with date",submissions)
            res.status(200).json({ status: true, message: "all user Submission", submissions })

        } catch (error) {
            logger.error("err",{error})

            return next(new AppError("Something went wrong", 500))


        }
    }



}