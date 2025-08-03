import { Interview } from '../../../domain/entities/Interview.js';
import { InterviewDTO } from '../../dto/InterviewDTO.js';

export interface IScheduleInterviewUseCase{
    execute(data:InterviewDTO):Promise<Partial<Interview>>
}
