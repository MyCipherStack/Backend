import { NextFunction, Request, Response } from "express";
import { InterviewDTO } from "@/application/dto/InterviewDTO";
import { ICreateRepoUseCase } from "@/application/interfaces/use-cases/ICreateRepoUseCase";
import { Interview } from "@/domain/entities/Interview";
import { IScheduleInterviewUseCase } from "@/application/interfaces/use-cases/IScheduleInterviewUseCase";
import { IInterViewRepository } from "@/domain/repositories/IInterViewRepository";
import { IjoinInterViewUseCase } from "@/domain/repositories/IjoinInterViewUseCase";
import { logger } from "@/infrastructure/logger/WinstonLogger/logger";
import { AppError } from "@/domain/error/AppError";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";



export class InterviewController {

    constructor(
        private createRepoUseCase: ICreateRepoUseCase<Interview>,
        private scheduleInterviewUsecase: IScheduleInterviewUseCase,
        private interViewRepository: IInterViewRepository,
        private joinInterViewUseCase: IjoinInterViewUseCase
    ) { }

    schedule = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = new InterviewDTO(req.body)
            const createData = await this.scheduleInterviewUsecase.execute(data)
            const { id } = req.user as { id: string }
            createData.hostId = id
            const response = await this.createRepoUseCase.execute(createData)

            res.status(HttpStatusCode.OK).json({ status: true, message: "schedule interview", Interview: response })
        } catch (error) {

            next(new AppError("server error", HttpStatusCode.INTERNAL_SERVER_ERROR))

            //   return res.status(400).json({ status: false, message:error.message});


        }
    }

    getUserInterviews = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.user as { id: string }
            const userCreatedInterview = await this.interViewRepository.findByField({ hostId: id })

            const userInterviews = await this.interViewRepository.findByField({ participantId: id })
            console.log(userCreatedInterview, userInterviews);

            res.status(HttpStatusCode.OK).json({ status: true, message: "get all interview", interviews: { userInterviews, userCreatedInterview } })
        } catch (error: unknown) {

            next(new AppError("server error", HttpStatusCode.INTERNAL_SERVER_ERROR))

        }
    }


    joinInterview = async (req: Request, res: Response,next:NextFunction) => {
        try {
            const user = req.user


            const InterviewId = req.body.id
            logger.info("interviewID", { InterviewId });
            const response = await this.joinInterViewUseCase.execute(user?.id.toString()!, InterviewId)

            logger.info("interviewID", { response });

            res.status(200).json({ status: true, message: "joined interview", interview: response })
        } catch (error: unknown) {

            if (error instanceof Error) {
                res.status(HttpStatusCode.BAD_REQUEST).json({ status: false, message: error.message });
            } else {

                next(new AppError("server error", HttpStatusCode.INTERNAL_SERVER_ERROR))

            }

        }
    }
}


