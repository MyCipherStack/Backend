import { customAlphabet } from "nanoid";
import { Interview } from "../../domain/entities/Interview";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { InterviewDTO } from "../dto/InterviewDTO";
import { IScheduleInterviewUseCase } from "../interfaces/use-cases/IScheduleInterviewUseCase";



export class ScheduleInterviewUseCase implements IScheduleInterviewUseCase {
    constructor(
        private userRepository: IUserRepository
    ) { }

    async execute(data: InterviewDTO): Promise<Partial<Interview>> {
        let finalData: Partial<Interview> = data
        if (data.sessionType == 'invite') {
            const response = await this.userRepository.findByUserName(data.invitedUsers[0])
            const partipantId = response?._id
            finalData.partipantId = partipantId?.toString()
        } else {
            const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 6);  //SET GROUP CHALLENGE
            finalData.code = `interview-${nanoid()}`
        }
        return finalData
    }

}