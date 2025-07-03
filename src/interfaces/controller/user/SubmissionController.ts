import { NextFunction, Request, Response } from "express";
import { IGetAllSubmissionByProblemuseCase } from "../../../application/interfaces/use-cases/IGetAllSubmissionByProblemuseCase";
import { AppError } from "@/domain/error/AppError";



export class SubmissionController {

    constructor(
        private getAllSubmissionByProblemuseCase: IGetAllSubmissionByProblemuseCase
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

}