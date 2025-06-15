import { Request, Response } from "express";
import { InterviewDTO } from "../../application/dto/InterviewDTO";
import { ICreateRepoUseCase } from "../../application/interfaces/use-cases/ICreateRepoUseCase";
import { Interview } from "../../domain/entities/Interview";
import { IScheduleInterviewUseCase } from "../../application/interfaces/use-cases/IScheduleInterviewUseCase";
import { IInterViewRepository } from "../../domain/repositories/IInterViewRepository";
import { IjoinInterViewUseCase } from "../../domain/repositories/IjoinInterViewUseCase";



export class InterviewController {

    constructor(
        private createRepoUseCase: ICreateRepoUseCase<Interview>,
        private scheduleInterviewUsecase: IScheduleInterviewUseCase,
        private interViewRepository: IInterViewRepository,
        private joinInterViewUseCase:IjoinInterViewUseCase
    ) { }

    schedule = async (req: Request, res: Response) => {
        try {
            const data = new InterviewDTO(req.body)
            const createData = await this.scheduleInterviewUsecase.execute(data)
            const { id } = req.user
            createData.hostId = id
            const response = await this.createRepoUseCase.execute(createData)
            res.status(200).json({ status: true, message: "schedule interview", Interview: response })
        } catch (error) {
            console.log(error);
      return res.status(400).json({ status: false, message:error.message});


        }
    }

    getUserInterviews = async (req: Request, res: Response) => {
        try {
            const { id } = req.user
            const userCreatedInterview = await this.interViewRepository.findByField({ hostId: id })

            const userInterviews = await this.interViewRepository.findByField({ partipantId: id })
            console.log(userCreatedInterview,userInterviews);
            
            res.status(200).json({ status: true, message: "get all interview", interviews: { userInterviews, userCreatedInterview } })
        } catch (error) {

    
          res.status(400).json({ status: false, message:error.message});


        }
    }


    joinInterview=async(req:Request,res:Response)=>{
        try{
            const { id } = req.user
            const InterviewId=req.body.id
            console.log(InterviewId,"interviewID");
           const response=await this.joinInterViewUseCase.execute(id.toString(),InterviewId)

        
           res.status(200).json({ status: true, message: "joined interview", interview:response })
        }catch(error){
            console.log(error);
          res.status(400).json({ status: false, message:error.message});
            
        }
    }
}


