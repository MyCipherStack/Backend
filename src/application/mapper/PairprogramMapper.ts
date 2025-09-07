import { PairProgramming } from "@/domain/entities/PairProgramming";



export class PairProgramMapper {

    static toResponseDTO(pairProgram: PairProgramming) {

        return {
            hostId: pairProgram.hostId,
            challengeName: pairProgram.challengeName,
            duration: pairProgram.duration,
            problems: pairProgram.problems,
            type: pairProgram.type,
            joinCode: pairProgram?.joinCode,
            startTime: pairProgram.startTime,
            endTime: pairProgram.endTime,
            _id: pairProgram._id,
            status: pairProgram.status,
            navigator: pairProgram.navigator,
            createdAt: pairProgram.createdAt,
            updatedAt: pairProgram.updatedAt,
            isBlocked: pairProgram.isBlocked,

        }
    }
}