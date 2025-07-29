import { Interview } from "../../../../domain/entities/Interview";
import { IInterViewRepository } from "../../../../domain/repositories/IInterViewRepository";
import { IjoinInterViewUseCase } from "../../../../domain/repositories/IjoinInterViewUseCase";




export type  IInterview= Interview & { isHost: boolean }
export class joinInterViewUseCase implements IjoinInterViewUseCase {

    constructor(
        private interviewRespositroy: IInterViewRepository
    ) { }
    async execute(userId: string, interviewId: string): Promise<IInterview | null> {
        const response = await this.interviewRespositroy.findById(interviewId)



        if (response) {

            if (response?.hostId === userId) {

                return { ...response, isHost: true }
            } else if (response?.participantId === userId) {
                console.log("Participants");

                return { ...response, isHost: false }

            }
            else {
                return null
            }
        }
        return null
    }
}