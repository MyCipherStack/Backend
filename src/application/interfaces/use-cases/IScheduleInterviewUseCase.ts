import { InterviewDTO } from "@/application/dto/InterviewDTO";
import { Interview } from "@/domain/entities/Interview";


export interface IScheduleInterviewUseCase{
    execute(data:InterviewDTO):Promise<Partial<Interview>>
}
