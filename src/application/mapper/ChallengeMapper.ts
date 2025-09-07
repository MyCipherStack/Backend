import { GroupChallenge } from "@/domain/entities/GroupChallenge";
import { Types } from "mongoose";


export class ChallengeMapper {

    static toResponseDTO(challenge: GroupChallenge) {
        return {
            challengeName: challenge.challengeName,
            maxParticipants: challenge.maxParticipants,
            duration: challenge.duration,
            problems: challenge.problems,
            type: challenge.type,
            joinCode: challenge.joinCode,
            startTime: challenge.startTime,
            endTime: challenge.endTime,
            status: challenge.status,
            _id: (challenge._id)?.toString(),
            createdAt: challenge.createdAt,
            updatedAt: challenge.updatedAt,
            hostId: challenge?.hostId?.toString(),
            isBlocked: challenge?.isBlocked,
        }
    }
}