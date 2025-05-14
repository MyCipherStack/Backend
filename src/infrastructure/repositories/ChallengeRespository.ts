import { GroupChallenge } from "../../domain/entities/GroupChallenge.js";
import { IChallengeRepository } from "../../domain/repositories/IchallengeRepository.js";
import { groupChallengeModel } from "../database/GroupChallengeModel.js";


export class ChallengeRepository implements IChallengeRepository{
    async  create(data: GroupChallenge): Promise<GroupChallenge> {
        const challengeData= await groupChallengeModel.create(data)
        return new GroupChallenge(challengeData.challengeName,challengeData.maxParticipants,challengeData.duration,challengeData.problems,challengeData.type,challengeData.joinCode,challengeData.startTime,challengeData.endTime)
    }

    async findById(Id: string): Promise<GroupChallenge | null> {
        const challengeData=await groupChallengeModel.findById(Id)
        if(!challengeData)return null
        return new GroupChallenge(challengeData.challengeName,challengeData.maxParticipants,challengeData.duration,challengeData.problems,challengeData.type,challengeData.startTime,challengeData.endTime)

    }

    async findOneChallenge(data: Partial<GroupChallenge>): Promise<GroupChallenge | null> {
        const challengeData=await groupChallengeModel.findOne(data).populate("problems")
        return challengeData
    }
} 